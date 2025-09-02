import { and, eq } from "drizzle-orm";
import { nanoid } from "nanoid";

import type { InsertLocation } from "../schema";

import db from "../";
import { location } from "../schema";

export async function findLocationByName(name: string, userId: number) {
  return db.query.location.findFirst({
    where: and(
      eq(location.name, name),
      eq(location.userId, userId),
    ),
  });
}

export async function findLocationBySlug(slug: string) {
  return await db.query.location.findFirst({
    where: eq(location.slug, slug),
  });
}

export async function findUniqueSlug(slug: string): Promise<string> {
  let existingRecord = !!(await findLocationBySlug(slug));
  while (existingRecord) {
    const idSlug = `${slug}-${nanoid(5)}`;
    existingRecord = !!(await findLocationBySlug(idSlug));
    if (!existingRecord) {
      return idSlug;
    }
  }

  return slug;
}

export async function insertLocation(data: InsertLocation, slug: string, userId: number) {
  const [createdLocation] = await db.insert(location).values({
    ...data,
    userId,
    slug,
  }).returning();
  return createdLocation;
}
