"use client";
import React, { useCallback } from "react";
import { signIn } from "next-auth/react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
type LoginData = z.infer<typeof loginSchema>;
const LoginForm = () => {
  const form = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "demo@gmail.com" || "",
      password: "demo123" || "",
    },
  });

  const {
    handleSubmit,
    control,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = form;

  const onSubmit: SubmitHandler<LoginData> = useCallback(async function (data) {

    console.log(data)
    const res = await signIn("credentials", {
      username: data.email,
      password: data.password,
      redirect: false,
    });
    console.log(res)
    if (res?.error) {
      setError("root", {
        type: "manual",
        message: "Invalid email or password",
      });
    } else {
      window.location.href = "/";
    }
  }, [setError]);

  const handleInputChange = () => {
    clearErrors("root");
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div
        className="card p-4 shadow-sm"
        style={{ minWidth: "350px", maxWidth: "400px" }}
      >
        <h3 className="text-center mb-4">Login</h3>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <Controller
              name="email"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <input
                  type="email"
                  className={`form-control ${errors.email ? "is-invalid" : ""}`}
                  placeholder="Enter your email"
                  {...field}
                  onChange={(e) => {
                    handleInputChange();
                    field.onChange(e);
                  }}
                />
              )}
            />
            {errors.email && (
              <div className="invalid-feedback">{errors.email.message}</div>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <Controller
              name="password"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <input
                  type="password"
                  className={`form-control ${errors.password ? "is-invalid" : ""
                    }`}
                  placeholder="Enter your password"
                  {...field}
                  onChange={(e) => {
                    handleInputChange();
                    field.onChange(e);
                  }}
                />
              )}
            />
            {errors.password && (
              <div className="invalid-feedback">{errors.password.message}</div>
            )}
          </div>
          {errors.root && (
            <div className="alert alert-danger py-1 fs-6">
              {errors.root.message}
            </div>
          )}
          <div className="d-grid">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
