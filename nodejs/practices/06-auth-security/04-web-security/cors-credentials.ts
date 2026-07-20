import cors from "cors";

const allowedOrigins = new Set(["http://localhost:5173"]);

export const credentialedCors = cors({
  credentials: true,
  origin(origin, callback) {
    if (!origin) {
      callback(null, false);
      return;
    }

    callback(null, allowedOrigins.has(origin) ? origin : false);
  }
});
