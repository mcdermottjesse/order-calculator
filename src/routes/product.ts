import express from "express";
const router = express.Router();
import {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController";

router.get("/products", getProducts);
router.get("/product/:id", getProduct);
router.post("/product", createProduct);
router.patch("/updateProduct/:id", updateProduct);
router.delete("/deleteProduct/:id", deleteProduct);

export default router;
