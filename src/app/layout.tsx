import * as React from "react";
import type { Metadata } from "next";
import "./globals.css";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/authOptions";
import LayoutSelector from "./layout-selector";
import Provider from "./components/Auth/Auth";
import 'bootstrap/dist/css/bootstrap.min.css';

export const metadata: Metadata = {
  title: "Technical Round",
  description: "Event Form Creation",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = (await getServerSession(authOptions))!;

  return (
    <html>
      <body suppressHydrationWarning={true}>
        <Provider session={session}>
          <LayoutSelector>{children}</LayoutSelector>
        </Provider>
      </body>
    </html>
  );
}
