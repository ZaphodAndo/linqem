import { json, redirectDocument } from "@remix-run/cloudflare";
import { redirect } from "@remix-run/react";

import type { LoaderFunctionArgs, ActionFunctionArgs } from "@remix-run/cloudflare";

export async function loader({ context, request }: LoaderFunctionArgs) {
  const session = await context.sessionStorage.getSession(request.headers.get("cookie"));
  if (!session.has("userId")) return redirect("/");
  return json({});
}

export async function action({ context, request }: ActionFunctionArgs) {
  const session = await context.sessionStorage.getSession(request.headers.get("cookie"));
  return redirectDocument("/", {
    headers: { "set-cookie": await context.sessionStorage.destroySession(session) }
  });
}
