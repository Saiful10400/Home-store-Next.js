"use client";

import Link from "next/link";
import { Home, ShoppingBasket } from "lucide-react";
import { usePathname } from "next/navigation";

const NavBar = () => {
  const pathname = usePathname();

  const navStyle =
    "group flex items-center gap-2.5 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-200";

  const activeStyle =
    "bg-emerald-500 text-white shadow-md shadow-emerald-500/20";

  const inactiveStyle =
    "text-gray-600 hover:bg-emerald-50 hover:text-emerald-600";

  return (
    <nav
      className="
        sticky top-0 left-0 z-50
        hidden md:block
        rounded-b-3xl
        border-b border-emerald-100
        bg-white/90
        shadow-[0_4px_20px_rgba(16,185,129,0.08)]
        backdrop-blur-xl
      "
    >
      <div
        className="
          mx-auto
          flex
          h-20
          max-w-7xl
          items-center
          justify-between
          px-6
          lg:px-8
        "
      >
        {/* Logo */}
        <Link
          href="/"
          className="group flex items-center gap-3"
        >
          <div
            className="
              flex h-11 w-11
              items-center justify-center
              rounded-2xl
              bg-emerald-500
              text-white
              shadow-lg
              shadow-emerald-500/20
              transition-all
              duration-300
              group-hover:rotate-3
              group-hover:bg-emerald-600
            "
          >
            <ShoppingBasket
              size={23}
              strokeWidth={2.2}
            />
          </div>

          <div className="leading-none">
            <h1
              className="
                text-lg font-extrabold
                tracking-tight
                text-emerald-950
                lg:text-xl
              "
            >
              FreshMart
            </h1>

            <p
              className="
                mt-1
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.18em]
                text-emerald-600
              "
            >
              Grocery Store
            </p>
          </div>
        </Link>

        {/* Navigation */}
        <ul className="flex items-center gap-2">
          {/* Home */}
          <li>
            <Link
              href="/"
              className={`${navStyle} ${
                pathname === "/"
                  ? activeStyle
                  : inactiveStyle
              }`}
            >
              <Home
                size={18}
                strokeWidth={2.2}
                className="transition-transform duration-200 group-hover:scale-110"
              />

              <span>Home</span>
            </Link>
          </li>

          {/* Products */}
          <li>
            <Link
              href="/products"
              className={`${navStyle} ${
                pathname.startsWith("/products")
                  ? activeStyle
                  : inactiveStyle
              }`}
            >
              <ShoppingBasket
                size={18}
                strokeWidth={2}
                className="transition-transform duration-200 group-hover:scale-110"
              />

              <span>Products</span>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;