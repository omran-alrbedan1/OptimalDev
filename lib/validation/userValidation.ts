import { z } from "zod";

export const loginFormSchema = z.object({
  login: z
    .string()
    .min(1, "loginForm.fields.identifier.error")
    .refine(
      (value) => {
        const isEmail = z.string().email().safeParse(value).success;
        const isPhone = /^\+?[\d\s-]{8,}$/.test(value.replace(/\s/g, ""));
        return isEmail || isPhone;
      },
      {
        message: "loginForm.fields.identifier.error",
      }
    ),
  password: z.string().min(6, "loginForm.fields.password.error"),
});

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, "fields.email.required")
    .email("fields.email.invalid"),
});
export const subscribeFormShema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Please enter a valid email address" }),
});

export const registerFormSchema = z
  .object({
    first_name: z.string().min(2, {
      message: "registerForm.fields.name.error",
    }),
    last_name: z.string().min(2, {
      message: "registerForm.fields.surname.error",
    }),
    email: z.string().email({
      message: "registerForm.fields.email.error",
    }),
    phone: z.string().min(5, {
      message: "registerForm.fields.phone.error",
    }),
    country_id: z.number().min(1, {
      message: "registerForm.fields.country.error",
    }),
    city_id: z.number().min(1, {
      message: "registerForm.fields.city.error",
    }),
    password: z.string().min(8, {
      message: "registerForm.fields.password.error",
    }),
    password_confirmation: z.string(),
    cv: z
      .union([
        z
          .instanceof(File, {
            message: "registerForm.fields.cv.errorType",
          })
          .refine((file) => file.size <= 5 * 1024 * 1024, {
            message: "registerForm.fields.cv.errorSize",
          })
          .refine(
            (file) =>
              [
                "application/pdf",
                "application/msword",
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
              ].includes(file.type),
            { message: "registerForm.fields.cv.errorType" }
          ),
        z.null().or(z.undefined()),
      ])
      .optional(),
    acceptTerms: z.literal(true, {
      errorMap: () => ({
        message: "registerForm.fields.acceptTerms.error",
      }),
    }),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "registerForm.fields.confirmPassword.error",
    path: ["confirmPassword"],
  });

export const passwordChangeSchema = (t: (key: string) => string) =>
  z
    .object({
      current_password: z.string().min(1, {
        message: t("fields.current_password.error"),
      }),
      new_password: z.string().min(6, {
        message: t("fields.new_password.error"),
      }),
      new_password_confirmation: z.string().min(1, {
        message: t("fields.new_password_confirmation.error"),
      }),
    })
    .refine((data) => data.new_password === data.new_password_confirmation, {
      message: t("fields.new_password_confirmation.mismatch"),
      path: ["new_password_confirmation"],
    });

// In your schema definition
export const editProfileSchema = (t: (key: string) => string) =>
  z.object({
    first_name: z.string().min(1, t("form.firstName.required")),
    last_name: z.string().min(1, t("form.lastName.required")),
    email: z.string().email(t("form.email.invalid")),
    phone: z.string().min(1, t("form.phone.required")),
    country_id: z.string().min(1, t("form.country.required")),
    city_id: z.string().min(1, t("form.city.required")),
  });
