import React from "react";
import { Product } from "./Products";

export interface TaxRate {
  gstRate: number;
  pstRate: number;
}

export const taxRateInterface: TaxRate = {
  gstRate: 5,
  pstRate: 7,
};

export const calculateGST = (product: Product, rate: TaxRate): number => {
  const productGSTAmount = (product.price * rate.gstRate) / 100;

  return parseFloat(productGSTAmount.toFixed(2));
};

export const calculatePST = (product: Product, rate: TaxRate): number => {
  const productPSTAmount = (product.price * rate.pstRate) / 100;

  return parseFloat(productPSTAmount.toFixed(2));
};

function Taxes() {
  return (
    <div>
      <p>GST Rate: {taxRateInterface.gstRate}</p>
      <p>PST Rate: {taxRateInterface.pstRate}</p>
    </div>
  );
}

export default Taxes;
