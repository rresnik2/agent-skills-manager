"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { z } from "zod";
import { registerFormSchema, RegisterFieldErrors } from "@/lib/validation";


/**
 * Register Page - CSR (Client-Side Rendering)
 * Uses client-side state for form handling and registration
 */
export default function RegisterPage() {
  const router = useRouter();
  const { register, isAuthenticated, isLoading } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<RegisterFieldErrors>({});

  // Redirect if already authenticated
  useEffect(() => {
      if (!isLoading && isAuthenticated) {
        router.push("/login");
      }
    }, [isLoading, isAuthenticated, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const result = registerFormSchema.safeParse({ name, email, password, confirmPassword });
    if (!result.success) {
      setFieldErrors(z.flattenError(result.error).fieldErrors);
      return;
    }
    setFieldErrors({});
    setIsSubmitting(true);

    try {
      const { confirmPassword: _, ...data } = result.data;
      await register(data);
      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <h2 className="card-title text-2xl justify-center">Create Account</h2>
      <p className="text-center text-base-content/70">
        Join to create and share agent skills
      </p>

      <form onSubmit={handleSubmit} className="mt-4" noValidate>
        {error && (
          <div className="alert alert-error mb-4">
            <span>{error}</span>
          </div>
        )}

        <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input
            placeholder="Your name"
            className="input input-bordered w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {fieldErrors.name?.[0] && <span className="text-error text-sm">{fieldErrors.name[0]}</span>}
        </div>

        <div className="form-control mt-4">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            placeholder="you@example.com"
            className="input input-bordered w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
          />
          {fieldErrors.email?.[0] && <span className="text-error text-sm">{fieldErrors.email[0]}</span>}
        </div>

        <div className="form-control mt-4">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            placeholder="••••••••"
            className="input input-bordered w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
          {fieldErrors.password?.[0] && <span className="text-error text-sm">{fieldErrors.password[0]}</span>}
        </div>

        <div className="form-control mt-4">
          <label className="label">
            <span className="label-text">Confirm Password</span>
          </label>
          <input
            placeholder="••••••••"
            className="input input-bordered w-full"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            type="password"
          />
          {fieldErrors.confirmPassword?.[0] && <span className="text-error text-sm">{fieldErrors.confirmPassword[0]}</span>}
        </div>

        <div className="form-control mt-6">
          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              "Create Account"
            )}
          </button>
        </div>
      </form>

      <div className="divider">OR</div>

      <p className="text-center">
        Already have an account?{" "}
        <Link href="/login" className="link link-primary">
          Sign in
        </Link>
      </p>
    </>
  );
}