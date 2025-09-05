import { findLocations } from "~~/lib/db/queries/location";

export default defineAuthenticatedEventHandler(async (event) => {
  return await findLocations(event.context.user.id);
});
