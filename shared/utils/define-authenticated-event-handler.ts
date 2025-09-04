import type { UserWithId } from "~~/lib/auth";
import type { H3Event, H3EventContext } from "h3";

type AuthenticatedEvent = H3Event & {
  context: H3EventContext & {
    user: UserWithId;
  };
};

export default function defineAuthenticatedEventHandler(
  handler: (event: AuthenticatedEvent) => any,
) {
  return defineEventHandler(async (event) => {
    return event.context?.user
      ? handler(event as AuthenticatedEvent)
      : sendError(event, createError({
          statusCode: 401,
          statusMessage: "Unauthorized",
        }));
  });
}
