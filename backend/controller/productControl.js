const Product = require("../models/products");
const asyncHandler = require("express-async-handler");

// crear producto

const createProduct = asyncHandler(async (req, res) => {

  const { name } = req.body;

  const findProduct = await Product.findOne({ name });
  //si el producto no se encuentra en la base de datos se crea uno nuevo
  if (!findProduct) {
    const newProduct = await Product.create(req.body);
    res.json(newProduct);
  } else {
    res.json({
      mes: "el producto ya existe",
      sucess: false,
    });
  }
});

//obtener todos los productos
const getAllProduct = asyncHandler(async (req, res) => {
  try {
    const getProducts = await Product.find();
    res.json(getProducts);
  } catch (error) {
    throw new Error(error,"error al obtener todos los productos");
  }
});

// ACTUALIZAR producto
const updateaProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const updateProduct = await Product.findByIdAndUpdate(
      id,
      {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        stock: req.body.stock,
        category: req.body.category,
        image: req.body.image,
      },

      { new: true }
    );
    if (!updateProduct) {
      res.status(404).json({ message: "producto no encontrado" });
    } else {
      res.json(updateProduct);
    }
  } catch (error) {
    throw new Error("error al actualizar el producto");
  }
});

// BORRAR producto
const deleteProducto = async (req, res) => {
  const { id } = req.params;
  try {
    const deleteProducto = await Product.findByIdAndDelete(id);
    res.json({
      deleteProducto,
    });
  } catch (error) {
    throw new Error(error);
  }
};
//obtener producto por categorias
const getCategories = async (req, res) => {

  const { category } = req.params;

  try {
    const products = await Product.find({ category }); 
    if (products.length === 0) {
      return res.status(404).json({ message: "No se encontraron productos para esta categoría" });
    }
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener productos", error });
  }
};
//obtener todos las categorias

const getAllCategories = async (req, res) => {
  try {
    const categories = await Product.distinct("category"); 
    res.json(categories); 
  } catch (error) {
    res.status(500).json({ message: "Error al obtener categorías", error });
  }
};


module.exports = {
  createProduct,
  getAllProduct,

  updateaProduct,
  deleteProducto,
  getCategories,
  getAllCategories,
};
