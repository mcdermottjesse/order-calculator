import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import NewProduct from "./NewProduct";
import Order from "./Order";
import Taxes, {
  TaxRate,
  taxRateInterface,
  calculateGST,
  calculatePST,
} from "./Taxes";

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
}

const productPrice = (product: Product): number =>
  parseFloat(product.price.toFixed(2));

export const totalProductPrice = (product: Product, rate: TaxRate): number => {
  const priceWithTaxes =
    productPrice(product) +
    calculateGST(product, rate) +
    calculatePST(product, rate);

  const total = priceWithTaxes * product.quantity;

  return parseFloat(total.toFixed(2));
};

function Products() {
  const [products, setProducts] = useState<Product[]>([]);

  const [deleteMessage, setDeleteMessage] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/products");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (productID: string) => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/deleteProduct/${productID}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete product");
      }
      const data = await response.json();
      setDeleteMessage(data.message);
      setProducts(products.filter((product) => product._id !== productID));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div>
      <Taxes />
      <Order products={products} />
      <NewProduct products={products} setProducts={setProducts} />
      <div>
        {deleteMessage && <p>{deleteMessage}</p>}
        <h2>Saved Products</h2>
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product._id}>
              <Link to={`/product/${product._id}`}>
                <p>Name: {product.name}</p>
              </Link>
              <p>Description: {product.description}</p>
              <p>Price (without taxes): {productPrice(product)}</p>
              <p>GST Amount: {calculateGST(product, taxRateInterface)}</p>
              <p>PST Amount: {calculatePST(product, taxRateInterface)}</p>
              <p>
                Total product price (with taxes):{" "}
                {totalProductPrice(product, taxRateInterface)}
              </p>
              <p></p>Total
              <p>Quantity: {product.quantity}</p>
              <button onClick={() => handleDelete(product._id)}>Delete</button>
            </div>
          ))
        ) : (
          <div>No products found</div>
        )}
      </div>
    </div>
  );
}

export default Products;
