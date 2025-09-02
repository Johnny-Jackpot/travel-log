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

  let slug = slugify(result.data.name, { lower: true });
  let existingRecord = !!(await db.query.location.findFirst({
    where: eq(location.slug, slug),
  }));
  const nanoid = customAlphabet("1234567890abcdefghijklmnopqrstuvwxyz");
  while (existingRecord) {
    const idSlug = `${slug}-${nanoid(5)}`;
    existingRecord = !!(await db.query.location.findFirst({
      where: eq(location.slug, idSlug),
    }));
    if (!existingRecord) {
      slug = idSlug;
    }
  }

  const [createdLocation] = await db.insert(location).values({
    ...result.data,
    userId: event.context.user.id,
    slug,
  }).returning();

  return createdLocation;
});
