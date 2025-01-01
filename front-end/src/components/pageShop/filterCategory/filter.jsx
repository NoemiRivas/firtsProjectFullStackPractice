import "../filterCategory/filter.css"
//node
import React, { useState, useEffect } from "react";
//api
import { getAllCategories } from "../../../api/api";

export default function CategoryFilter({ onFilterChange }) {
  const [categories, setCategories] = useState([]);

  // Cargar las categorías desde la api
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getAllCategories();
        setCategories(data);
      } catch (error) {
        throw new Error("hubo unerrror", error);
      }
    };
    fetchCategories();
  }, []);

  // Manejar el cambio de categoría seleccionada
  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;
    onFilterChange(selectedCategory); 
  };

  return (
    <div className="conteiner-sidebar">
      <h3 className="title">Busca por categoría</h3>
      <select onChange={handleCategoryChange} defaultValue="" className="select-stayle">
        <option value="" className="value-stayle">Selecciona la categoría</option>
        {categories.map((category) => (
          <option key={category} value={category} className="value-stayle">
            {category}
          </option>
        ))}
      </select>
    </div>
  );
}
