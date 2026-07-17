// Goal:
// Handle login, authenticated user lookup, and logout with an HTTP-only session cookie.

import crypto from 'node:crypto';
import express from 'express';
import cookieParser from 'cookie-parser';

const app = express();
const sessionStore = new Map();

const sessionCookieName = 'sid';

const baseSessionCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
  path: '/',
};

const setSessionCookieOptions = {
  ...baseSessionCookieOptions,
  maxAge: 60 * 60 * 1000,
};

app.use(express.json());
app.use(cookieParser());

function findUserByCredentials(email, password) {
  if (email === 'ada@example.com' && password === 'correct-password') {
    return {
      id: 'user_1',
      email: 'ada@example.com',
      displayName: 'Ada',
    };
  }

  return null;
}

function requireSession(request, response, next) {
  const sessionId = request.cookies[sessionCookieName];

  if (!sessionId) {
    return response.status(401).json({
      error: 'Missing session',
    });
  }

  const sessionRecord = sessionStore.get(sessionId);

  if (!sessionRecord) {
    return response.status(401).json({
      error: 'Invalid session',
    });
  }

  request.sessionRecord = sessionRecord;
  return next();
}

app.post('/api/login', (request, response) => {
  const { email, password } = request.body;

  const userRecord = findUserByCredentials(email, password);

  if (!userRecord) {
    return response.status(401).json({
      error: 'Invalid credentials',
    });
  }

  const sessionId = crypto.randomUUID();

  sessionStore.set(sessionId, {
    userId: userRecord.id,
    email: userRecord.email,
    displayName: userRecord.displayName,
    createdAt: Date.now(),
  });

  response.cookie(sessionCookieName, sessionId, setSessionCookieOptions);

  return response.status(204).send();
});

app.get('/api/me', requireSession, (request, response) => {
  return response.json({
    userId: request.sessionRecord.userId,
    email: request.sessionRecord.email,
    displayName: request.sessionRecord.displayName,
  });
});

app.post('/api/logout', requireSession, (request, response) => {
  const sessionId = request.cookies[sessionCookieName];

  sessionStore.delete(sessionId);
  response.clearCookie(sessionCookieName, baseSessionCookieOptions);

  return response.status(204).send();
});

app.listen(3000, () => {
  console.log('Server listening on http://localhost:3000');
});
