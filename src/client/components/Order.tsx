import React from "react";
import { Product, totalProductPrice } from "./Products";
import { TaxRate, taxRateInterface } from "./Taxes";

interface OrderProps {
  products: Product[];
}

function Order({ products }: OrderProps) {
  const totalOrderPrice = (products: Product[], rate: TaxRate): number => {
    let totalPrice = 0;
    for (const product of products) {
      totalPrice += totalProductPrice(product, rate);
    }

    return parseFloat(totalPrice.toFixed(2));
  };
  return <p>Order Total: ${totalOrderPrice(products, taxRateInterface)}</p>;
}

export default Order;
