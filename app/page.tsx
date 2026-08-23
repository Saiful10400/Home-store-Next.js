import { Tproduct } from "@/types";
import ProductCard from "@/ui/ProductCard";
import Image from "next/image";
 

const fetchProducts = async (): Promise<Tproduct[]> => {
  const res = await fetch("https://home-store-backend.vercel.app/api/shop/find-product", {
    cache: "no-store",
  });
  const data = await res.json();
  return data.data
};

export default async function Home() {
  const products = await fetchProducts(); 
   
  console.log(products.length);

  return (
   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1.5"> 
    {products.map((product) => (
       <ProductCard key={product.englishName} product={product}/>
    ))}
   </div>
  );
} 
