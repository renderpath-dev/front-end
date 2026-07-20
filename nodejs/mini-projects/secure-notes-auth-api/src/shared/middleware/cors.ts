import cors from "cors";
import { allowedCorsOrigins } from "../../config/env.js";

const allowedOrigins = new Set(allowedCorsOrigins);

export const corsMiddleware = cors({
  credentials: true,
  origin(origin, callback) {
    if (!origin) {
      callback(null, false);
      return;
    }

    callback(null, allowedOrigins.has(origin) ? origin : false);
  }
});
