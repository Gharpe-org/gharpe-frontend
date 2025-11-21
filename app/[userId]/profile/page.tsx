"use client";

import { useEffect, useState } from "react";
import { auth } from "@/firebase";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((u) => {
      if (u) setUser(u);
      else router.push("/login");
    });
    return () => unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    await auth.signOut();
    router.push("/login");
  };

  if (!user) return <div className="p-6">Loading...</div>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold mb-4">Welcome, {user.displayName || user.phoneNumber}</h1>
      <p className="mb-6 text-gray-700">{user.email}</p>
      <button
        onClick={handleLogout}
        className="py-2 px-4 bg-red-500 text-white rounded-xl hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
}
