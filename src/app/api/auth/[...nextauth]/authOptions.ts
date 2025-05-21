import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import crypto from "crypto";
import { openDB } from "@/app/lib/sqlite";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {},
      async authorize(credentials) {
        const { username, password } = credentials as {
          username: string;
          password: string;
        };

        const db = await openDB();
        // await db.exec(`
        //   CREATE TABLE IF NOT EXISTS users (
        //     id INTEGER PRIMARY KEY AUTOINCREMENT,
        //     name TEXT,
        //     email TEXT UNIQUE,
        //     password TEXT
        //   )
        // `);
        // await db.run(
        //   `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`,
        //   ["demo", username, password]
        // );
        const user = await db.get(
          "SELECT * FROM users WHERE email = ? AND password = ?",
          [username, password]
        );

        console.log("user");

        if (user) {
          return {
            id: String(user.id),
            name: user.name,
            email: user.email,
            accessToken: crypto.randomBytes(32).toString("hex"),
          };
        } else {
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.user = user;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.user = token.user;
      return session;
    },
  },
};
