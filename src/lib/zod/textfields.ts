import {z} from "zod";

export const textFieldSchema = z.object({
    content: z.string().trim().min(1, {message: "This field is required!"}),
});

export type TextFieldSchema = z.infer<typeof textFieldSchema>;