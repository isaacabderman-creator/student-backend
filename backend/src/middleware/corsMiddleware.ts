import cors from "cors";

import { corsOptions } from "../config/corsConfig.ts";

export const corsMiddleware = cors(corsOptions);
