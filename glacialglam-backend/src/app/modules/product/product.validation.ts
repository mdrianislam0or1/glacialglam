import { ZodError, z } from "zod";

export const ProductSchema = z.object({
  _id: z.string().optional(),
  name: z.string().optional(),
  image: z.string().optional(),
  brand: z.string().optional(),
  description: z.string().optional(),
  categoryId: z.string().optional(),
  price: z.number().positive().optional(),
  tags: z.array(
    z.object({
      name: z.string().optional(),
      isDeleted: z.boolean().optional(),
    })
  ),
  manufacturingDate: z.string().optional(),
  expireDate: z.string().optional(),
  countInStock: z.number().positive().optional(),
  details: z.object({
    level: z.enum(["old", "new", "special"]).optional(),
    description: z.string().optional(),
  }),
  createdBy: z.string().optional(),
}).nonstrict(); // Use nonstrict to remove undefined from optional properties

export const newValidation = (data: any) => {
  try {
    const validatedData = ProductSchema.parse(data);
    return { success: true, data: validatedData };
  } catch (error) {
    if (error instanceof ZodError) {
      const errorDetails = {
        issues: error.errors.map((err) => ({
          code: err.code,
          expected: err.message,
          received: err.message,
          path: err.path,
          message: err.message,
        })),
        name: "ZodError",
      };

      return {
        success: false,
        message: "Validation Error",
        errorMessage: error.errors.map((err) => err.message).join(". "),
        errorDetails,
        stack: error.stack,
      };
    }

    throw error;
  }
};
