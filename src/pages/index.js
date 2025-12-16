import Head from "next/head";
import { useState } from "react";
import { getSession } from "next-auth/react";

import Banner from "../components/Banner";
import Header from "../components/Header";
import ProductFeed from "../components/ProductFeed";

export default function Home({ products }) {
  const [filteredProducts, setProducts] = useState(products);

  function filterProducts(searchText) {
    const matchedProducts = products?.filter((product) =>
      product?.title?.toLowerCase().includes(searchText.toLowerCase())
    );
    setProducts([...matchedProducts]);
  }

  return (
    <div className="bg-gray-100 ">
      <Head>
        <title>EasyBusyHub Webapp</title>
      </Head>

      {/* Header */}
      <Header onSearchValue={filterProducts} />

      <main className="max-w-screen-2xl mx-auto">
        <Banner />

        {/* Product Feed */}
        {filteredProducts?.length > 0 ? (
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

// Tells nextJS that's no longer a static page
// eg "Please calculate something on the server first and send it to the user next"
// Here, it's executed by Node.js
export async function getServerSideProps(context) {
  const session = await getSession(context);
  try {
    const res = await fetch("https://fakestoreapi.com/products", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`API responded with status: ${res.status}`);
    }

    const products = await res.json();

    return {
      props: {
        products: Array.isArray(products) ? products : [],
        session: session,
      },
    };
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return {
      props: {
        products: [],
        session: session,
      },
    };
  }
}
