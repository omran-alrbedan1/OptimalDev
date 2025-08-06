"use client";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { verifyResetCodeSchema } from "@/lib/validation/userValidation";
import { forgetPassword, verifyResetToken } from "@/lib/client-action";

export default function VerifyResetCodeForm() {
  const t = useTranslations("forms.verifyResetCodeForm");
  const locale = useLocale();
  const router = useRouter();
  const isRTL = locale === "ar";

  const form = useForm({
    resolver: zodResolver(verifyResetCodeSchema(t)),
    defaultValues: {
      email: "",
      token: "",
    },
  });

  async function onSubmit(values: { email: string; token: string }) {
    try {
      await verifyResetToken(values.email, values.token);

      toast.success(t("toast.success.title"), {
        description: t("toast.success.description"),
      });

      router.push(
        `/${locale}/reset-password?email=${encodeURIComponent(
          values.email
        )}&token=${values.token}`
      );
    } catch (error) {
      console.error("Error verifying code", error);

      toast.error(t("toast.error.title"), {
        description: t("toast.error.description"),
      });
    }
  }

  async function handleResendCode() {
    try {
      const email = form.getValues("email");
      if (!email) {
        form.setError("email", {
          type: "manual",
          message: t("fields.email.required"),
        });
        return;
      }

      await forgetPassword(email);
      toast.success(t("toast.resendSuccess.title"), {
        description: t("toast.resendSuccess.description"),
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
        className="space-y-6 flex-1"
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
          {/* Email Field */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {t("fields.email.label")}
                  <span className="text-red-400 text-2xl ml-1">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder={t("fields.email.placeholder")}
                    className="dark:bg-gray-800 bg-gray-100"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />

          {/* Verification Code Field */}
          <FormField
            control={form.control}
            name="token"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {t("fields.token.label")}
                  <span className="text-red-400 text-2xl ml-1">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder={t("fields.token.placeholder")}
                    className="dark:bg-gray-800 bg-gray-100"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />

          <div className="flex flex-col gap-4">
            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full text-white"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? t("submitting") : t("submit")}
            </Button>

            {/* Resend Code Button */}
            <Button
              type="button"
              variant="outline"
              className="w-full border border-primary text-primary"
              onClick={handleResendCode}
              disabled={form.formState.isSubmitting}
            >
              {t("resendCode")}
            </Button>
          </div>

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
