import { Router } from "express";

import {
  uploadPaymentProof,
  getPaymentStatus,
  getAllPayments,
  confirmPayment,
  rejectPayment,
} from "../controllers/paymentsControllers";

import { authMiddleware } from "../middleware/auth";

const router = Router();

router.post(
  "/:orderId/upload",
  authMiddleware(["USER"]),
  uploadPaymentProof
);

router.get(
  "/:orderId/status",
  authMiddleware(["USER"]),
  getPaymentStatus
);

router.get(
  "/admin/all",
  authMiddleware(["ADMIN"]),
  getAllPayments
);

router.patch(
  "/admin/:orderId/confirm",
  authMiddleware(["ADMIN"]),
  confirmPayment
);

router.patch(
  "/admin/:orderId/reject",
  authMiddleware(["ADMIN"]),
  rejectPayment
);

export default router;