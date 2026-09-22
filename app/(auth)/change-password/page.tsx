"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ChangePasswordPage() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading } = useAuth();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isLoading, isAuthenticated, router]);

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    if (newPassword !== confirmNewPassword) {
      setError("New passwords do not match");
      return;
    }

    try {
      const response = await fetch("/api/auth/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          currentPassword,
          newPassword,
        }),
        credentials: "include",
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to change password");
      }

      setSuccessMessage("Password changed successfully");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Change Password</h2>
      {error && <div className="alert alert-error mb-4">{error}</div>}
      {successMessage && (
        <div className="alert alert-success mb-4">{successMessage}</div>
      )}
      <form onSubmit={handleChangePassword}>
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Current Password</span>
          </label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="input input-bordered"
            required
          />
        </div>
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">New Password</span>
          </label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="input input-bordered"
            required
          />
        </div>
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Confirm New Password</span>
          </label>
          <input
            type="password"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            className="input input-bordered"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Change Password
        </button>
      </form>
    </div>
  );
}