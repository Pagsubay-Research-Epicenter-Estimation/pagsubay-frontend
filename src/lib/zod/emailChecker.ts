import { z } from "zod";

export const emailChecker = z
  .string()
  .email("Please enter a valid email address");

export const passwordChecker = z
  .string()
  .min(8, "Password must be at least 8 characters long");
