import React, { useState } from "react";
import { Product } from "./Products";

const initialProductState: Product = {
  _id: "",
  name: "",
  description: "",
  price: 0,
  quantity: 0,
};

interface NewProductProps {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

function NewProduct({ products, setProducts }: NewProductProps) {
  const [newProduct, setNewProduct] = useState<Product>(initialProductState);
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/api/product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });
      if (!response.ok) {
        throw new Error("Failed to save product");
      }
      const data = await response.json();
      setProducts([...products, data.product]);
      setSuccessMessage(data.message);
      setNewProduct(initialProductState); // Reset form fields
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [name]:
        name === "price" || name === "quantity" ? parseFloat(value) : value,
    }));
  };

  return (
    <div>
      {successMessage && <p>{successMessage}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={newProduct.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={newProduct.description}
          onChange={handleChange}
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={newProduct.price}
          onChange={handleChange}
        />
        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={newProduct.quantity}
          onChange={handleChange}
        />
        <button type="submit">Save Product</button>
      </form>
    </div>
  );
}

export default NewProduct;
