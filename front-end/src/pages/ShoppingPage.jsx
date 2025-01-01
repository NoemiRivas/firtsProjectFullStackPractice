//node
import React, { useState, useEffect } from "react";
//compoentes
import Hero from "../components/pageShop/hero/Hero";
import AllProducts from "../components/pageShop/product/AllProducts";
import CategoryFilter from "../components/pageShop/filterCategory/filter";
import News from "../components/home/news/News";

export default function ShoppingPage() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  // Obtener productos con filtro
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const url = selectedCategory
          ? `http://localhost:3000/api/all-categories/${selectedCategory}`
          : "http://localhost:3000/api/all-products";
        const response = await fetch(url);
        const data = await response.json();

        setProducts(data);
      } catch (error) {
        console.error("Error al obtener productos:", error);
      }
    };

    fetchProducts();
  }, [selectedCategory]);
  
  // Cambiar la categoría
  const handleCategoryFilterChange = (category) => {
    setSelectedCategory(category);
  };

  return (
    <main className="shopping-page-layout">
      <Hero />
      <CategoryFilter onFilterChange={handleCategoryFilterChange} />
      <AllProducts products={products} />
      <News />
    </main>
  );
}
