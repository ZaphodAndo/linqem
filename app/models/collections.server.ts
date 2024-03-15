import type { AppLoadContext } from "@remix-run/cloudflare";

export const getCollections = async (context: AppLoadContext) => {
  const env = context.cloudflare.env as Env;
  const { results } = await env.LINQEM_DB.prepare("SELECT * FROM collections").all();
  return results;
};

export const getCollection = async (collectionId: string, context: AppLoadContext) => {
  const env = context.cloudflare.env as Env;
  const { results } = await env.LINQEM_DB.prepare(
    `SELECT * FROM collections WHERE collection_id = '${collectionId}'`
  ).all();

  if (results.length === 0) {
    return null;
  }

  results[0].sections = JSON.parse(results[0].sections as string);
  return results[0];
};

export const createCollection = async (
  title: string,
  description: string,
  sections: string,
  userId: string,
  context: AppLoadContext
) => {
  const collectionId = crypto.randomUUID();
  const createdAt = new Date().toISOString();

  const env = context.cloudflare.env as Env;
  const { success } = await env.LINQEM_DB.prepare(
    "INSERT INTO collections (collection_id, created_at, title, description, sections, user_id) values (?, ?, ?, ?, ?, ?)"
  )
    .bind(collectionId, createdAt, title, description, sections, userId)
    .run();

  if (success) {
    return collectionId;
  } else {
    return null;
  }
};
