import { Request, Response } from "express";
import { prisma } from "../lib/prisma";
import {
  createCustomCakeSchema,
  updateCustomCakeSchema,
  customCakeIdSchema,
} from "../schema/cakeCustomization.schema";


// CREATE CUSTOM CAKE
export const createCustomCake = async (
  req: Request,
  res: Response
) => {
  try {
    const data = createCustomCakeSchema.parse(req.body);

    const customCake = await prisma.cakeCustomization.create({
      data: {
        ...data,
        userId: req.user.id,
        status: "PENDING",
      },
    });

    return res.status(201).json({
      message: "Custom cake berhasil dibuat",
      data: customCake,
    });

  } catch (error) {
    return res.status(400).json({
      message: "Data custom cake tidak valid",
      error,
    });
  }
};


// GET ALL CUSTOM CAKE
export const getAllCustomCake = async (
  req: Request,
  res: Response
) => {
  try {
    const customCakes = await prisma.cakeCustomization.findMany({
      include: {
        user: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.status(200).json({
      data: customCakes,
    });

  } catch (error) {
    return res.status(500).json({
      message: "Gagal mengambil data custom cake",
      error,
    });
  }
};


// GET CUSTOM CAKE BY ID
export const getCustomCakeById = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = customCakeIdSchema.parse(req.params);

    const customCake = await prisma.cakeCustomization.findUnique({
      where: {
        id,
      },
      include: {
        user: true,
      },
    });

    if (!customCake) {
      return res.status(404).json({
        message: "Custom cake tidak ditemukan",
      });
    }

    return res.status(200).json({
      data: customCake,
    });

  } catch (error) {
    return res.status(400).json({
      message: "ID custom cake tidak valid",
      error,
    });
  }
};


// UPDATE CUSTOM CAKE
export const updateCustomCake = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = customCakeIdSchema.parse(req.params);

    const data = updateCustomCakeSchema.parse(req.body);

    const existingCake = await prisma.cakeCustomization.findUnique({
      where: {
        id,
      },
    });

    if (!existingCake) {
      return res.status(404).json({
        message: "Custom cake tidak ditemukan",
      });
    }

    const updatedCake = await prisma.cakeCustomization.update({
      where: {
        id,
      },
      data,
    });

    return res.status(200).json({
      message: "Custom cake berhasil diupdate",
      data: updatedCake,
    });

  } catch (error) {
    return res.status(400).json({
      message: "Gagal update custom cake",
      error,
    });
  }
};


// DELETE CUSTOM CAKE
export const deleteCustomCake = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = customCakeIdSchema.parse(req.params);

    const existingCake = await prisma.cakeCustomization.findUnique({
      where: {
        id,
      },
    });

    if (!existingCake) {
      return res.status(404).json({
        message: "Custom cake tidak ditemukan",
      });
    }

    await prisma.cakeCustomization.delete({
      where: {
        id,
      },
    });

    return res.status(200).json({
      message: "Custom cake berhasil dihapus",
    });

  } catch (error) {
    return res.status(400).json({
      message: "Gagal menghapus custom cake",
      error,
    });
  }
};