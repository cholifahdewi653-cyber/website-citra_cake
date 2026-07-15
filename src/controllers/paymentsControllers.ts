import { Request, Response } from "express";
import {
  uploadPaymentProofService,
  getPaymentStatusService,
  getAllPaymentsService,
  confirmPaymentService,
  rejectPaymentService,
} from "../services/paymentsServices";

export const uploadPaymentProof = async (
  req: Request,
  res: Response
) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        message: "User belum login",
      });
    }

    const orderId = String(req.params.orderId);
    const { paymentProof } = req.body;

    if (!paymentProof) {
      return res.status(400).json({
        message: "Bukti pembayaran wajib diisi",
      });
    }

    const payment = await uploadPaymentProofService(
      orderId,
      paymentProof
    );

    return res.status(200).json({
      message: "Bukti pembayaran berhasil diupload",
      data: payment,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Gagal upload bukti pembayaran",
      error,
    });
  }
};

export const getPaymentStatus = async (
  req: Request,
  res: Response
) => {
  try {
    const orderId = String(req.params.orderId);

    const payment = await getPaymentStatusService(orderId);

    if (!payment) {
      return res.status(404).json({
        message: "Order tidak ditemukan",
      });
    }

    return res.status(200).json({
      data: payment,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Gagal mengambil status pembayaran",
      error,
    });
  }
};

export const getAllPayments = async (
  req: Request,
  res: Response
) => {
  try {
    const payments = await getAllPaymentsService();

    return res.status(200).json({
      data: payments,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Gagal mengambil data pembayaran",
      error,
    });
  }
};

export const confirmPayment = async (
  req: Request,
  res: Response
) => {
  try {
    const orderId = String(req.params.orderId);

    const payment = await confirmPaymentService(orderId);

    return res.status(200).json({
      message: "Pembayaran berhasil dikonfirmasi",
      data: payment,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Gagal mengonfirmasi pembayaran",
      error,
    });
  }
};

export const rejectPayment = async (
  req: Request,
  res: Response
) => {
  try {
    const orderId = String(req.params.orderId);

    const payment = await rejectPaymentService(orderId);

    return res.status(200).json({
      message: "Pembayaran berhasil ditolak",
      data: payment,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Gagal menolak pembayaran",
      error,
    });
  }
};