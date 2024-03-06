import { json } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import { getCollection } from "~/lib/db.server";

import type { LinksFunction, LoaderFunction } from "@remix-run/cloudflare";
import type { ICollection } from "~/Interfaces/ICollection";

import styles from "~/styles/view.css?url";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

export const loader: LoaderFunction = async ({ params, context }) => {
  if (!params.collectionId) {
    throw new Response("No collection ID provided", { status: 404 });
  }

  const collection = await getCollection(params.collectionId, context);
  if (collection === null) {
    throw new Response("Collection not found", { status: 404 });
  }

  return json(collection);
};

export default function View() {
  const collection = useLoaderData<ICollection>();
  return (
    <main>
      <h1>{collection.title}</h1>
      <p>{collection.description}</p>
      <h2>Links:</h2>
      <ul>
        {collection.links.map((link, key) => {
          return (
            <li key={key}>
              <a href={link.url}>{link.title}</a>
            </li>
          );
        })}
      </ul>
      <h2>Sections:</h2>
      <ul>
        {collection.sections.map((section, key) => {
          return (
            <li key={key}>
              <h3>{section.title}</h3>
              <p>{section.description}</p>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
