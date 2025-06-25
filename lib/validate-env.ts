/* eslint-disable node/no-process-env */
import type { ZodObject, ZodRawShape } from "zod";

import { ZodError } from "zod";

export default function validateEnv<T extends ZodRawShape>(
  EnvSchema: ZodObject<T>,
  buildEnv: Record<string, string | undefined> = process.env,
) {
  try {
    EnvSchema.parse(buildEnv);
  }
  catch (error) {
    if (!(error instanceof ZodError)) {
      console.error(error);
      return;
    }

    let message = "Missing required values in .env\n";
    error.issues.forEach((issue) => {
      message += `${issue.path[0]}\n`;
    });
    const e = new Error(message);
    e.stack = "";
    throw e;
  }
}
