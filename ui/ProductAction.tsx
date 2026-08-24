"use client";

import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import {
  Check,
  Loader2,
  Pencil,
  Save,
  Trash2,
  X,
} from "lucide-react";

type ProductActionsProps = {
  id: string;
  englishName: string;
  banglaName: string;
  buyingPrice: string | number;
  sellingPrice: string | number;
  stock: number | null;
  expiredDate: string | null;
};

const ProductActions = ({
  id,
  englishName,
  banglaName,
  buyingPrice,
  sellingPrice,
  stock,
  expiredDate,
}: ProductActionsProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    englishName,
    banglaName,
    buyingPrice: String(buyingPrice),
    sellingPrice: String(sellingPrice),
    stock: stock !== null ? String(stock) : "",
    expiredDate: expiredDate
      ? new Date(expiredDate).toISOString().split("T")[0]
      : "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ================= UPDATE =================
  const handleUpdate = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setLoading(true);

    try {
      const updateData = {
        englishName: formData.englishName,
        banglaName: formData.banglaName,
        buyingPrice: Number(formData.buyingPrice),
        sellingPrice: Number(formData.sellingPrice),
        stock:
          formData.stock === ""
            ? null
            : Number(formData.stock),
        expiredDate:
          formData.expiredDate || null,
      };

      const response = await axios.put(
        `https://home-store-backend.vercel.app/api/shop/update-product/${id}`,
        updateData
      );

      if (
        response.data.statusCode === 200 ||
        response.data.success === true
      ) {
        await Swal.fire({
          title: "Product Updated!",
          text: "The product has been successfully updated.",
          icon: "success",
          confirmButtonColor: "#10b981",
        });

        setIsEditing(false);

        window.location.reload();
      }
    } catch (error) {
      console.error("Update product error:", error);

      Swal.fire({
        title: "Update Failed",
        text: "The product could not be updated. Please try again.",
        icon: "error",
        confirmButtonColor: "#10b981",
      });
    } finally {
      setLoading(false);
    }
  };

  // ================= DELETE =================
  const handleDelete = async () => {
    const result = await Swal.fire({
      title: "Delete Product?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Delete",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
    });

    if (!result.isConfirmed) return;

    setLoading(true);

    try {
      const response = await axios.delete(
        `https://home-store-backend.vercel.app/api/shop/delete-product/${id}`
      );

      if (
        response.data.statusCode === 200 ||
        response.data.success === true
      ) {
        await Swal.fire({
          title: "Product Deleted!",
          text: "The product has been successfully deleted.",
          icon: "success",
          confirmButtonColor: "#10b981",
        });

        window.location.href = "/";
      }
    } catch (error) {
      console.error("Delete product error:", error);

      Swal.fire({
        title: "Delete Failed",
        text: "The product could not be deleted. Please try again.",
        icon: "error",
        confirmButtonColor: "#10b981",
      });
    } finally {
      setLoading(false);
    }
  };

  // ================= EDIT FORM =================
  if (isEditing) {
    return (
      <div className="mt-7 rounded-2xl border border-emerald-100 bg-emerald-50/50 p-5">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-emerald-950">
              Edit Product
            </h3>

            <p className="mt-1 text-xs text-gray-500">
              Update the product information below.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsEditing(false)}
            disabled={loading}
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-lg
              bg-white
              text-gray-500
              shadow-sm
              transition
              hover:bg-gray-100
            "
          >
            <X size={18} />
          </button>
        </div>

        <form
          onSubmit={handleUpdate}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2"
        >
          {/* English Name */}
          <div>
            <label
              htmlFor="englishName"
              className="mb-1.5 block text-xs font-semibold text-gray-600"
            >
              English Name
            </label>

            <input
              required
              id="englishName"
              name="englishName"
              value={formData.englishName}
              onChange={handleChange}
              className="
                h-11
                w-full
                rounded-xl
                border
                border-emerald-100
                bg-white
                px-3
                text-sm
                outline-none
                focus:border-emerald-500
                focus:ring-4
                focus:ring-emerald-500/10
              "
            />
          </div>

          {/* Bangla Name */}
          <div>
            <label
              htmlFor="banglaName"
              className="mb-1.5 block text-xs font-semibold text-gray-600"
            >
              Bangla Name
            </label>

            <input
              required
              id="banglaName"
              name="banglaName"
              value={formData.banglaName}
              onChange={handleChange}
              className="
                h-11
                w-full
                rounded-xl
                border
                border-emerald-100
                bg-white
                px-3
                text-sm
                outline-none
                focus:border-emerald-500
                focus:ring-4
                focus:ring-emerald-500/10
              "
            />
          </div>

          {/* Buying Price */}
          <div>
            <label
              htmlFor="buyingPrice"
              className="mb-1.5 block text-xs font-semibold text-gray-600"
            >
              Buying Price
            </label>

            <input
              required
              id="buyingPrice"
              name="buyingPrice"
              type="number"
              min="0"
              step="0.01"
              value={formData.buyingPrice}
              onChange={handleChange}
              className="
                h-11
                w-full
                rounded-xl
                border
                border-emerald-100
                bg-white
                px-3
                text-sm
                outline-none
                focus:border-emerald-500
                focus:ring-4
                focus:ring-emerald-500/10
              "
            />
          </div>

          {/* Selling Price */}
          <div>
            <label
              htmlFor="sellingPrice"
              className="mb-1.5 block text-xs font-semibold text-gray-600"
            >
              Selling Price
            </label>

            <input
              required
              id="sellingPrice"
              name="sellingPrice"
              type="number"
              min="0"
              step="0.01"
              value={formData.sellingPrice}
              onChange={handleChange}
              className="
                h-11
                w-full
                rounded-xl
                border
                border-emerald-100
                bg-white
                px-3
                text-sm
                outline-none
                focus:border-emerald-500
                focus:ring-4
                focus:ring-emerald-500/10
              "
            />
          </div>

          {/* Stock */}
          <div>
            <label
              htmlFor="stock"
              className="mb-1.5 block text-xs font-semibold text-gray-600"
            >
              Stock
            </label>

            <input
              id="stock"
              name="stock"
              type="number"
              min="0"
              value={formData.stock}
              onChange={handleChange}
              placeholder="Leave empty if unavailable"
              className="
                h-11
                w-full
                rounded-xl
                border
                border-emerald-100
                bg-white
                px-3
                text-sm
                outline-none
                focus:border-emerald-500
                focus:ring-4
                focus:ring-emerald-500/10
              "
            />
          </div>

          {/* Expiry */}
          <div>
            <label
              htmlFor="expiredDate"
              className="mb-1.5 block text-xs font-semibold text-gray-600"
            >
              Expiry Date
            </label>

            <input
              id="expiredDate"
              name="expiredDate"
              type="date"
              value={formData.expiredDate}
              onChange={handleChange}
              className="
                h-11
                w-full
                rounded-xl
                border
                border-emerald-100
                bg-white
                px-3
                text-sm
                outline-none
                focus:border-emerald-500
                focus:ring-4
                focus:ring-emerald-500/10
              "
            />
          </div>

          {/* Update Button */}
          <div className="sm:col-span-2">
            <button
              type="submit"
              disabled={loading}
              className="
                flex
                h-11
                w-full
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-emerald-500
                text-sm
                font-bold
                text-white
                shadow-lg
                shadow-emerald-500/20
                transition
                hover:bg-emerald-600
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            >
              {loading ? (
                <>
                  <Loader2
                    size={17}
                    className="animate-spin"
                  />
                  Updating...
                </>
              ) : (
                <>
                  <Save size={17} />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    );
  }

  // ================= ACTION BUTTONS =================
  return (
    <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2">
      <button
        type="button"
        onClick={() => setIsEditing(true)}
        disabled={loading}
        className="
        cursor-pointer
          flex
          h-12
          items-center
          justify-center
          gap-2
          rounded-xl
          border
          border-emerald-200
          bg-emerald-50
          text-sm
          font-bold
          text-emerald-700
          transition-all
          duration-200
          hover:border-emerald-300
          hover:bg-emerald-100
          active:scale-[0.99]
        "
      >
        <Pencil size={18} />
        Edit Product
      </button>

      <button
        type="button"
        onClick={handleDelete}
        disabled={loading}
        className="
        cursor-pointer
          flex
          h-12
          items-center
          justify-center
          gap-2
          rounded-xl
          border
          border-red-100
          bg-red-50
          text-sm
          font-bold
          text-red-600
          transition-all
          duration-200
          hover:border-red-200
          hover:bg-red-100
          active:scale-[0.99]
        "
      >
        {loading ? (
          <Loader2
            size={18}
            className="animate-spin"
          />
        ) : (
          <Trash2 size={18} />
        )}

        Delete Product
      </button>
    </div>
  );
};

export default ProductActions;