import express from "express";
import { addPaymentController } from "../../controllers/PaymentController.js";
const paymentRoutes = express.Router();

paymentRoutes.post("/", addPaymentController);

export default paymentRoutes;
