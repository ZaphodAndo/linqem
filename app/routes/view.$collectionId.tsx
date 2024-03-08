import { json } from "@remix-run/cloudflare";
import { isRouteErrorResponse, useLoaderData, useRouteError } from "@remix-run/react";
import { getCollection } from "~/lib/db.server";
import { formatUrl } from "~/lib/formatUrl";

import type { MetaFunction } from "@remix-run/node";
import type { LinksFunction, LoaderFunction } from "@remix-run/cloudflare";
import type { ICollection } from "~/Interfaces/ICollection";

import styles from "~/styles/view.css?url";

export const meta: MetaFunction = ({ data }) => {
  const collection = data as ICollection;
  return [
    { title: `Linqem - ${collection.title}` },
    {
      name: "description",
      content: collection.description
    }
  ];
};

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

export const loader: LoaderFunction = async ({ params, context }) => {
  if (!params.collectionId) {
    throw new Response("No collection ID provided!", { status: 500 });
  }

  const collection = await getCollection(params.collectionId, context);
  if (collection === null) {
    throw new Response("Collection not found!", { status: 500 });
  }

  return json(collection);
};

export default function View() {
  const collection = useLoaderData<ICollection>();
  return (
    <main>
      <h1>{collection.title}</h1>
      <p>{collection.description}</p>
      {collection.sections.map((section, key) => {
        return (
          <ul key={key}>
            <h2>{section.title}</h2>
            {section.links.map((link, key) => {
              return (
                <li key={key}>
                  <a href={link.url} rel="noopener noreferrer" target="_blank">
                    {link.title}
                    <span>{formatUrl(link.url)}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        );
      })}
    </main>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <main>
        <h1>{error.data}</h1>
      </main>
    );
  }
}
