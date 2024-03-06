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

  results[0].links = JSON.parse(results[0].links as string);
  results[0].sections = JSON.parse(results[0].sections as string);
  return results[0];
};
