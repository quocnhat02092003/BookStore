"use client";
import Link from "next/link";
import { LayoutDashboard, Book, Users, ShoppingCart } from "lucide-react";
import React from "react";
import { usePathname } from "next/navigation";

export default function AdminSidebar() {
  const pathname = usePathname();
  const urlPath = pathname.split("/")[2] ? pathname.split("/")[2] : "";
  const [tabActive, setTabActive] = React.useState<string>(urlPath);
  React.useEffect(() => {
    setTabActive(urlPath);
  }, [urlPath]);
  return (
    <aside className="max-lg:flex flex-col items-center lg:w-64 bg-white border-r h-full p-6">
      <img
        src="https://cdn.prod.website-files.com/66ab8282560ac2178fdcc6c8/671207dc6dd97695b9d61f2a_Logo.png"
        alt="BookStore Admin"
        className="text-xl font-bold mb-8 max-lg:hidden"
      />
      <img
        src="https://png.pngtree.com/png-vector/20190527/ourmid/pngtree-book-icon-png-image_1110447.jpg"
        alt="Book icon"
        className="w-12 h-12 mb-4 lg:hidden"
      />

      <nav className="max-lg:flex flex-col items-center space-y-4">
        <Link
          onClick={() => setTabActive("")}
          href="/admin"
          className={`flex items-center gap-3 p-2 rounded hover:bg-gray-100 ${
            tabActive === "" ? "bg-gray-200" : ""
          }`}
        >
          <LayoutDashboard size={20} />{" "}
          <p className="max-lg:hidden">Dashboard</p>
        </Link>

        <Link
          onClick={() => setTabActive("books")}
          href="/admin/books"
          className={`flex items-center gap-3 p-2 rounded hover:bg-gray-100 ${
            tabActive === "books" ? "bg-gray-200" : ""
          }`}
        >
          <Book size={20} /> <p className="max-lg:hidden">Books</p>
        </Link>

        <Link
          onClick={() => setTabActive("orders")}
          href="/admin/orders"
          className={`flex items-center gap-3 p-2 rounded hover:bg-gray-100 ${
            tabActive === "orders" ? "bg-gray-200" : ""
          }`}
        >
          <ShoppingCart size={20} /> <p className="max-lg:hidden">Orders</p>
        </Link>

        <Link
          onClick={() => setTabActive("users")}
          href="/admin/users"
          className={`flex items-center gap-3 p-2 rounded hover:bg-gray-100 ${
            tabActive === "users" ? "bg-gray-200" : ""
          }`}
        >
          <Users size={20} /> <p className="max-lg:hidden">Users</p>
        </Link>
      </nav>
    </aside>
  );
}
