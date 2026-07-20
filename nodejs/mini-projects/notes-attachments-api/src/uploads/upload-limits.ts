import { config } from "../config/env.js";

export const uploadLimits = {
  fileSize: config.MAX_UPLOAD_BYTES,
  files: 1,
  fields: 4,
  parts: 5,
  headerPairs: 200
} as const;
