import { prisma } from "../lib/prisma";
import {
  CreateReturnInput,
  UpdateReturnInput,
} from "../schema/returnSchema";

// CREATE RETURN
export const createReturnService = async (
  data: CreateReturnInput
) => {
  return await prisma.returnRequest.create({
    data: {
      orderId: data.orderId,
      reason: data.reason,
      description: data.description,
      image: data.image,
      status: "PENDING",
    },
  });
};

// GET ALL RETURNS
export const getAllReturnsService = async () => {
  return await prisma.returnRequest.findMany({
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
};

// GET RETURN BY ID
export const getReturnByIdService = async (
  id: string
) => {
  return await prisma.returnRequest.findUnique({
    where: {
      id,
    },
    include: {
      order: {
        include: {
          user: true,
        },
      },
    },
  });
};

// UPDATE RETURN
export const updateReturnService = async (
  id: string,
  data: UpdateReturnInput
) => {
  return await prisma.returnRequest.update({
    where: {
      id,
    },
    data,
  });
};

// DELETE RETURN
export const deleteReturnService = async (
  id: string
) => {
  return await prisma.returnRequest.delete({
    where: {
      id,
    },
  });
};

// CHECK ORDER
export const getOrderByIdService = async (
  orderId: string
) => {
  return await prisma.order.findUnique({
    where: {
      id: orderId,
    },
  });
};

// CHECK RETURN BY ID
export const getReturnExistsService = async (
  id: string
) => {
  return await prisma.returnRequest.findUnique({
    where: {
      id,
    },
  });
};