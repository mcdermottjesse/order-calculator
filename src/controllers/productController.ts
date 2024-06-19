import Product from "../models/product";
import { Request, Response, NextFunction } from "express";

export const getProducts = async (
  _: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const products = await Product.find();
    if (products.length === 0) {
      return response.json({ message: "There is currently no product data" });
    }
    return response.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    return next(`Error fetching products: ${error}`);
  }
};

export const getProduct = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const product = await Product.findById(request.params.id);
    if (!product) {
      return response.status(404).json({ message: "No product found" });
    }
    return response.status(200).json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    return next(`Error fetching product: ${error}`);
  }
};

export const createProduct = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const { name, description, price, quantity } = request.body;
    const newProduct = new Product({ name, description, price, quantity });
    await newProduct.save();
    const responseData = {
      product: newProduct,
      message: "Product has been created successfully",
    };
    return response.status(201).json(responseData);
  } catch (error) {
    console.error("Error creating product:", error);
    return next(`Error creating product: ${error}`);
  }
};

export const updateProduct = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const product = await Product.findById(request.params.id);
    if (!product) {
      return response.json({ message: "No product found" });
    }
    await product.updateOne(request.body);
    return response
      .status(200)
      .json({ message: "Product has been updated successfully." });
  } catch (error) {
    console.error("Error updating product:", error);
    return next(`Error updating product: ${error}`);
  }
};

export const deleteProduct = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const product = await Product.findById(request.params.id);
    if (!product) {
      return response.json({ message: "No product found" });
    }
    await product.deleteOne();
    return response.json({ message: `Product: ${product.name} deleted!` });
  } catch (error) {
    console.error("Error deleting product:", error);
    return next(`Error deleting product: ${error}`);
  }
};
