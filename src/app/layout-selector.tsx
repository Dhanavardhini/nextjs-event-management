"use client";

import React from "react";
import { usePathname } from "next/navigation";
import LoginForm from "./components/Login/Login";
import Dashboard from "./components/Dashboard/Dashboard";
import DashboardPage from "./register/page";

const LayoutSelector = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  if (pathname === "/login") {
    return <LoginForm />;
  }

  return <Dashboard>{children}</Dashboard>;
};

export default LayoutSelector;
