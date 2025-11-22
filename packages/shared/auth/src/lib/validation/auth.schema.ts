/**
 * Authentication Validation Schemas
 * Yup schemas for validating auth forms
 */

import { authConfig } from "../../config/auth.config";
import * as yup from "yup";

/**
 * Email validation schema
 */
export const emailSchema = yup
  .string()
  .required("Email is required")
  .email("Invalid email format")
  .trim()
  .lowercase();

/**
 * Password validation schema
 */
export const passwordSchema = yup
  .string()
  .required("Password is required")
  .min(
    authConfig.security.minPasswordLength,
    `Password must be at least ${authConfig.security.minPasswordLength} characters`
  );

/**
 * Name validation schema
 */
export const nameSchema = yup
  .string()
  .required("Name is required")
  .trim()
  .min(2, "Name must be at least 2 characters");

/**
 * Login Form Schema
 */
export const loginSchema = yup.object({
  email: emailSchema,
  password: passwordSchema,
});

export type LoginFormData = yup.InferType<typeof loginSchema>;

/**
 * Sign Up Form Schema
 */
export const signUpSchema = yup.object({
  name: nameSchema,
  email: emailSchema,
  password: passwordSchema,
  confirmPassword: yup
    .string()
    .required("Please confirm your password")
    .oneOf([yup.ref("password")], "Passwords do not match"),
});

export type SignUpFormData = yup.InferType<typeof signUpSchema>;

/**
 * Forgot Password Form Schema
 */
export const forgotPasswordSchema = yup.object({
  email: emailSchema,
});

export type ForgotPasswordFormData = yup.InferType<typeof forgotPasswordSchema>;

/**
 * Change Password Form Schema
 */
export const changePasswordSchema = yup.object({
  currentPassword: passwordSchema,
  newPassword: passwordSchema,
  confirmNewPassword: yup
    .string()
    .required("Please confirm your new password")
    .oneOf([yup.ref("newPassword")], "Passwords do not match"),
});

export type ChangePasswordFormData = yup.InferType<typeof changePasswordSchema>;
