 
const fetchData = async (url, options = {}) => {
  try {
    const response = await fetch(url, options);
    
    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("error", error);
    throw error;
  }
  
};

const fetchCategories = async (url, options = {}) => {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("error", error);
    throw error;
  }
  
};


export const getAllCategories = ()=> fetchCategories("http://localhost:3000/api/all-categories")
export const getProducts = () => fetchData('http://localhost:3000/api/all-products');
