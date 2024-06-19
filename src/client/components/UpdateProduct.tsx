import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Product } from "./Products";

function UpdateProduct() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/product/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    fetchProduct();
  }, [id]);

  const handleUpdate = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:3001/api/updateProduct/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(product),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to save product");
      }
      const data = await response.json();
      console.log("DATA", data);
      setProduct(product);
      setSuccessMessage(data.message);
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (product) {
      setProduct({
        ...product,
        [name]:
          name === "price" || name === "quantity" ? parseFloat(value) : value,
      });
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {successMessage && <p>{successMessage}</p>}
      <form onSubmit={handleUpdate}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={product.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={product.description}
          onChange={handleChange}
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={product.price}
          onChange={handleChange}
        />
        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={product.quantity}
          onChange={handleChange}
        />
        <button type="submit">Update Product</button>
        <Link to={"/products"}>Back</Link>
      </form>
    </div>
  );
}

export default UpdateProduct;
