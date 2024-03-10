import bcrypt from "bcryptjs";

import type { AppLoadContext } from "@remix-run/cloudflare";
import type { IUser } from "~/Interfaces/IUser";

type UserCredentials = {
  email: string;
  password: string;
};

export async function createUser(
  { email, password }: UserCredentials,
  context: AppLoadContext
): Promise<string | null> {
  const hashedPassword = await bcrypt.hash(password, 10);
  const userId = crypto.randomUUID();
  const createdAt = new Date().toISOString();

  const env = context.cloudflare.env as Env;
  const { success } = await env.LINQEM_DB.prepare(
    "INSERT INTO users (user_id, created_at, email, password, username) values (?, ?, ?, ?, ?)"
  )
    .bind(userId, createdAt, email, hashedPassword, "Linqem user")
    .run();

  if (success) {
    return userId;
  } else {
    return null;
  }
}

export async function getUserByEmail(email: string, context: AppLoadContext): Promise<boolean> {
  const env = context.cloudflare.env as Env;
  const { results } = await env.LINQEM_DB.prepare(
    `SELECT email FROM users WHERE email = '${email}'`
  ).all();

  return results.length !== 0;
}

export async function verifyLogin(
  { email, password }: UserCredentials,
  context: AppLoadContext
): Promise<string | null> {
  const env = context.cloudflare.env as Env;
  const { results } = await env.LINQEM_DB.prepare(
    `SELECT password, user_id FROM users WHERE email = '${email}'`
  ).all<IUser>();

  const user = results[0];
  if (!user) {
    return null;
  }

  const isValid = await bcrypt.compare(password, user.password);

  if (!isValid) {
    return null;
  }

  return user.user_id;
}
