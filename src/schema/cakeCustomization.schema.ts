import { z } from "zod";


// Schema membuat pesanan custom cake
export const createCustomCakeSchema = z.object({
  cakeType: z
    .string()
    .min(1, "Jenis kue wajib diisi"),

  size: z
    .string()
    .min(1, "Ukuran kue wajib diisi"),

  flavor: z
    .string()
    .min(1, "Rasa kue wajib diisi"),

  filling: z
    .string()
    .optional(),

  topping: z
    .string()
    .optional(),

  color: z
    .string()
    .optional(),

  writing: z
    .string()
    .optional(),

  note: z
    .string()
    .optional(),

  image: z
    .string()
    .optional(),
});


// Schema update custom cake (admin)
export const updateCustomCakeSchema = z.object({
  status: z
    .string()
    .optional(),

  estimatedPrice: z
    .number()
    .int()
    .positive("Harga harus lebih dari 0")
    .optional(),
});


// Schema parameter ID
export const customCakeIdSchema = z.object({
  id: z
    .string()
    .cuid({
      message: "ID Custom Cake tidak valid",
    }),
});


// Type
export type CreateCustomCakeInput =
  z.infer<typeof createCustomCakeSchema>;

export type UpdateCustomCakeInput =
  z.infer<typeof updateCustomCakeSchema>;

export type CustomCakeIdParams =
  z.infer<typeof customCakeIdSchema>;