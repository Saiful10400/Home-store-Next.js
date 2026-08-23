"use client";

import { Tproduct } from "@/types";
import Image from "next/image";
 

type ProductCardProps = {
  product: Tproduct;
};

const ProductCard = ({ product }: ProductCardProps) => {
  const isInStock = product.stock !== null && product.stock > 0;

  return (
    <div
      className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      {/* Image */}
      <div className="relative flex h-60 items-center justify-center overflow-hidden bg-gray-50 p-5">
        <Image
          src={product.image}
          alt={product.englishName}
          width={220}
          height={220}
          className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
        />

        {/* Stock Status */}
        <div className="absolute right-3 top-3">
          {isInStock ? (
            <span className="rounded-full bg-green-100 px-3 py-1.5 text-xs font-semibold text-green-700">
              In Stock
            </span>
          ) : (
            <span className="rounded-full bg-red-100 px-3 py-1.5 text-xs font-semibold text-red-600">
              Out of Stock
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Product Name */}
        <div className="mb-5">
          <h2 className="line-clamp-1 text-lg font-bold text-gray-900">
            {product.englishName}
          </h2>

          <p className="mt-1 line-clamp-1 text-sm text-gray-500">
            {product.banglaName}
          </p>
        </div>

        {/* Price */}
        <div className="mb-5 flex items-end justify-between">
          <div>
            <p className="mb-1 text-xs font-medium uppercase tracking-wide text-gray-400">
              Selling Price
            </p>

            <p className="text-xl font-bold text-pink-600">
              ৳{product.sellingPrice}
            </p>
          </div>

          <div className="text-right">
            <p className="mb-1 text-xs font-medium uppercase tracking-wide text-gray-400">
              Buying Price
            </p>

            <p className="text-sm font-semibold text-gray-600">
              ৳{product.buyingPrice}
            </p>
          </div>
        </div>

        {/* Details */}
        <div className="flex items-center justify-between border-t border-gray-100 pt-4">
          {/* Stock */}
          <div>
            <p className="text-xs text-gray-400">Stock</p>

            <p
              className={`mt-1 text-sm font-semibold ${
                isInStock ? "text-gray-700" : "text-red-500"
              }`}
            >
              {product.stock !== null ? product.stock : "N/A"}
            </p>
          </div>

          {/* Expiry */}
          {product.expiredDate && (
            <div className="text-right">
              <p className="text-xs text-gray-400">Expires</p>

              <p className="mt-1 text-sm font-medium text-gray-600">
                {new Date(product.expiredDate).toLocaleDateString()}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;