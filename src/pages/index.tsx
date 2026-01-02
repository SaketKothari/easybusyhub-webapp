import Head from "next/head";
import { useState, useEffect } from "react";

import Banner from "../components/Banner";
import Header from "../components/Header";
import ProductFeed from "../components/ProductFeed";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/products", {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });

        if (!res.ok) {
          throw new Error(`API responded with status: ${res.status}`);
        }

        const data = await res.json();

        // Extract products - handle both array and object responses
        let fetchedProducts: Product[] = Array.isArray(data)
          ? data
          : data?.value || data?.products || [];

        setProducts(fetchedProducts);
        setFilteredProducts(fetchedProducts);
      } catch (error) {
        console.error("Failed to fetch products:", (error as Error).message);
        setProducts([]);
        setFilteredProducts([]);
      }
    };

    fetchProducts();
  }, []);

  function filterProducts(searchText: string) {
    if (!searchText || searchText.trim() === "") {
      setFilteredProducts(products);
      return;
    }
    const matchedProducts = products.filter((product) =>
      product?.title?.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredProducts(matchedProducts);
  }

  return (
    <div className="bg-gray-100 ">
      <Head>
        <title>EasyBusyHub Webapp</title>
      </Head>

      <Header onSearchValue={filterProducts} />

      <main className="max-w-screen-2xl mx-auto">
        <Banner />

        {filteredProducts && filteredProducts.length > 0 ? (
          <ProductFeed products={filteredProducts} />
        ) : (
          <h1 className="text-center text-2xl py-4">
            🙁 No matching products…
          </h1>
        )}
      </main>
    </div>
  );
}
