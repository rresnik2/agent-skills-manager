"use client";

import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProfilePage() {

  const router = useRouter();
  const { user, isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
      if (!isLoading && !isAuthenticated) {
        router.push("/login");
      }
    }, [isLoading, isAuthenticated, router]);

  
  
  return (
    <div className="glass mx-auto my-8 px-4 py-8 text-base-content/70 text-center rounded-lg shadow-lg max-w-md">
      <div className="avatar px-4 py-4">
                <div className="w-24 rounded-full">
                  <img alt="Tailwind-CSS-Avatar-component" src="https://img.daisyui.com/images/profile/demo/yellingcat@192.webp" />
                </div>
              </div>
      <h1 className="text-3xl font-bold mb-4">{user?.name}</h1>
      <p>Email: {user?.email}</p>
      <Link href="/change-password" className="hover:text-blue-500 mt-4 inline-block">
        Change Password
      </Link>
      <br />
      <Link href="/dashboard" className="hover:text-blue-500 mt-4 inline-block">
        Go to Dashboard
      </Link>
    </div>
  );
}