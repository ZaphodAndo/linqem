import { Form, Link, Outlet, useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/cloudflare";
import { getSession } from "~/session.server";

import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/cloudflare";

import styles from "~/styles/app.css?url";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await getSession(request.headers.get("cookie"));

  if (session.has("userId")) {
    return json({ authenticated: true });
  }

  return json({ authenticated: false });
}

export default function App() {
  const data = useLoaderData<typeof loader>();

  return (
    <div className="app">
      <nav>
        <Link to="/">
          <img src="/full-logo.svg" alt="Go to home" />
        </Link>
        <div className="nav-links">
          <Link to="/create">Create</Link>
          <Link to="/">Home</Link>
          {data.authenticated ? (
            <Form action="/logout" method="post">
              <button type="submit">Log out</button>
            </Form>
          ) : (
            <Link to="login">Log in</Link>
          )}
        </div>
      </nav>
      <Outlet />
      <footer>
        <div>
          <a href="https://social.lol/@zaphod" rel="noopener noreferrer" target="_blank">
            Mastodon
          </a>
          •<Link to="/changelog">Changelog</Link>
        </div>
        <a
          className="made-by-link"
          href="https://ethana.dev/"
          rel="noopener noreferrer"
          target="_blank"
        >
          Made by Ethan
        </a>
      </footer>
    </div>
  );
}
