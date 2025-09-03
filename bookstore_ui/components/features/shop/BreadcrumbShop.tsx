import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import React from "react";

interface BreadcrumbShopProps {
  category: string | undefined;
}

const BreadcrumbShop = ({ category }: BreadcrumbShopProps) => {
  console.log("category in breadcrumb", category);

  return (
    <Breadcrumb className="bg-slate-300 xl:px-50 px-10 py-5">
      <BreadcrumbList>
        <BreadcrumbItem>
          <Link href="/">Home</Link>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <Link href="/shop">Shop</Link>
        </BreadcrumbItem>
        {category && <BreadcrumbSeparator />}
        <BreadcrumbItem>
          {category && (
            <Link href={`/shop/${category}`}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </Link>
          )}
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadcrumbShop;
