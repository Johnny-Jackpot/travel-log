import type { ZodSafeParseError } from "zod/v4";

export function formatZodError<T>(result: ZodSafeParseError<T>) {
  const statusMessage = result.error.issues
    .map(issue => `${issue.path.join(".")}: ${issue.message}`)
    .join("; ");

  const data = result.error.issues.reduce((errors, issue) => {
    errors[issue.path.join(".")] = issue.message;
    return errors;
  }, {} as Record<string, string>);

  return { statusMessage, data };
}
