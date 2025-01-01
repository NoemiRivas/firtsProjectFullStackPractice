const express = require('express');
const router = express.Router();
const {createProduct, getAllProduct, updateaProduct, deleteProducto, getCategories, getAllCategories}= require("../controller/productControl")
// products

router.post("/productos", createProduct )
router.get("/all-products", getAllProduct)
router.put("/:id", updateaProduct)
router.delete("/:id",deleteProducto)
router.get("/all-categories/:category",getCategories)
router.get("/all-categories",getAllCategories)
module.exports = router;