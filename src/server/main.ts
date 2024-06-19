import express from "express";
import cors from "cors";
import ViteExpress from "vite-express";
import connectDB from "../database/connect";
import productRoutes from "../routes/product";

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use("/api", productRoutes);

ViteExpress.listen(app, 3001, () =>
  console.log("Server is listening on port 3001...")
);
