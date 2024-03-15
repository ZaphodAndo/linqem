import { Form, Link, redirect, useActionData } from "@remix-run/react";
import { json } from "@remix-run/cloudflare";
import { createUser, getUserByEmail } from "~/models/user.server";

import type { MetaFunction, LoaderFunctionArgs, ActionFunctionArgs } from "@remix-run/cloudflare";

export const meta: MetaFunction = () => {
  return [
    { title: "Linqem - Sign up" },
    {
      name: "description",
      content: "Create an account for Linqem an elegant link aggregation repository for the web."
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

  const existingUser = await getUserByEmail(email, context);

  if (existingUser) {
    return json({
      error: "A user already exists with this email!"
    });
  }

  const userId = await createUser(
    {
      email: email,
      password: password
    },
    context
  );

  if (userId === null) {
    return json({
      error: "Failed to create user!"
    });
  }

  const session = await context.sessionStorage.getSession(request.headers.get("cookie"));
  session.set("userId", userId);

  return redirect("/", {
    headers: { "set-cookie": await context.sessionStorage.commitSession(session) }
  });
}

export default function Register() {
  const actionData = useActionData<typeof action>();
  return (
    <Form method="post">
      <h1>Get started</h1>
      <p className="sub-text">Create a new account</p>

      {actionData ? <p className="error">{actionData.error}</p> : null}

      <label htmlFor="email">Email</label>
      <input id="email" type="email" name="email" required placeholder="you@example.com" />

      <label htmlFor="password">Password</label>
      <input
        id="password"
        type="password"
        name="password"
        required
        minLength={8}
        placeholder="••••••••"
      />

      <button type="submit">Sign Up</button>
      <p className="link">
        Have an account? <Link to="/login">Log in Now</Link>
      </p>
    </Form>
  );
}
