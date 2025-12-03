"use client";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminNavbar from "@/components/admin/AdminNavbar";
import React from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const user = useUser();

  React.useEffect(() => {
    if (user.user && user.user?.role === 0) {
      router.push(window.location.href as any);
    } else {
      router.push("/");
    }
  }, [user.user]);

  return (
    <div className="flex h-screen w-full">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="flex flex-col flex-1 bg-gray-50">
        <AdminNavbar />
        <main className="p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
