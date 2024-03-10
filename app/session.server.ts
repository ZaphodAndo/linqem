import { createCookieSessionStorage } from "@remix-run/cloudflare";

type SessionData = { userId: string };

export const sessionStorage = createCookieSessionStorage<SessionData>({
  cookie: {
    name: "session",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    secrets: [process.env.SESSION_SECRET ?? "s3cr3t"]
  }
});

export const { getSession, commitSession, destroySession } = sessionStorage;
