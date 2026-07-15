import { Request, Response } from "express";
import { prisma } from "../lib/prisma";

import {
  createReturnSchema,
  updateReturnSchema,
  returnIdSchema,
} from "../schema/returnSchema";


// CREATE RETURN REQUEST
export const createReturn = async (
  req: Request,
  res: Response
) => {
  try {

    if (!req.user) {
      return res.status(401).json({
        message: "User belum login",
      });
    }


    const data = createReturnSchema.parse(req.body);


    const order = await prisma.order.findUnique({
      where: {
        id: data.orderId,
      },
    });


    if (!order) {
      return res.status(404).json({
        message: "Order tidak ditemukan",
      });
    }


    if (order.userId !== req.user.id) {
      return res.status(403).json({
        message: "Tidak memiliki akses ke order ini",
      });
    }


    const returnRequest = await prisma.returnRequest.create({
      data: {
        orderId: data.orderId,
        reason: data.reason,
        description: data.description,
        image: data.image,
        status: "PENDING",
      },
    });


    return res.status(201).json({
      message: "Request return berhasil dibuat",
      data: returnRequest,
    });


  } catch (error) {

    return res.status(400).json({
      message: "Data return tidak valid",
      error,
    });

  }
};



// GET ALL RETURN
export const getAllReturns = async (
  req: Request,
  res: Response
) => {
  try {

    const returns = await prisma.returnRequest.findMany({
      include: {
        order: {
          include: {
            user: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });


    return res.status(200).json({
      data: returns,
    });


  } catch (error) {

    return res.status(500).json({
      message: "Gagal mengambil data return",
      error,
    });

  }
};



// GET RETURN BY ID
export const getReturnById = async (
  req: Request,
  res: Response
) => {
  try {

    const { id } = returnIdSchema.parse(req.params);


    const returnRequest =
      await prisma.returnRequest.findUnique({
        where: {
          id,
        },
        include: {
          order: true,
        },
      });


    if (!returnRequest) {
      return res.status(404).json({
        message: "Return tidak ditemukan",
      });
    }


    return res.status(200).json({
      data: returnRequest,
    });


  } catch (error) {

    return res.status(400).json({
      message: "ID return tidak valid",
      error,
    });

  }
};



// UPDATE RETURN STATUS (ADMIN)
export const updateReturn = async (
  req: Request,
  res: Response
) => {
  try {

    const { id } = returnIdSchema.parse(req.params);


    const data = updateReturnSchema.parse(req.body);


    const existingReturn =
      await prisma.returnRequest.findUnique({
        where: {
          id,
        },
      });


    if (!existingReturn) {
      return res.status(404).json({
        message: "Return tidak ditemukan",
      });
    }


    const updatedReturn =
      await prisma.returnRequest.update({
        where: {
          id,
        },
        data,
      });


    return res.status(200).json({
      message: "Status return berhasil diupdate",
      data: updatedReturn,
    });


  } catch (error) {

    return res.status(400).json({
      message: "Gagal update return",
      error,
    });

  }
};



// DELETE RETURN
export const deleteReturn = async (
  req: Request,
  res: Response
) => {
  try {

    const { id } = returnIdSchema.parse(req.params);


    const existingReturn =
      await prisma.returnRequest.findUnique({
        where: {
          id,
        },
      });


    if (!existingReturn) {
      return res.status(404).json({
        message: "Return tidak ditemukan",
      });
    }


    await prisma.returnRequest.delete({
      where: {
        id,
      },
    });


    return res.status(200).json({
      message: "Return berhasil dihapus",
    });


  } catch (error) {

    return res.status(400).json({
      message: "Gagal menghapus return",
      error,
    });

  }
};
