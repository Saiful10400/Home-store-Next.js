import { Tproduct } from "@/types";
import ProductCard from "@/ui/ProductCard";
import SearchBar from "@/ui/SearchBar";
import Image from "next/image";

type Props = {
  searchParams: Promise<{ q?: string }>;
};

const fetchProducts = async (searchTerm?: string): Promise<Tproduct[]> => {
  console.log(searchTerm + "this is search term.");
  const res = await fetch(searchTerm ? `https://home-store-backend.vercel.app/api/shop/find-product?searchTerm=${searchTerm}` : "https://home-store-backend.vercel.app/api/shop/find-product", {
    cache: "no-store",
  });
  const data = await res.json();
  return data.data
};

export default async function Home({ searchParams }: Props) {


  const { q: query = '' } = await searchParams;


  const products = await fetchProducts(query);



  return (
    <div className="px-4 md:px-0 mt-2">

      {/* search bar. */}
      <SearchBar placeholder="Search Product name." />

      {
        products.length === 0 ? <h1 className="text-center text-2xl font-bold mt-10">
          No products found for "{query}"
        </h1> : <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1.5">
          {products.map((product) => (
            <ProductCard key={product.englishName} product={product} />
          ))}
        </div>
      }

    </div>
  );
} 
