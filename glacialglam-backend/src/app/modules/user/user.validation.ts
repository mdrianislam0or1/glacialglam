import { z } from "zod";

export const createUserValidation = z.object({
  username: z.string().min(3).max(50),
  email: z.string().email(),
  password: z
    .string()
    .min(8)
    .refine(
      (value) =>
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]+$/.test(
          value
        ),
      {
        message:
          "Password must contain at least one letter, one number, and one special character.",
      }
    ),
});

export const loginUserValidation = z.object({
  username: z.string().min(3).max(50),
});

export const changePasswordValidation = z.object({
  newPassword: z
    .string()
    .min(8)
    .refine(
      (value) =>
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]+$/.test(
          value
        ),
      {
        message:
          "newPassword must contain at least one letter, one number, and one special character.",
      }
    ),
});
