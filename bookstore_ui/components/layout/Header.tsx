"use client";
import React from "react";
import {
  ChevronDown,
  Menu,
  ShoppingCart,
  Smile,
  UserRound,
  X,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { bookCategories } from "@/data/book_categories";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { pageMenuDropdown } from "@/data/page_menu_dropdown";
import { useUser } from "@/context/UserContext";

const Header = () => {
  const [isActiveTab, setIsActiveTab] = React.useState<string>("home");

  const [isOnClickCategory, setIsOnClickCategory] =
    React.useState<boolean>(false);
  const [isOnClickPages, setIsOnClickPages] = React.useState<boolean>(false);

  const [onOpenMenu, setOnOpenMenu] = React.useState<boolean>(false);

  //User from useContext
  const user = useUser();

  return (
    <div className="flex items-center justify-between py-4 px-8 max-lg:px-4 bg-gray-100 fixed w-screen left-0 z-[999]">
      <Link href="/">
        <img
          src="https://cdn.prod.website-files.com/66ab8282560ac2178fdcc6c8/671207dc6dd97695b9d61f2a_Logo.png"
          alt="Logo"
          width="200"
          className="px-4"
        />
      </Link>
      <ul className="max-lg:hidden flex items-center gap-6 text-slate-600 px-10">
        <Link href="/" className="cursor-pointer">
          Home{" "}
        </Link>

        {/* Category */}

        <li
          onClick={() => {
            setIsOnClickCategory(!isOnClickCategory);
            setIsOnClickPages(false);
          }}
          className="flex items-center relative cursor-pointer"
        >
          Category <ChevronDown size={20} />
          {isOnClickCategory && (
            <div className="absolute flex flex-row gap-10 items-center top-[70%] left-[-100%] bg-gray-100 rounded-md mt-2 p-10">
              <div className="w-[500px]">
                <h1 className="text-3xl mb-5">Book Categories</h1>
                <div className="grid grid-cols-2 gap-2 mb-5">
                  {bookCategories.map((category) => (
                    <Link
                      key={category.id}
                      href={`/shop/${category.name.toLowerCase()}`}
                      className="p-2 border-b hover:text-green-700 hover:border-green-700 duration-500"
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
                <Button className="mt-4">View All Categories</Button>
              </div>
              <div>
                <img
                  src="https://cdn.prod.website-files.com/66ab8282560ac2178fdcc6c8/66dfd60880368018c1fad4e1_book%20image.png"
                  alt="Book"
                />
              </div>
            </div>
          )}
        </li>
        <Link href="/shop" className="cursor-pointer">
          Shop
        </Link>

        {/* Pages */}

        <li
          onClick={() => {
            setIsOnClickPages(!isOnClickPages);
            setIsOnClickCategory(false);
          }}
          className="flex items-center relative cursor-pointer"
        >
          Pages
          <ChevronDown size={20} />
          {isOnClickPages && (
            <div className="absolute top-[70%] -left-4 bg-gray-100 shadow-md rounded-md mt-2">
              <ul className="w-48">
                <li className="p-5 hover:bg-gray-200 rounded-t-md">
                  <Link href="about">About Us</Link>
                </li>
                <li className="p-5 hover:bg-gray-200">
                  <Link href="blog">Blog</Link>
                </li>
                <li className="p-5 hover:bg-gray-200">
                  <Link href="contact">Contact</Link>
                </li>
                <li className="p-5 hover:bg-gray-200 rounded-b-md">
                  <Link href="faq">FAQ</Link>
                </li>
              </ul>
            </div>
          )}
        </li>
        <Link href={"/blog"} className="cursor-pointer">
          Blog
        </Link>
        <Link href="/contact" className="cursor-pointer">
          Contact
        </Link>
      </ul>
      <div className="flex items-center space-x-2">
        <Input className="max-lg:hidden" placeholder="Search..." />
        <Link href="/cart">
          <ShoppingCart />
        </Link>
        {!user ? (
          <Link className="hover:text-blue-500 duration-300" href="/login">
            <UserRound />
          </Link>
        ) : (
          <Link className="hover:text-blue-500 duration-300" href="/my-account">
            <img
              src="https://w7.pngwing.com/pngs/205/731/png-transparent-default-avatar.png"
              className="w-[60px]"
            />
          </Link>
        )}
        {!onOpenMenu ? (
          <Menu
            className="lg:hidden cursor-pointer"
            onClick={() => setOnOpenMenu(!onOpenMenu)}
          />
        ) : (
          <X
            className="lg:hidden cursor-pointer"
            onClick={() => {
              setOnOpenMenu(!onOpenMenu);
              setIsOnClickCategory(false);
              setIsOnClickPages(false);
            }}
          />
        )}
      </div>
      {onOpenMenu && (
        <ul className="lg:hidden absolute bg-gray-100 top-[60px] w-full left-0 space-y-6 px-4 text-slate-600 py-4">
          <li className="cursor-pointer">Home </li>
          <li
            className="inline-flex items-center cursor-pointer relative"
            onClick={() => setIsOnClickCategory(!isOnClickCategory)}
          >
            Category <ChevronDown size={20} />
          </li>
          {isOnClickCategory && (
            <div className="flex flex-row gap-10 items-center rounded-md w-fit">
              <div>
                <h1 className="text-3xl max-lg:hidden mb-5">Book Categories</h1>
                <div className="grid grid-cols-2 max-sm:grid-cols-1 max-md:text-sm gap-2 mb-5">
                  {bookCategories.map((category) => (
                    <Link
                      key={category.id}
                      href={`/shop/${category.name.toLowerCase()}`}
                      className="p-2 border-b hover:text-green-700 hover:border-green-700 duration-500"
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
                <Button size="sm">View All Categories</Button>
              </div>
              <div className="max-lg:hidden">
                <img
                  src="https://cdn.prod.website-files.com/66ab8282560ac2178fdcc6c8/66dfd60880368018c1fad4e1_book%20image.png"
                  alt="Book"
                />
              </div>
            </div>
          )}
          <li className="cursor-pointer">Shop</li>
          <li
            className="inline-flex items-center cursor-pointer"
            onClick={() => setIsOnClickPages(!isOnClickPages)}
          >
            Pages <ChevronDown size={20} />
          </li>
          {isOnClickPages && (
            <ul className="flex flex-col max-md:text-sm w-fit">
              {pageMenuDropdown.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="p-2 border-b hover:text-green-700 hover:border-green-700 duration-500"
                >
                  {item.title}
                </Link>
              ))}
            </ul>
          )}
          <li className="cursor-pointer">Blog</li>
          <li className="cursor-pointer">Contact</li>
        </ul>
      )}
    </div>
  );
};

export default Header;
