import { prisma } from "../lib/prisma";

export const uploadPaymentProofService = async (
  orderId: string,
  paymentProof: string
) => {
  return prisma.order.update({
    where: {
      id: orderId,
    },
    data: {
      paymentProof,
      paymentStatus: "PAID",
      paidAt: new Date(),
    },
  });
};

export const getPaymentStatusService = async (
  orderId: string
) => {
  return prisma.order.findUnique({
    where: {
      id: orderId,
    },
    select: {
      id: true,
      orderNumber: true,
      paymentStatus: true,
      paymentProof: true,
      paidAt: true,
    },
  });
};

export const getAllPaymentsService = async () => {
  return prisma.order.findMany({
    include: {
      user: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const confirmPaymentService = async (
  orderId: string
) => {
  return prisma.order.update({
    where: {
      id: orderId,
    },
    data: {
      paymentStatus: "PAID",
      paidAt: new Date(),
    },
  });
};

export const rejectPaymentService = async (
  orderId: string
) => {
  return prisma.order.update({
    where: {
      id: orderId,
    },
    data: {
      paymentStatus: "UNPAID",
      paymentProof: null,
      paidAt: null,
    },
  });
};