import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import ProductCard from "../components/ProductCard";

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));

        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        console.log("Firebase Products:", data); // 🔥 debug
        setProducts(data);
      } catch (error) {
        console.log("Error fetching products:", error);
      }
    }

    fetchProducts();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Latest Products</h2>

      {/* Loading */}
      {products.length === 0 && (
        <p className="text-gray-500">Loading products...</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((item) => {
          // ✅ prevent crash if product is empty or missing image
          if (!item || !item.name || !item.price) return null;

          return <ProductCard key={item.id} product={item} />;
        })}
      </div>
    </div>
  );
}