"use client";
import BreadcrumbShop from "@/components/features/shop/BreadcrumbShop";
import { Button } from "@/components/ui/button";
import { bookCategories } from "@/data/book_categories";
import { ChevronRight, CircleStar, Heart, Star } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import React from "react";

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const slug = pathname.split("/")[2];

  const [selected, setSelected] = React.useState<string | undefined>(
    slug || undefined
  );

  console.log("slug", slug);
  console.log("selected", selected);

  React.useEffect(() => {
    if (slug) {
      setSelected(slug); // nếu category.name là dạng viết hoa chữ đầu
    } else {
      setSelected(undefined);
    }
  }, [slug]);

  return (
    <div className="overflow-y-hidden">
      <BreadcrumbShop category={selected ? selected : undefined} />
      <div className="flex flex-col justify-center bg-[url('https://cdn.prod.website-files.com/66ab8282560ac2178fdcc6c8/66ed49457e333984431ad27f_image.png')] h-[500px] max-xl:h-[300px] bg-center text-white px-20 max-xl:px-8 xl:m-10 m-5 rounded-2xl">
        <h2 className="text-7xl max-lg:text-3xl font-bold">Big Discount</h2>
        <p className="mt-4 w-[500px] max-lg:text-sm">
          50% Discount for new users
        </p>
        <Button
          variant="default"
          className="cursor-pointer w-fit mt-4 bg-white text-black hover:bg-white inline-flex items-center"
        >
          <ChevronRight />
          Buy Now
        </Button>
      </div>
      <div className="lg:grid grid-cols-4 gap-10 xl:px-20 px-10 mb-20">
        <nav className="col-span-1">
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <h4 className="text-xl font-bold">Recommended Collections</h4>
                <div className="flex flex-col gap-2">
                  <Link
                    href="/shop/top-sellers"
                    className={`inline-flex items-center gap-2 hover:text-blue-500 duration-300 ${
                      selected === "top-sellers" ? "text-blue-500" : ""
                    }`}
                  >
                    <Star size={30} />
                    Top Sellers
                  </Link>
                  <Link
                    href="/shop/featured-sellers"
                    className={`inline-flex items-center gap-2 hover:text-blue-500 duration-300 ${
                      selected === "featured-sellers" ? "text-blue-500" : ""
                    }`}
                  >
                    <CircleStar size={30} />
                    Featured Sellers
                  </Link>
                  <Link
                    href="/shop/editors-picks"
                    className={`inline-flex items-center gap-2 hover:text-blue-500 duration-300 ${
                      selected === "editors-picks" ? "text-blue-500" : ""
                    }`}
                  >
                    <Heart size={30} />
                    Editor’s Picks
                  </Link>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <h4 className="text-xl font-bold">Shop by Category</h4>
              {bookCategories.map((category) => (
                <div
                  key={category.id}
                  className="flex flex-row items-center gap-2 cursor-pointer"
                >
                  <input
                    type="radio"
                    id={`category-${category.id}`}
                    name="brand"
                    checked={selected === category.name.toLowerCase()}
                    onChange={() => {
                      router.push(`/shop/${category.name.toLowerCase()}`);
                    }}
                  />
                  <label htmlFor={`category-${category.id}`}>
                    {category.name}
                  </label>
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-2">
              <h4 className="text-xl font-bold">Filter by top Author</h4>
              <Link
                href="/author/1"
                className="flex flex-row items-center gap-2"
              >
                <img
                  src="https://cdn.prod.website-files.com/66ab8282560ac2178fdcc6f7/6710d687b852284eb2a703b2_Rectangle%20756-2-p-500.avif"
                  alt=""
                  className="w-[50px] h-[50px] rounded-full object-cover"
                />
                <p>John Doe</p>
              </Link>
            </div>
          </div>
        </nav>
        <div className="col-span-3">{children}</div>
      </div>
    </div>
  );
}
