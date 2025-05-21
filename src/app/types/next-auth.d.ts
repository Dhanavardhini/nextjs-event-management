// next-auth.d.ts
import { DefaultSession, DefaultUser } from "next-auth";
import { JWT as DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session extends DefaultSession {
    accessToken: string;
    user: {
      name?: string | null;
      email?: string | null;
    };
  }

  interface User extends DefaultUser {
    accessToken: string;
    name?: string | null;
    email?: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    accessToken: string;
    user: {
      name?: string | null;
      email?: string | null;
    };
  }
}
