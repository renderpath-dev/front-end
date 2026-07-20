import rateLimit from "express-rate-limit";

export const loginRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  skipSuccessfulRequests: true,
  message: {
    ok: false,
    error: {
      code: "LOGIN_RATE_LIMITED",
      message: "Too many login attempts. Try again later."
    }
  }
});
