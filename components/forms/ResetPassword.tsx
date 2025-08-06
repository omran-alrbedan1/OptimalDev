"use client";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
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
import { resetPasswordSchema } from "@/lib/validation/userValidation";
import { resetPassword } from "@/lib/client-action";

export default function ResetPasswordForm() {
  const t = useTranslations("forms.resetPasswordForm");
  const locale = useLocale();
  const router = useRouter();
  const searchParams = useSearchParams();
  const isRTL = locale === "ar";

  const email = searchParams.get("email") || "";
  const token = searchParams.get("token") || "";

  const form = useForm({
    resolver: zodResolver(resetPasswordSchema(t)),
    defaultValues: {
      email,
      token,
      password: "",
      password_confirmation: "",
    },
  });

  async function onSubmit(values: {
    email: string;
    token: string;
    password: string;
    password_confirmation: string;
  }) {
    try {
      await resetPassword(
        values.email,
        values.token,
        values.password,
        values.password_confirmation
      );

      toast.success(t("toast.success.title"), {
        description: t("toast.success.description"),
      });

      router.push(`/${locale}/login`);
    } catch (error) {
      console.error("Error resetting password", error);
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

        <input type="hidden" {...form.register("email")} />
        <input type="hidden" {...form.register("token")} />

        <div className="space-y-4">
          {/* New Password Field */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("fields.password.label")}</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder={t("fields.password.placeholder")}
                    className="dark:bg-gray-800 bg-gray-100"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />

          {/* Confirm New Password Field */}
          <FormField
            control={form.control}
            name="password_confirmation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("fields.password_confirmation.label")}</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder={t("fields.password_confirmation.placeholder")}
                    className="dark:bg-gray-800 bg-gray-100"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full text-white"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? t("submitting") : t("submit")}
          </Button>

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
