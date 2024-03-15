import { type PlatformProxy } from "wrangler";
import { createCookieSessionStorage, SessionStorage } from "@remix-run/cloudflare";

type Cloudflare = Omit<PlatformProxy<Env>, "dispose">;
type LoadContext = {
  cloudflare: Cloudflare;
};

type SessionData = { userId: string };

declare module "@remix-run/cloudflare" {
  interface AppLoadContext {
    cloudflare: Cloudflare;
    sessionStorage: SessionStorage;
  }
}

export function getLoadContext({ context }: { request: Request; context: LoadContext }) {
  const sessionStorage = createCookieSessionStorage<SessionData>({
    cookie: {
      name: "session",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      secrets: [context.cloudflare.env.SESSION_SECRET ?? "s3cr3t"]
    }
  });

  return { ...context, sessionStorage };
}
