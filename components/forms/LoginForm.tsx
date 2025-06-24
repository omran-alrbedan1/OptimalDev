"use client";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginFormSchema } from "@/lib/validation/userValidation";
import { useLocale, useTranslations } from "next-intl";

type LoginFormValues = z.infer<typeof loginFormSchema>;

export default function LoginForm() {
  const searchParams = useSearchParams();
  const jobId = searchParams.get("jobId");
  const t = useTranslations("forms.loginForm");
  const locale = useLocale();
  const isRTL = locale === "ar";

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  async function onSubmit(values: LoginFormValues) {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
      console.log("Login attempt with:", values);

      toast.success(t("toast.success.title"), {
        description: t("toast.success.description"),
      });
    } catch (error) {
      toast.error(t("toast.error.title"), {
        description: t("toast.error.description"),
      });
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6"
        dir={isRTL ? "rtl" : "ltr"}
      >
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            {t("title")}
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {t("description")}
          </p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="identifier">{t("fields.identifier.label")}</Label>
            <Input
              id="identifier"
              placeholder={t("fields.identifier.placeholder")}
              {...form.register("identifier")}
              autoComplete="username"
              className="dark:bg-gray-800"
            />
            {form.formState.errors.identifier && (
              <p className="text-sm text-red-500">
                {t("fields.identifier.error")}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <div className="flex items-center">
              <Label htmlFor="password">{t("fields.password.label")}</Label>
              <Link
                href="/forgot_password"
                className={`${
                  isRTL ? "mr-auto" : "ml-auto"
                } text-sm text-primary hover:underline`}
              >
                {t("forgotPassword")}
              </Link>
            </div>
            <Input
              id="password"
              type="password"
              placeholder={t("fields.password.placeholder")}
              {...form.register("password")}
              autoComplete="current-password"
              className="dark:bg-gray-800"
            />
            {form.formState.errors.password && (
              <p className="text-sm text-red-500">
                {t("fields.password.error")}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full text-white"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? t("submitting") : t("submit")}
          </Button>
        </div>

        {/* Sign Up Link */}
        <div className="text-center text-sm">
          {t("noAccount")}{" "}
          <Link
            href={`/${locale}/register${jobId ? `?jobId=${jobId}` : ""}`}
            className="font-medium text-primary hover:underline"
          >
            {t("signUp")}
          </Link>
        </div>
      </form>
    </Form>
  );
}
