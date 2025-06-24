"use client";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { Form, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { forgotPasswordSchema } from "@/lib/validation/userValidation";

export default function ForgotPasswordForm() {
  const t = useTranslations("forms.forgotPasswordForm");
  const locale = useLocale();
  const isRTL = locale === "ar";

  const form = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof forgotPasswordSchema>) {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success(t("toast.success.title"), {
        description: t("toast.success.description"),
      });
    } catch (error) {
      console.error("Error sending reset link", error);
      toast.error(t("toast.error.title"), {
        description: t("toast.error.description"),
      });
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6"
        dir={isRTL ? "rtl" : "ltr"}
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold dark:text-gray-200">
            {t("title")}
          </h1>
          <p className="w-full text-sm text-gray-600 dark:text-gray-300">
            {t("description")}
          </p>
        </div>

        <div className="grid gap-6">
          {/* Email Field */}
          <div className="grid gap-2">
            <Label htmlFor="email" className="dark:text-gray-200">
              {t("fields.email.label")}
              <span className="text-red-400 text-2xl ml-1">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              placeholder={t("fields.email.placeholder")}
              {...form.register("email")}
              className="border border-primary-color1"
            />
            <FormMessage className="text-red-400">
              {form.formState.errors.email &&
                t(form.formState.errors.email.message as any)}
            </FormMessage>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full text-white bg-primary-color1 hover:bg-primary-color1/90"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? t("submitting") : t("submit")}
          </Button>

          {/* Back to login link */}
          <div className="text-center text-sm">
            <Link
              href={`/${locale}/login`}
              className="text-primary-color1 hover:underline"
            >
              {t("backToLogin")}
            </Link>
          </div>
        </div>
      </form>
    </Form>
  );
}
