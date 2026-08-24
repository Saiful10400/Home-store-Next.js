"use client";

import Link from "next/link";
import { Home, ShoppingBasket } from "lucide-react";
import { usePathname } from "next/navigation";

const MobileNav = () => {
  const pathname = usePathname();

  const isHomeActive = pathname === "/";
  const isProductsActive = pathname.startsWith("/add-products");

  return (
    <nav
      className="
        fixed
        bottom-0
        left-0
        z-50
        w-full
        md:hidden
        px-3
        pb-3
      "
    >
      <div
        className="
          mx-auto
          flex
          h-17
          max-w-md
          items-center
          justify-around
          rounded-3xl
          border
          border-emerald-100
          bg-white/95
          px-4
          shadow-[0_-8px_30px_rgba(16,185,129,0.12)]
          backdrop-blur-xl
        "
      >
        {/* Home */}
        <Link
          href="/"
          className={`
            group
            flex
            min-w-20
            flex-col
            items-center
            justify-center
            gap-1
            rounded-2xl
            py-2
            transition-all
            duration-200
            ${
              isHomeActive
                ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/20"
                : "text-gray-500 hover:bg-emerald-50 hover:text-emerald-600"
            }
          `}
        >
          <Home
            size={20}
            strokeWidth={isHomeActive ? 2.5 : 2}
            className="
              transition-transform
              duration-200
              group-active:scale-90
            "
          />

          <span className="text-[11px] font-semibold">
            Home
          </span>
        </Link>

        {/* Products */}
        <Link
          href="/add-products"
          className={`
            group
            flex
            min-w-20
            flex-col
            items-center
            justify-center
            gap-1
            rounded-2xl
            py-2
            transition-all
            duration-200
            ${
              isProductsActive
                ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/20"
                : "text-gray-500 hover:bg-emerald-50 hover:text-emerald-600"
            }
          `}
        >
          <ShoppingBasket
            size={20}
            strokeWidth={isProductsActive ? 2.5 : 2}
            className="
              transition-transform
              duration-200
              group-active:scale-90
            "
          />

          <span className="text-[11px] font-semibold">
            Add Product
          </span>
        </Link>
      </div>
    </nav>
  );
};

export default MobileNav;