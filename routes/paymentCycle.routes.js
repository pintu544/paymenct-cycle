import { Router } from "express";
import { getPaymentCycle } from "../controllers/paymentCycle.controller.js";

const router = Router();

router.route("/payment-cycle").get(getPaymentCycle);

export default router;
