import db from "~~/lib/db";
import { InsertLocation, location } from "~~/lib/db/schema";
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
    const statusMessage = result
      .error
      .issues
      .map(issue => `${issue.path.join("")}: ${issue.message}`)
      .join("; ");

    const data = result
      .error
      .issues
      .reduce((errors, issue) => {
        errors[issue.path.join("")] = issue.message;
        return errors;
      }, {} as Record<string, string>);

    return sendError(event, createError({
      statusCode: 422,
      statusMessage,
      data,
    }));
  }

  const baseSlug = slugify(result.data.name, { lower: true });
  const nanoid = customAlphabet("1234567890abcdefghijklmnopqrstuvwxyz");
  const slug = `${baseSlug}-${Date.now()}-${nanoid(5)}`;

  const existing = await db.query.location.findFirst({
    where: (loc, { eq }) => eq(loc.slug, slug),
  });
  if (existing) {
    return sendError(event, createError({
      statusCode: 409,
      statusMessage: "Location with this name already exists.",
      data: { name: "Location name must be unique." },
    }));
  }

  const [createdLocation] = await db.insert(location).values({
    ...result.data,
    userId: event.context.user.id,
    slug,
  }).returning();

  return createdLocation;
});
