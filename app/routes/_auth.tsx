import { Fragment } from "react";
import { Link, Outlet } from "@remix-run/react";

import type { LinksFunction } from "@remix-run/cloudflare";

import styles from "~/styles/auth.css?url";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

export default function Auth() {
  return (
    <Fragment>
      <Link to="/">
        <img className="logo" src="/full-logo.svg" alt="Go to home" />
      </Link>
      <main>
        <Outlet />
      </main>
    </Fragment>
  );
}
