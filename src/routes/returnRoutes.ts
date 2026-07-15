import { Router } from "express";

import {
  createReturn,
  getAllReturns,
  getReturnById,
  updateReturn,
  deleteReturn,
} from "../controllers/returnControllers";

import { authMiddleware } from "../middleware/auth";


const router = Router();


// USER BUAT REQUEST RETURN
router.post(
  "/",
  authMiddleware(["USER"]),
  createReturn
);


// ADMIN MELIHAT SEMUA RETURN
router.get(
  "/",
  authMiddleware(["ADMIN"]),
  getAllReturns
);


// USER / ADMIN MELIHAT DETAIL RETURN
router.get(
  "/:id",
  authMiddleware(["USER", "ADMIN"]),
  getReturnById
);


// ADMIN UPDATE STATUS RETURN
router.patch(
  "/:id",
  authMiddleware(["ADMIN"]),
  updateReturn
);


// ADMIN DELETE RETURN
router.delete(
  "/:id",
  authMiddleware(["ADMIN"]),
  deleteReturn
);


export default router;