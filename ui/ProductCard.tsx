"use client";

import { Tproduct } from "@/types";
import Image from "next/image";
import {
  CalendarDays,
  Package,
  ShoppingBasket,
} from "lucide-react";
import Link from "next/link";

type ProductCardProps = {
  product: Tproduct;
};

const ProductCard = ({ product }: ProductCardProps) => {
  const isInStock = product.stock !== null && product.stock > 0;

  const formattedExpiry = product.expiredDate
    ? new Date(product.expiredDate).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : null;

  return (
    <Link
    href={`/product/${product._id}`}
      className="
        group relative flex h-full flex-col overflow-hidden
        rounded-3xl
        border border-emerald-100
        bg-white
        shadow-[0_4px_20px_rgba(16,185,129,0.08)]
        transition-all duration-300
        hover:-translate-y-1.5
        hover:border-emerald-200
        hover:shadow-[0_15px_40px_rgba(16,185,129,0.16)]
      "
    >
      {/* ================= IMAGE ================= */}
      <div
        className="
          relative
          h-52
          w-full
          overflow-hidden
          bg-emerald-50
          sm:h-60
          md:h-64
          lg:h-72
        "
      >
        <Image
          src={product.image}
          alt={product.englishName}
          fill
          sizes="
            (max-width: 640px) 100vw,
            (max-width: 768px) 50vw,
            (max-width: 1024px) 33vw,
            25vw
          "
          className="
            object-cover
            transition-transform
            duration-500
            ease-out
            group-hover:scale-105
          "
        />

        {/* Image Overlay */}
        <div
          className="
            pointer-events-none
            absolute
            inset-0
            bg-gradient-to-t
            from-emerald-950/20
            via-transparent
            to-transparent
          "
        />

        {/* Stock Badge */}
        <div className="absolute right-3 top-3 z-10">
          {isInStock ? (
            <span
              className="
                inline-flex
                items-center
                gap-1.5
                rounded-full
                border
                border-emerald-200
                bg-white/90
                px-3
                py-1.5
                text-[11px]
                font-bold
                text-emerald-700
                shadow-sm
                backdrop-blur-md
              "
            >
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              In Stock
            </span>
          ) : (
            <span
              className="
                inline-flex
                items-center
                gap-1.5
                rounded-full
                border
                border-red-200
                bg-white/90
                px-3
                py-1.5
                text-[11px]
                font-bold
                text-red-600
                shadow-sm
                backdrop-blur-md
              "
            >
              <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
              Out of Stock
            </span>
          )}
        </div>

        {/* Product Icon */}
        <div
          className="
            absolute
            bottom-3
            left-3
            z-10
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-xl
            bg-white/90
            text-emerald-600
            shadow-md
            backdrop-blur-md
          "
        >
          <ShoppingBasket size={17} />
        </div>
      </div>

      {/* ================= CONTENT ================= */}
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        {/* Product Name */}
        <div className="mb-4">
          <h2
            className="
              line-clamp-1
              text-base
              font-bold
              tracking-tight
              text-emerald-950
              sm:text-lg
            "
          >
            {product.englishName}
          </h2>

          <p
            className="
              mt-1
              line-clamp-1
              text-xs
              font-medium
              text-emerald-700/60
              sm:text-sm
            "
          >
            {product.banglaName}
          </p>
        </div>

        {/* ================= PRICE ================= */}
        <div
          className="
            mb-4
            flex
            items-end
            justify-between
            rounded-2xl
            bg-emerald-50
            p-3
            sm:p-4
          "
        >
          {/* Selling Price */}
          <div>
            <p
              className="
                mb-1
                text-[10px]
                font-bold
                uppercase
                tracking-wider
                text-emerald-600/60
                sm:text-[11px]
              "
            >
              Selling Price
            </p>

            <p
              className="
                text-xl
                font-extrabold
                tracking-tight
                text-emerald-600
                sm:text-2xl
              "
            >
              ৳{product.sellingPrice}
            </p>
          </div>

          {/* Buying Price */}
          <div className="text-right">
            <p
              className="
                mb-1
                text-[10px]
                font-bold
                uppercase
                tracking-wider
                text-gray-400
                sm:text-[11px]
              "
            >
              Buying
            </p>

            <p className="text-sm font-semibold text-gray-500 sm:text-base">
              ৳{product.buyingPrice}
            </p>
          </div>
        </div>

        {/* ================= DETAILS ================= */}
        <div
          className="
            mt-auto
            grid
            grid-cols-2
            gap-3
            border-t
            border-emerald-100
            pt-4
          "
        >
          {/* Stock */}
          <div className="flex min-w-0 items-center gap-2">
            <div
              className="
                flex
                h-8
                w-8
                shrink-0
                items-center
                justify-center
                rounded-lg
                bg-emerald-50
                text-emerald-600
              "
            >
              <Package size={15} />
            </div>

            <div className="min-w-0">
              <p className="text-[10px] font-medium text-gray-400 sm:text-xs">
                Stock
              </p>

              <p
                className={`truncate text-xs font-bold sm:text-sm ${
                  isInStock ? "text-emerald-700" : "text-red-500"
                }`}
              >
                {product.stock !== null
                  ? `${product.stock} available`
                  : "N/A"}
              </p>
            </div>
          </div>

          {/* Expiry */}
          {formattedExpiry ? (
            <div className="flex min-w-0 items-center justify-end gap-2 text-right">
              <div className="min-w-0">
                <p className="text-[10px] font-medium text-gray-400 sm:text-xs">
                  Expires
                </p>

                <p className="truncate text-xs font-semibold text-gray-600 sm:text-sm">
                  {formattedExpiry}
                </p>
              </div>

              <div
                className="
                  flex
                  h-8
                  w-8
                  shrink-0
                  items-center
                  justify-center
                  rounded-lg
                  bg-yellow-50
                  text-yellow-600
                "
              >
                <CalendarDays size={15} />
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-end">
              <span className="text-xs text-gray-400">
                No expiry date
              </span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;