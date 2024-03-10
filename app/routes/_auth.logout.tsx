import { json, redirectDocument } from "@remix-run/cloudflare";
import { redirect } from "@remix-run/react";
import { destroySession, getSession } from "~/session.server";

import type { LoaderFunctionArgs, ActionFunctionArgs } from "@remix-run/cloudflare";

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await getSession(request.headers.get("cookie"));
  if (!session.has("userId")) return redirect("/");
  return json({});
}

export async function action({ request }: ActionFunctionArgs) {
  const session = await getSession(request.headers.get("cookie"));
  return redirectDocument("/", {
    headers: { "set-cookie": await destroySession(session) }
  });
}
