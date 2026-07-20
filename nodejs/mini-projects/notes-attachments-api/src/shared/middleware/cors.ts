import cors from "cors";
import { config } from "../../config/env.js";

export const corsMiddleware = cors({
  origin(origin, callback) {
    if (!origin || config.CORS_ALLOWED_ORIGINS.includes(origin)) {
      callback(null, true);
      return;
    }

    callback(new Error("Origin is not allowed."));
  },
  credentials: true
});
