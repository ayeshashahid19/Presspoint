"use client";

import Header from "../components/Header";
import Footer from "../components/Footer";
import Link from "next/link";
import { useRouter } from "next/navigation";  // ← ADD THIS
import { shopProducts, bannerImage } from "@/app/data/articles";

export default function Shop() {
  const router = useRouter();  // ← ADD THIS

  // ============================================================
  // HANDLE PRODUCT CLICK - Redirect to Contact Page
  // ============================================================
  const handleProductClick = () => {
    router.push('/contact');
  };

  // ============================================================
  // SORT: Products by price (lowest to highest)
  // ============================================================
  const sortedProducts = [...shopProducts].sort((a, b) => {
    const priceA = parseFloat(a.price.replace('$', '').replace(' USD', ''));
    const priceB = parseFloat(b.price.replace('$', '').replace(' USD', ''));
    return priceA - priceB;
  });

  // ============================================================
  // SLICE: Show only first 6 products
  // ============================================================
  const limitedProducts = sortedProducts.slice(0, 6);

  // Split into rows of 3
  const rows = [];
  for (let i = 0; i < limitedProducts.length; i += 3) {
    rows.push(limitedProducts.slice(i, i + 3));
  }

  return (
    <>
      <Header />
      
      <h1 className="shop">Shop With Us</h1>

      {rows.map((row, rowIndex) => (
        <section key={rowIndex} className="things">
          {row.map((product) => (
            <div 
              key={product.id} 
              className="thing"
              onClick={handleProductClick}  // ← ADD THIS
              style={{ cursor: "pointer" }}  // ← ADD THIS
            >
              <img
                className="shirts"
                src={product.imageUrl}
                alt={product.name}
              />
              <h3>{product.name}</h3>
              <h6>{product.price}</h6>
            </div>
          ))}
        </section>
      ))}

      <img
        className="clas"
        src={bannerImage.imageUrl}
        alt="image"
      />
      <div className="blu">
        <h1 className="nam">Join 1M+ Readers </h1>
        <h1 className="nam">who never miss a headline. </h1>

        <p className="namm">
          Stay informed wherever you are — join our growing community
        </p>
        <p className="namm">
          of readers and followers across social platforms.
        </p>
        <button 
          className="buton"
          onClick={handleProductClick}  // ← ADD THIS
        >
          Subscribe
        </button>
      </div>

      <Footer />
    </>
  );
}