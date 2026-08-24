import { Tproduct } from "@/types";
import Link from "next/link";
import {
  ArrowLeft,
  Barcode,
  CalendarDays,
  CircleDollarSign,
  Package,
  ShoppingBasket,
  Tag,
  TrendingUp,
} from "lucide-react";
import ProductActions from "@/ui/ProductAction";

 
type Props = {
  params: Promise<{ id: string }>;
};

const fetchProduct = async (id: string): Promise<Tproduct> => {
  const res = await fetch(
    `https://home-store-backend.vercel.app/api/shop/find-product?id=${id}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch product");
  }

  const data = await res.json();

  return data.data;
};

export default async function ProductPage({ params }: Props) {
  const { id } = await params;

  const product = await fetchProduct(id);

  const isInStock =
    product.stock !== null && product.stock > 0;

  const buyingPrice = Number(product.buyingPrice);
  const sellingPrice = Number(product.sellingPrice);

  const profit = sellingPrice - buyingPrice;

  const profitPercentage =
    buyingPrice > 0
      ? ((profit / buyingPrice) * 100).toFixed(1)
      : "0";

  const formattedExpiry = product.expiredDate
    ? new Date(product.expiredDate).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : null;

  return (
    <main className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-lime-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">

        {/* ================= TOP BAR ================= */}
        <div className="mb-6 flex items-center justify-between">
          <Link
            href="/"
            className="
              group
              inline-flex
              items-center
              gap-2
              rounded-xl
              border
              border-emerald-100
              bg-white
              px-4
              py-2.5
              text-sm
              font-semibold
              text-emerald-700
              shadow-sm
              transition-all
              duration-200
              hover:border-emerald-200
              hover:bg-emerald-50
              hover:shadow-md
            "
          >
            <ArrowLeft
              size={17}
              className="
                transition-transform
                duration-200
                group-hover:-translate-x-1
              "
            />

            Back to Products
          </Link>

          <div
            className="
              hidden
              items-center
              gap-2
              rounded-full
              border
              border-emerald-100
              bg-white
              px-4
              py-2
              text-xs
              font-semibold
              text-emerald-600
              shadow-sm
              sm:flex
            "
          >
            <ShoppingBasket size={15} />
            Product Details
          </div>
        </div>

        {/* ================= MAIN CARD ================= */}
        <div
          className="
            overflow-hidden
            rounded-3xl
            border
            border-emerald-100
            bg-white
            shadow-[0_15px_50px_rgba(16,185,129,0.10)]
          "
        >
          <div className="grid grid-cols-1 lg:grid-cols-2">

            {/* ================= IMAGE SECTION ================= */}
            <div
              className="
                relative
                min-h-[350px]
                overflow-hidden
                bg-gradient-to-br
                from-emerald-50
                via-lime-50
                to-yellow-50
                sm:min-h-[450px]
                lg:min-h-[600px]
              "
            >
              {/* Decorative circle */}
              <div
                className="
                  absolute
                  -right-20
                  -top-20
                  h-64
                  w-64
                  rounded-full
                  bg-emerald-200/30
                  blur-3xl
                "
              />

              <div
                className="
                  absolute
                  -bottom-20
                  -left-20
                  h-72
                  w-72
                  rounded-full
                  bg-yellow-200/30
                  blur-3xl
                "
              />

              {/* Product Image */}
              <img
                src={product.image}
                alt={product.englishName}
                className="
                  relative
                  z-10
                  h-full
                  min-h-[350px]
                  w-full
                  object-contain
                  p-6
                  transition-transform
                  duration-500
                  hover:scale-105
                  sm:min-h-[450px]
                  sm:p-10
                  lg:min-h-[600px]
                  lg:p-12
                "
              />

              {/* Stock Status */}
              <div className="absolute left-5 top-5 z-20">
                {isInStock ? (
                  <span
                    className="
                      inline-flex
                      items-center
                      gap-2
                      rounded-full
                      border
                      border-emerald-200
                      bg-white/90
                      px-4
                      py-2
                      text-xs
                      font-bold
                      text-emerald-700
                      shadow-md
                      backdrop-blur-md
                    "
                  >
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    In Stock
                  </span>
                ) : (
                  <span
                    className="
                      inline-flex
                      items-center
                      gap-2
                      rounded-full
                      border
                      border-red-200
                      bg-white/90
                      px-4
                      py-2
                      text-xs
                      font-bold
                      text-red-600
                      shadow-md
                      backdrop-blur-md
                    "
                  >
                    <span className="h-2 w-2 rounded-full bg-red-500" />
                    Out of Stock
                  </span>
                )}
              </div>

              {/* Product Type */}
              <div
                className="
                  absolute
                  bottom-5
                  left-5
                  z-20
                  flex
                  items-center
                  gap-2
                  rounded-xl
                  bg-white/90
                  px-3
                  py-2
                  text-xs
                  font-semibold
                  text-emerald-700
                  shadow-md
                  backdrop-blur-md
                "
              >
                <ShoppingBasket size={15} />
                Grocery Product
              </div>
            </div>

            {/* ================= PRODUCT INFORMATION ================= */}
            <div className="flex flex-col p-5 sm:p-8 lg:p-10">

              {/* Product Heading */}
              <div className="mb-7">
                <div className="mb-3 flex items-center gap-2">
                  <span
                    className="
                      rounded-full
                      bg-emerald-100
                      px-3
                      py-1
                      text-[10px]
                      font-bold
                      uppercase
                      tracking-wider
                      text-emerald-700
                    "
                  >
                    Product
                  </span>

                  {product._id && (
                    <span className="text-xs text-gray-400">
                      #{product._id.slice(-6)}
                    </span>
                  )}
                </div>

                <h1
                  className="
                    text-3xl
                    font-extrabold
                    tracking-tight
                    text-emerald-950
                    sm:text-4xl
                  "
                >
                  {product.englishName}
                </h1>

                <p className="mt-2 text-base text-emerald-700/60">
                  {product.banglaName}
                </p>
              </div>

              {/* ================= PRICE ================= */}
              <div
                className="
                  mb-7
                  rounded-2xl
                  bg-gradient-to-r
                  from-emerald-50
                  to-lime-50
                  p-5
                "
              >
                <p
                  className="
                    mb-2
                    text-xs
                    font-bold
                    uppercase
                    tracking-wider
                    text-emerald-600/60
                  "
                >
                  Selling Price
                </p>

                <div className="flex flex-wrap items-end justify-between gap-4">
                  <div>
                    <p
                      className="
                        text-4xl
                        font-extrabold
                        tracking-tight
                        text-emerald-600
                      "
                    >
                      ৳{sellingPrice}
                    </p>

                    <p className="mt-1 text-sm text-gray-400">
                      Buying price: ৳{buyingPrice}
                    </p>
                  </div>

                  {/* Profit */}
                  <div
                    className="
                      flex
                      items-center
                      gap-2
                      rounded-xl
                      bg-white
                      px-3
                      py-2
                      shadow-sm
                    "
                  >
                    <TrendingUp
                      size={17}
                      className="text-emerald-500"
                    />

                    <div>
                      <p className="text-[10px] font-medium text-gray-400">
                        Profit
                      </p>

                      <p className="text-sm font-bold text-emerald-600">
                        ৳{profit} ({profitPercentage}%)
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* ================= INFORMATION GRID ================= */}
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">

                {/* Stock */}
                <div
                  className="
                    rounded-2xl
                    border
                    border-emerald-100
                    bg-emerald-50/50
                    p-4
                  "
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="
                        flex
                        h-10
                        w-10
                        shrink-0
                        items-center
                        justify-center
                        rounded-xl
                        bg-emerald-100
                        text-emerald-600
                      "
                    >
                      <Package size={19} />
                    </div>

                    <div>
                      <p className="text-xs text-gray-400">
                        Available Stock
                      </p>

                      <p
                        className={`mt-1 text-sm font-bold ${
                          isInStock
                            ? "text-emerald-700"
                            : "text-red-500"
                        }`}
                      >
                        {product.stock !== null
                          ? `${product.stock} units`
                          : "Not Available"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Buying Price */}
                <div
                  className="
                    rounded-2xl
                    border
                    border-emerald-100
                    bg-emerald-50/50
                    p-4
                  "
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="
                        flex
                        h-10
                        w-10
                        shrink-0
                        items-center
                        justify-center
                        rounded-xl
                        bg-emerald-100
                        text-emerald-600
                      "
                    >
                      <CircleDollarSign size={19} />
                    </div>

                    <div>
                      <p className="text-xs text-gray-400">
                        Buying Price
                      </p>

                      <p className="mt-1 text-sm font-bold text-emerald-800">
                        ৳{buyingPrice}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Expiry */}
                <div
                  className="
                    rounded-2xl
                    border
                    border-yellow-100
                    bg-yellow-50/50
                    p-4
                  "
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="
                        flex
                        h-10
                        w-10
                        shrink-0
                        items-center
                        justify-center
                        rounded-xl
                        bg-yellow-100
                        text-yellow-600
                      "
                    >
                      <CalendarDays size={19} />
                    </div>

                    <div>
                      <p className="text-xs text-gray-400">
                        Expiry Date
                      </p>

                      <p className="mt-1 text-sm font-bold text-gray-700">
                        {formattedExpiry ?? "No Expiry Date"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Barcode */}
                <div
                  className="
                    rounded-2xl
                    border
                    border-emerald-100
                    bg-emerald-50/50
                    p-4
                  "
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="
                        flex
                        h-10
                        w-10
                        shrink-0
                        items-center
                        justify-center
                        rounded-xl
                        bg-emerald-100
                        text-emerald-600
                      "
                    >
                      <Barcode size={19} />
                    </div>

                    <div className="min-w-0">
                      <p className="text-xs text-gray-400">
                        Barcode
                      </p>

                      <p className="mt-1 truncate text-sm font-bold text-gray-700">
                        {product.barCode ?? "Not Available"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* ================= PRODUCT ID ================= */}
              <div className="mt-7 border-t border-emerald-100 pt-6">
                <div className="flex items-center gap-3">
                  <div
                    className="
                      flex
                      h-10
                      w-10
                      shrink-0
                      items-center
                      justify-center
                      rounded-xl
                      bg-emerald-500
                      text-white
                      shadow-md
                      shadow-emerald-500/20
                    "
                  >
                    <Tag size={18} />
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs text-gray-400">
                      Product ID
                    </p>

                    <p className="mt-1 break-all text-xs font-semibold text-gray-600">
                      {product._id}
                    </p>
                  </div>
                </div>
              </div>

              {/* ================= UPDATE / DELETE ================= */}
              <ProductActions
                id={product._id}
                englishName={product.englishName}
                banglaName={product.banglaName}
                buyingPrice={product.buyingPrice}
                sellingPrice={product.sellingPrice}
                stock={product.stock}
                expiredDate={formattedExpiry}
              />

              {/* Back Button */}
              <Link
                href="/"
                className="
                  mt-3
                  flex
                  h-12
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  border
                  border-emerald-100
                  bg-white
                  px-5
                  text-sm
                  font-bold
                  text-emerald-700
                  transition-all
                  duration-200
                  hover:bg-emerald-50
                  active:scale-[0.99]
                "
              >
                <ArrowLeft size={18} />
                Back to Products
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}