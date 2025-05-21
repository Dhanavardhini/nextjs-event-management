"use client";
import LoginForm from "../components/Login/Login";

export default function Login() {
  return (
<div className="container d-flex justify-content-center align-items-center vh-100" style={{ overflowX: "hidden" }}>
  <div className="w-100" style={{ maxWidth: "960px" }}>
    <LoginForm />
  </div>
</div>
  );
}
