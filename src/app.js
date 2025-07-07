// Import library yang dibutuhkan
import { configDotenv } from "dotenv";
import express from "express";
import cors from "cors";
import paymentRoutes from "./routes/payment/paymentRoutes.js";
import userRoutes from "./routes/user/userRoutes.js";
import roleRoutes from "./routes/user/roleRoutes.js";
import productRoutes from "./routes/product/product.js";
import categoryRoutes from "./routes/category/categoryRoutes.js";
import imageRoutes from "./routes/image/imageRoutes.js";
import sellerRoutes from "./routes/seller/sellerRoutes.js";
// const morgan = require('morgan'); // Uncomment jika Anda menginstal morgan

configDotenv();

const app = express();

const corsOptions = {
	origin: "*",
	methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
	allowedHeaders: ["Content-Type", "Authorization"],
	credentials: true,
	optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/role", roleRoutes);
app.use("/api/v1/product", productRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/image", imageRoutes);
app.use("/api/v1/seller", sellerRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => {
	console.log(`Server berjalan di port ${PORT}`);
});
