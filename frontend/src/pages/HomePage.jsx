import React, { useEffect, useState } from "react";
import api from "../lib/axios";
import Navbar from "../components/Navbar";
import ItemCard from "../components/ItemCard";
import ItemsNotFound from "../components/ItemsNotFound";
import toast from "react-hot-toast";

const HomePage = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      try {
        const res = await api.get("/items");
        console.log(res.data);
        setItems(res.data);
      } catch (error) {
        console.log("Error in fetchItems function, HomePage.jsx", error);
        toast.error("Failed to load items");
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="max-w-7xl mx-auto p-4 mt-6">
        {loading ? (
          <div className="text-center text-primary py-10">Loading Notes...</div>
        ) : items.length === 0 ? (
          <ItemsNotFound />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item) => (
              <ItemCard key={item._id} item={item} setItems={setItems} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
