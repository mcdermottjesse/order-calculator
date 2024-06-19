import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  quantity: {
    type: Number,
    default: 1,
    validate: {
      validator: function (value: number) {
        return value > 0;
      },
      message: (props: { value: number }) =>
        `${props.value} is not a valid quantity. Quantity must not be negative.`,
    },
  },
});

const Product = mongoose.model("Product", productSchema);

export default Product;
