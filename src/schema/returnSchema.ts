import { z } from "zod";


// Schema membuat return request
export const createReturnSchema = z.object({
  orderId: z
    .string()
    .cuid({
      message: "ID Order tidak valid",
    }),

  reason: z
    .string()
    .min(1, "Alasan return wajib diisi"),

  description: z
    .string()
    .optional(),

  image: z
    .string()
    .optional(),
});


// Schema update return (admin)
export const updateReturnSchema = z.object({
  status: z
    .string()
    .min(1, "Status return wajib diisi"),
});


// Schema parameter ID return
export const returnIdSchema = z.object({
  id: z
    .string()
    .cuid({
      message: "ID Return tidak valid",
    }),
});


// Type
export type CreateReturnInput =
  z.infer<typeof createReturnSchema>;

export type UpdateReturnInput =
  z.infer<typeof updateReturnSchema>;

export type ReturnIdParams =
  z.infer<typeof returnIdSchema>;