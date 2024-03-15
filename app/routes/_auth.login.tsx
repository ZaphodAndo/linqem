import { Form, Link, redirect, useActionData } from "@remix-run/react";
import { json } from "@remix-run/cloudflare";
import { verifyLogin } from "~/models/user.server";

import type { MetaFunction, LoaderFunctionArgs, ActionFunctionArgs } from "@remix-run/cloudflare";

export const meta: MetaFunction = () => {
  return [
    { title: "Linqem - Log in" },
    {
      name: "description",
      content: "Log in to Linqem an elegant link aggregation repository for the web."
    }
  ];
};

export async function loader({ context, request }: LoaderFunctionArgs) {
  const session = await context.sessionStorage.getSession(request.headers.get("cookie"));
  if (session.has("userId")) return redirect("/");
  return json({});
}

export async function action({ context, request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const userId = await verifyLogin(
    {
      email: email,
      password: password
    },
    context
  );

  if (userId === null) {
    return json({
      error: "Incorrect credentials!"
    });
  }

  const session = await context.sessionStorage.getSession(request.headers.get("cookie"));
  session.set("userId", userId);

  return redirect("/", {
    headers: { "set-cookie": await context.sessionStorage.commitSession(session) }
  });
}

export default function Login() {
  const actionData = useActionData<typeof action>();
  return (
    <Form method="post">
      <h1>Welcome back</h1>
      <p className="sub-text">Log in to your account</p>

      {actionData ? <p className="error">{actionData.error}</p> : null}

      <label htmlFor="email">Email</label>
      <input id="email" type="email" name="email" required placeholder="you@example.com" />

      <label htmlFor="password">Password</label>
      <input id="password" type="password" name="password" required placeholder="••••••••" />

      <button type="submit">Log in</button>
      <p className="link">
        Don&apos;t have an account? <Link to="/register">Sign up Now</Link>
      </p>
    </Form>
  );
}
