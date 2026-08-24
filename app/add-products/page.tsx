// app/create-product/page.tsx
"use client";

import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Image from "next/image";
import {
    Camera,
    CheckCircle2,
    ImagePlus,
    Loader2,
    PackagePlus,
    UploadCloud,
} from "lucide-react";


import { Tproduct } from "@/types";
import { imageUploadToDb } from "@/utils";

const CreateProduct = () => {
    const [waiting, setWaiting] = useState(false);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);

    const formHandle = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        const form = e.currentTarget;

        const englishName = (
            form.elements.namedItem("englishName") as HTMLInputElement
        ).value;

        const banglaName = (
            form.elements.namedItem("banglaName") as HTMLInputElement
        ).value;

        const buyingPrice = (
            form.elements.namedItem("buyingPrice") as HTMLInputElement
        ).value;

        const sellingPrice = (
            form.elements.namedItem("sellingPrice") as HTMLInputElement
        ).value;

        const stock = (
            form.elements.namedItem("stock") as HTMLInputElement
        ).value;

        const expiredDate = (
            form.elements.namedItem("expiredDate") as HTMLInputElement
        ).value;

        // Image is required
        if (!imageFile) {
            await Swal.fire({
                title: "Image Required",
                text: "Please select a product image before submitting.",
                icon: "warning",
                confirmButtonColor: "#10b981",
            });

            return;
        }

        setWaiting(true);

        try {
            // Upload image
            const photoUrl = await imageUploadToDb(imageFile);

            const data: Partial<Tproduct> = {
                englishName,
                banglaName,
                buyingPrice: buyingPrice,
                sellingPrice: sellingPrice,
                stock: Number(stock),
                expiredDate,
                image: photoUrl,
            };

            // Create product
            const response = await axios.post(
                "https://home-store-backend.vercel.app/api/shop/create-product",
                data
            );

            if (response.data.statusCode === 200) {
                form.reset();

                setImageFile(null);
                setImagePreview(null);

                await Swal.fire({
                    title: "Product Added!",
                    text: "The new product has been successfully added.",
                    icon: "success",
                    confirmButtonText: "Continue",
                    confirmButtonColor: "#10b981",
                });

                window.location.reload();
            }
        } catch (error) {
            console.error("Product creation error:", error);

            Swal.fire({
                title: "Something Went Wrong",
                text: "The product could not be created. Please try again.",
                icon: "error",
                confirmButtonText: "Try Again",
                confirmButtonColor: "#10b981",
            });
        } finally {
            setWaiting(false);
        }
    };

    // Handle image selection
    const handleImageChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = e.target.files?.[0];

        if (!file) return;

        setImageFile(file);

        const previewUrl = URL.createObjectURL(file);
        setImagePreview(previewUrl);
    };

    return (
        <div
            className="
        min-h-screen
        bg-linear-to-br
        from-emerald-50
        via-white
        to-lime-50
        px-4
        py-6
        sm:px-6
        lg:px-8
      "
        >
            <div className="mx-auto max-w-4xl">

                {/* ================= HEADER ================= */}
                <div className="mb-6 flex items-center gap-4">
                    <div
                        className="
              flex
              h-12
              w-12
              shrink-0
              items-center
              justify-center
              rounded-2xl
              bg-emerald-500
              text-white
              shadow-lg
              shadow-emerald-500/20
            "
                    >
                        <PackagePlus
                            size={24}
                            strokeWidth={2.2}
                        />
                    </div>

                    <div>
                        <h1
                            className="
                text-xl
                font-extrabold
                tracking-tight
                text-emerald-950
                sm:text-2xl
              "
                        >
                            Add New Product
                        </h1>

                        <p className="mt-1 text-xs text-emerald-700/60 sm:text-sm">
                            Add a new product to your grocery store
                        </p>
                    </div>
                </div>

                {/* ================= FORM ================= */}
                <form
                    onSubmit={formHandle}
                    className="
            overflow-hidden
            rounded-3xl
            border
            border-emerald-100
            bg-white
            shadow-[0_10px_40px_rgba(16,185,129,0.08)]
          "
                >
                    {/* Form Header */}
                    <div
                        className="
              border-b
              border-emerald-100
              bg-linear-to-r
              from-emerald-50
              to-lime-50
              px-5
              py-4
              sm:px-7
            "
                    >
                        <h2 className="font-bold text-emerald-900">
                            Product Information
                        </h2>

                        <p className="mt-1 text-xs text-emerald-700/60">
                            Enter the product information below
                        </p>
                    </div>

                    <div className="p-5 sm:p-7">

                        {/* ================= BASIC INFORMATION ================= */}
                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                            {/* English Name */}
                            <div>
                                <label
                                    htmlFor="englishName"
                                    className="
                    mb-2
                    block
                    text-sm
                    font-semibold
                    text-emerald-950
                  "
                                >
                                    English Name
                                </label>

                                <input
                                    required
                                    id="englishName"
                                    name="englishName"
                                    type="text"
                                    placeholder="Example: Fresh Milk"
                                    className="
                    h-12
                    w-full
                    rounded-xl
                    border
                    border-emerald-100
                    bg-emerald-50/40
                    px-4
                    text-sm
                    text-emerald-950
                    outline-none
                    transition
                    placeholder:text-gray-400
                    focus:border-emerald-500
                    focus:bg-white
                    focus:ring-4
                    focus:ring-emerald-500/10
                  "
                                />
                            </div>

                            {/* Bangla Name */}
                            <div>
                                <label
                                    htmlFor="banglaName"
                                    className="
                    mb-2
                    block
                    text-sm
                    font-semibold
                    text-emerald-950
                  "
                                >
                                    Bangla Name
                                </label>

                                <input
                                    required
                                    id="banglaName"
                                    name="banglaName"
                                    type="text"
                                    placeholder="Example: Fresh Milk in Bangla"
                                    className="
                    h-12
                    w-full
                    rounded-xl
                    border
                    border-emerald-100
                    bg-emerald-50/40
                    px-4
                    text-sm
                    text-emerald-950
                    outline-none
                    transition
                    placeholder:text-gray-400
                    focus:border-emerald-500
                    focus:bg-white
                    focus:ring-4
                    focus:ring-emerald-500/10
                  "
                                />
                            </div>

                            {/* Buying Price */}
                            <div>
                                <label
                                    htmlFor="buyingPrice"
                                    className="
                    mb-2
                    block
                    text-sm
                    font-semibold
                    text-emerald-950
                  "
                                >
                                    Buying Price
                                </label>

                                <div className="relative">
                                    <span
                                        className="
                      absolute
                      left-4
                      top-1/2
                      -translate-y-1/2
                      font-semibold
                      text-emerald-600
                    "
                                    >
                                        ৳
                                    </span>

                                    <input
                                        required
                                        id="buyingPrice"
                                        name="buyingPrice"
                                        type="number"
                                        min="0"
                                        step="0.01"
                                        placeholder="0.00"
                                        className="
                      h-12
                      w-full
                      rounded-xl
                      border
                      border-emerald-100
                      bg-emerald-50/40
                      pl-9
                      pr-4
                      text-sm
                      text-emerald-950
                      outline-none
                      transition
                      placeholder:text-gray-400
                      focus:border-emerald-500
                      focus:bg-white
                      focus:ring-4
                      focus:ring-emerald-500/10
                    "
                                    />
                                </div>
                            </div>

                            {/* Selling Price */}
                            <div>
                                <label
                                    htmlFor="sellingPrice"
                                    className="
                    mb-2
                    block
                    text-sm
                    font-semibold
                    text-emerald-950
                  "
                                >
                                    Selling Price
                                </label>

                                <div className="relative">
                                    <span
                                        className="
                      absolute
                      left-4
                      top-1/2
                      -translate-y-1/2
                      font-semibold
                      text-emerald-600
                    "
                                    >
                                        ৳
                                    </span>

                                    <input
                                        required
                                        id="sellingPrice"
                                        name="sellingPrice"
                                        type="number"
                                        min="0"
                                        step="0.01"
                                        placeholder="0.00"
                                        className="
                      h-12
                      w-full
                      rounded-xl
                      border
                      border-emerald-100
                      bg-emerald-50/40
                      pl-9
                      pr-4
                      text-sm
                      text-emerald-950
                      outline-none
                      transition
                      placeholder:text-gray-400
                      focus:border-emerald-500
                      focus:bg-white
                      focus:ring-4
                      focus:ring-emerald-500/10
                    "
                                    />
                                </div>
                            </div>

                            {/* Stock */}
                            <div>
                                <label
                                    htmlFor="stock"
                                    className="
                    mb-2
                    block
                    text-sm
                    font-semibold
                    text-emerald-950
                  "
                                >
                                    Stock
                                </label>

                                <input
                                    required
                                    id="stock"
                                    name="stock"
                                    type="number"
                                    min="0"
                                    placeholder="Enter available quantity"
                                    className="
                    h-12
                    w-full
                    rounded-xl
                    border
                    border-emerald-100
                    bg-emerald-50/40
                    px-4
                    text-sm
                    text-emerald-950
                    outline-none
                    transition
                    placeholder:text-gray-400
                    focus:border-emerald-500
                    focus:bg-white
                    focus:ring-4
                    focus:ring-emerald-500/10
                  "
                                />
                            </div>

                            {/* Expiry Date */}
                            <div>
                                <label
                                    htmlFor="expiredDate"
                                    className="
                    mb-2
                    block
                    text-sm
                    font-semibold
                    text-emerald-950
                  "
                                >
                                    Expiry Date
                                    <span className="ml-1 text-xs font-normal text-gray-400">
                                        (Optional)
                                    </span>
                                </label>

                                <input
                                    id="expiredDate"
                                    name="expiredDate"
                                    type="date"
                                    className="
                    h-12
                    w-full
                    rounded-xl
                    border
                    border-emerald-100
                    bg-emerald-50/40
                    px-4
                    text-sm
                    text-emerald-950
                    outline-none
                    transition
                    focus:border-emerald-500
                    focus:bg-white
                    focus:ring-4
                    focus:ring-emerald-500/10
                  "
                                />
                            </div>
                        </div>

                        {/* ================= IMAGE UPLOAD ================= */}
                        <div className="mt-6">
                            <label className="mb-2 block text-sm font-semibold text-emerald-950">
                                Product Image
                            </label>

                            <label
                                htmlFor="image"
                                className="
                  group
                  relative
                  flex
                  min-h-48
                  cursor-pointer
                  items-center
                  justify-center
                  overflow-hidden
                  rounded-2xl
                  border-2
                  border-dashed
                  border-emerald-200
                  bg-emerald-50/40
                  transition-all
                  duration-300
                  hover:border-emerald-400
                  hover:bg-emerald-50
                "
                            >
                                {imagePreview ? (
                                    <>
                                        {/* Image Preview */}
                                        <Image
                                            src={imagePreview}
                                            alt="Product preview"
                                            fill
                                            className="object-contain p-4"
                                        />

                                        {/* Hover Overlay */}
                                        <div
                                            className="
                        absolute
                        inset-0
                        flex
                        items-center
                        justify-center
                        bg-emerald-950/50
                        opacity-0
                        transition
                        group-hover:opacity-100
                      "
                                        >
                                            <div
                                                className="
                          flex
                          items-center
                          gap-2
                          rounded-xl
                          bg-white
                          px-4
                          py-2
                          text-sm
                          font-semibold
                          text-emerald-700
                        "
                                            >
                                                <ImagePlus size={18} />
                                                Change Image
                                            </div>
                                        </div>

                                        {/* Image Added Badge */}
                                        <div
                                            className="
                        absolute
                        right-3
                        top-3
                        flex
                        items-center
                        gap-1.5
                        rounded-full
                        bg-white
                        px-3
                        py-1.5
                        text-xs
                        font-bold
                        text-emerald-600
                        shadow-md
                      "
                                        >
                                            <CheckCircle2 size={15} />
                                            Image Added
                                        </div>
                                    </>
                                ) : (
                                    <div className="flex flex-col items-center px-4 py-8 text-center">
                                        <div
                                            className="
                        mb-4
                        flex
                        h-14
                        w-14
                        items-center
                        justify-center
                        rounded-2xl
                        bg-emerald-100
                        text-emerald-600
                        transition-transform
                        duration-300
                        group-hover:scale-110
                      "
                                        >
                                            <UploadCloud size={27} />
                                        </div>

                                        <p className="font-bold text-emerald-900">
                                            Upload Product Image
                                        </p>

                                        <p className="mt-1 text-xs text-gray-400">
                                            JPG, PNG or WEBP format
                                        </p>

                                        <div
                                            className="
                        mt-4
                        flex
                        items-center
                        gap-2
                        rounded-xl
                        bg-white
                        px-4
                        py-2
                        text-xs
                        font-semibold
                        text-emerald-600
                        shadow-sm
                      "
                                        >
                                            <Camera size={15} />
                                            Choose Image
                                        </div>
                                    </div>
                                )}

                                <input
                                    id="image"
                                    name="image"
                                    type="file"
                                    accept="image/*"
                                    hidden
                                    onChange={handleImageChange}
                                />
                            </label>
                        </div>

                        {/* ================= SUBMIT BUTTON ================= */}
                        <button
                            type="submit"
                            disabled={waiting}
                            className="
              cursor-pointer
                mt-7
                flex
                h-12
                w-full
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-emerald-500
                px-5
                py-3
                text-sm
                font-bold
                text-white
                shadow-lg
                shadow-emerald-500/20
                transition-all
                duration-200
                hover:bg-emerald-600
                hover:shadow-xl
                hover:shadow-emerald-500/25
                active:scale-[0.99]
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
                        >
                            {waiting ? (
                                <>
                                    <Loader2
                                        size={19}
                                        className="animate-spin"
                                    />
                                    Creating Product...
                                </>
                            ) : (
                                <>
                                    <PackagePlus size={19} />
                                    Create Product
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );          
};

export default CreateProduct;