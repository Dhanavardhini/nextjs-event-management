"use client";
import React from "react";
import Head from "next/head";
import { usePathname } from "next/navigation";

const Dashboard = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const isLoginPage = pathname === "/login";

  return (
    <>
      <Head>
        <title>Dashboard</title>
        <meta name="description" content="Description of my page" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      </Head>

      <div className="d-flex flex-column min-vh-100">
        <div className={`flex-grow-1 ${isLoginPage ? "py-0" : "py-3"}`} style={{ marginTop: isLoginPage ? "0" : "30px" }}>
          <div style={{ paddingTop: isLoginPage ? "0" : "1rem" }}>
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
