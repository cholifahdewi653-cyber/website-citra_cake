import { Router } from "express";

import {
  createCustomCake,
  getAllCustomCake,
  getCustomCakeById,
  updateCustomCake,
  deleteCustomCake,
} from "../controllers/cakeCustomization.Controllers";

import { authMiddleware } from "../middleware/auth";


const router = Router();


// USER CREATE CUSTOM CAKE
router.post(
  "/",
  authMiddleware(["USER"]),
  createCustomCake
);


// ADMIN / USER GET ALL CUSTOM CAKE
router.get(
  "/",
  authMiddleware(["ADMIN", "USER"]),
  getAllCustomCake
);


// GET CUSTOM CAKE BY ID
router.get(
  "/:id",
  authMiddleware(["ADMIN", "USER"]),
  getCustomCakeById
);


// ADMIN UPDATE CUSTOM CAKE
router.patch(
  "/:id",
  authMiddleware(["ADMIN"]),
  updateCustomCake
);


// ADMIN DELETE CUSTOM CAKE
router.delete(
  "/:id",
  authMiddleware(["ADMIN"]),
  deleteCustomCake
);


export default router;