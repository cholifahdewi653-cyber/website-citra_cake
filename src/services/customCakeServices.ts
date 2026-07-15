import { prisma } from "../lib/prisma";
import {
  CreateCustomCakeInput,
  UpdateCustomCakeInput,
} from "../schema/cakeCustomization.schema";

// CREATE
export const createCustomCakeService = async (
  userId: string,
  data: CreateCustomCakeInput
) => {
  return await prisma.cakeCustomization.create({
    data: {
      ...data,
      userId,
      status: "PENDING",
    },
  });
};

// GET ALL
export const getAllCustomCakeService = async () => {
  return await prisma.cakeCustomization.findMany({
    include: {
      user: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

// GET BY ID
export const getCustomCakeByIdService = async (
  id: string
) => {
  return await prisma.cakeCustomization.findUnique({
    where: {
      id,
    },
    include: {
      user: true,
    },
  });
};

// UPDATE
export const updateCustomCakeService = async (
  id: string,
  data: UpdateCustomCakeInput
) => {
  return await prisma.cakeCustomization.update({
    where: {
      id,
    },
    data,
  });
};

// DELETE
export const deleteCustomCakeService = async (
  id: string
) => {
  return await prisma.cakeCustomization.delete({
    where: {
      id,
    },
  });
};