import db from "~~/lib/db";
import { InsertLocation, location } from "~~/lib/db/schema";
import { formatZodError } from "~~/shared/utils/validation";
import { and, eq } from "drizzle-orm";
import { customAlphabet } from "nanoid";
import slugify from "slug";

export default defineEventHandler(async (event) => {
  if (!event.context?.user) {
    return sendError(event, createError({
      statusCode: 401,
      statusMessage: "Unauthorized",
    }));
  }

  const result = await readValidatedBody(event, InsertLocation.safeParse);
  if (!result.success) {
    const { statusMessage, data } = formatZodError(result);
    return sendError(event, createError({
      statusCode: 422,
      statusMessage,
      data,
    }));
  }

  const existing = await db.query.location.findFirst({
    where:
      and(
        eq(location.name, result.data.name),
        eq(location.userId, event.context.user.id),
      ),
  });
  if (existing) {
    return sendError(event, createError({
      statusCode: 409,
      statusMessage: "Location with this name already exists.",
      data: { name: "Location name must be unique." },
    }));
  }

  const baseSlug = slugify(result.data.name, { lower: true });
  const nanoid = customAlphabet("1234567890abcdefghijklmnopqrstuvwxyz");
  const slug = `${baseSlug}-${nanoid(5)}`;

  const [createdLocation] = await db.insert(location).values({
    ...result.data,
    userId: event.context.user.id,
    slug,
  }).returning();

  return createdLocation;
});
