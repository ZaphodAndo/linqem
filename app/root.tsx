import { Link, Links, Meta, Outlet, Scripts, ScrollRestoration } from "@remix-run/react";
import React from "react";

import type { LinksFunction } from "@remix-run/cloudflare";

import styles from "~/styles/root.css?url";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <nav>
          <Link to="/">
            <img src="/full-logo.svg" alt="Go to home" />
          </Link>
          <div className="nav-links">
            <Link to="/create">Create</Link>
            <Link to="/">Home</Link>
          </div>
        </nav>
        {children}
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
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
