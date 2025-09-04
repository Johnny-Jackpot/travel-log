import { findLocationByName, findUniqueSlug, insertLocation } from "~~/lib/db/queries/location";
import { InsertLocation } from "~~/lib/db/schema";
import slugify from "slug";

export default defineAuthenticatedEventHandler(async (event) => {
  const result = await readValidatedBody(event, InsertLocation.safeParse);
  if (!result.success) {
    const { statusMessage, data } = formatZodError(result);
    return sendError(event, createError({
      statusCode: 422,
      statusMessage,
      data,
    }));
  }

  const existing = await findLocationByName(result.data.name, event.context.user.id);
  if (existing) {
    return sendError(event, createError({
      statusCode: 409,
      statusMessage: "Location with this name already exists.",
      data: { name: "Location name must be unique." },
    }));
  }

  const slug = await findUniqueSlug(slugify(result.data.name, { lower: true }));

  return insertLocation(result.data, slug, event.context.user.id);
});
