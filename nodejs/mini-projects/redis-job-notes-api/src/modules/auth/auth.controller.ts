import type { RequestHandler } from "express";
import { clearSessionCookie, setSessionCookie } from "../../shared/cookies/session-cookie.js";
import { sendResponse } from "../../shared/responses/send-response.js";
import { requireAuthContext } from "../../shared/auth/auth-context.js";
import { issueCsrfTokenForSession } from "../../shared/auth/csrf.js";
import * as authService from "./auth.service.js";

export const register: RequestHandler = async (request, response, next) => {
  try {
    const result = await authService.register(request.body, {
      userAgent: request.header("user-agent") ?? undefined,
      ip: request.ip
    });
    setSessionCookie(response, result.sessionToken);
    sendResponse(response, 201, { user: result.user });
  } catch (error) {
    next(error);
  }
};

export const login: RequestHandler = async (request, response, next) => {
  try {
    const result = await authService.login(request.body, {
      userAgent: request.header("user-agent") ?? undefined,
      ip: request.ip
    });
    setSessionCookie(response, result.sessionToken);
    sendResponse(response, 200, { user: result.user });
  } catch (error) {
    next(error);
  }
};

export const logout: RequestHandler = async (_request, response, next) => {
  try {
    const auth = requireAuthContext(response);
    await authService.logout(auth.sessionId);
    clearSessionCookie(response);
    sendResponse(response, 200, { loggedOut: true });
  } catch (error) {
    next(error);
  }
};

export const me: RequestHandler = (_request, response, next) => {
  try {
    const auth = requireAuthContext(response);
    sendResponse(response, 200, {
      user: {
        id: auth.userId,
        email: auth.email,
        role: auth.role
      }
    });
  } catch (error) {
    next(error);
  }
};

export const csrf: RequestHandler = async (_request, response, next) => {
  try {
    const auth = requireAuthContext(response);
    const csrfToken = await issueCsrfTokenForSession(auth.sessionId);
    sendResponse(response, 200, { csrfToken });
  } catch (error) {
    next(error);
  }
};
