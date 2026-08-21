import cors from "cors";

import { corsOptions } from "../config/cors.config.ts";

export const corsMiddleware = cors(corsOptions);
