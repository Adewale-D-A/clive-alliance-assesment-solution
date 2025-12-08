import { z } from "zod";
import {
  ACCEPTED_FILE_TYPES,
  MAX_FILE_SIZE,
} from "../../config/system/constants";
interface FileExtension extends File {
  preview: string;
}
export const phoneNumberSchema = z
  .string()
  .trim()
  .min(1, "Phone number is required")
  .min(11, "Phone number should be atleast 11 numbers")
  .regex(
    /^(\+234|234|0)(701|702|703|704|705|706|707|708|709|802|803|804|805|806|807|808|809|810|811|812|813|814|815|816|817|818|819|909|908|901|902|903|904|905|906|907|911|912|913|915|916|917)([0-9]{7})$/,
    { message: "Phone number is invalid" }
  );

export const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters long")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[0-9]/, "Password must contain at least one number")
  .regex(/[@$!%*?&#]/, "Password must contain at least one special character");

export const imageFileUpload = z
  .any()
  .refine(
    (file: FileExtension) => file.name || file?.preview,
    "Logo is required"
  )
  .refine(
    (file: FileExtension) => file?.size <= MAX_FILE_SIZE || file?.preview,
    `Max file size is 5MB.`
  )
  .refine(
    (file: FileExtension) =>
      ACCEPTED_FILE_TYPES.includes(file?.type) || file?.preview,
    "Only .jpeg, .jpg, .png, and .webp formats are supported."
  )
  .optional();

export const SignInSchema = z.object({
  email: z.string().email().min(1, {
    message: "Email is required.",
  }),
  password: z.string().min(1, {
    message: "Password is required.",
  }), //passwordSchema,
});

export const SignUpSchema = z.object({
  email: z.string().min(2, { message: "Email is required" }),
  gender: z.string().min(2, { message: "Gender is required" }),
  account_type: z.string().min(2, { message: "Account type is required" }),
  first_name: z.string().min(2, { message: "First ame is required" }),
  last_name: z.string().min(2, { message: "Last name is required" }),
  username: z.string().optional(),
  password: z.string().min(2, { message: "Password is required" }),
  phone_number: z.string().min(2, { message: "Phone number is required" }),
  dob: z.string().min(2, { message: "Date of birth is required" }),
});

export const SendOtpSchema = z.object({
  email: z.string().email().min(1, {
    message: "Email is required.",
  }),
});

export const ResetPasswordSchema = z.object({
  otp: z.string().min(1, {
    message: "OTP is required.",
  }),
  email: z.string().email().min(1, {
    message: "Email is required.",
  }),
  password: passwordSchema,
  confirm_password: passwordSchema,
});

export const UpdateProfileSchema = z.object({
  email: z.string().min(2, { message: "Email is required" }),
  gender: z.string().min(2, { message: "Gender is required" }),
  first_name: z.string().min(2, { message: "First ame is required" }),
  last_name: z.string().min(2, { message: "Last name is required" }),
  username: z.string().optional(),
  phone_number: z.string().min(2, { message: "Phone number is required" }),
  dob: z.string().min(2, { message: "Date of birth is required" }),
});

export const ChangePasswordSchema = z.object({
  password: z.string().min(1, {
    message: "Password is required.",
  }),
  confirm_password: z.string().min(1, {
    message: "Confirmation of password is required.",
  }),
});

export const AddEditUserSchema = z.object({
  email: z.string().min(2, { message: "Email is required" }),
  gender: z.string().min(2, { message: "Gender is required" }),
  first_name: z.string().min(2, { message: "First ame is required" }),
  last_name: z.string().min(2, { message: "Last name is required" }),
  username: z.string().optional(),
  password: z.string().min(2, { message: "Password is required" }),
  phone_number: z.string().min(2, { message: "Phone number is required" }),
  dob: z.string().min(2, { message: "Date of birth is required" }),
});

export const NewTransactionSchema = z.object({
  transaction_type: z
    .string()
    .min(2, { message: "Please Select a transaction type" }),
  amount: z.coerce.number<number>().min(1, { message: "Must be at least 1" }),
  description: z.string().min(2, { message: "Description is required" }),
  recipient_bank: z.string().min(2, { message: "Please Select recipient's" }),
  recipient_account: z.coerce
    .number<number>()
    .min(10, { message: "Must be at least 10" }),
});
