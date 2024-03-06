import { json } from "@remix-run/cloudflare";
import { useLoaderData, Link } from "@remix-run/react";
import { getCollections } from "~/lib/db.server";
import { formatDate } from "~/lib/formatDate";

import type { LinksFunction, LoaderFunction } from "@remix-run/cloudflare";
import type { MetaFunction } from "@remix-run/node";
import type { ICollection } from "~/Interfaces/ICollection";

import styles from "~/styles/home.css?url";

export const meta: MetaFunction = () => {
  return [
    { title: "Linqem" },
    {
      name: "description",
      content:
        "An elegant link aggregation repository for the web. Discover collections of useful web content for any topic, curated by a community of researchers and sharers."
    }
  ];
};

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

export const loader: LoaderFunction = async ({ context }) => {
  const collections = await getCollections(context);
  return json(collections);
};

export default function Index() {
  const collections = useLoaderData<Array<ICollection>>();
  return (
    <main>
      <div className="header">
        <p>Title</p>
        <p>Created at</p>
      </div>
      <ul>
        {collections.length === 0 ? (
          <p className="no-collection-message">No collections available!</p>
        ) : (
          collections.map((collection, key) => {
            return (
              <li key={key}>
                <Link to={"/view/" + collection.collection_id}>{collection.title}</Link>
                <time dateTime={collection.created_at}>{formatDate(collection.created_at)}</time>
              </li>
            );
          })
        )}
      </ul>
    </main>
  );
}
