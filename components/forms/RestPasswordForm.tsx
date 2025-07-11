"use client";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useLocale, useTranslations } from "next-intl";
import { changePassword } from "@/lib/client-action";
import { passwordChangeSchema } from "@/lib/validation/userValidation";

export default function PasswordChangeForm({
  onSuccess,
}: {
  onSuccess: () => void;
}) {
  const t = useTranslations("forms.passwordChangeForm");
  const locale = useLocale();
  const isRTL = locale === "ar";

  const form = useForm({
    resolver: zodResolver(passwordChangeSchema(t)),
    defaultValues: {
      current_password: "",
      new_password: "",
      new_password_confirmation: "",
    },
  });

  async function onSubmit(values: {
    current_password: string;
    new_password: string;
    new_password_confirmation: string;
  }) {
    try {
      await changePassword({
        current_password: values.current_password,
        new_password: values.new_password,
        new_password_confirmation: values.new_password_confirmation,
      });

      toast.success(t("toast.success.title"));
      onSuccess();
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
          {/* Current Password */}
          <FormField
            control={form.control}
            name="current_password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("fields.current_password.label")}</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder={t("fields.current_password.placeholder")}
                    className="dark:bg-gray-800  bg-gray-100"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />

          {/* New Password */}
          <FormField
            control={form.control}
            name="new_password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("fields.new_password.label")}</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder={t("fields.new_password.placeholder")}
                    className="dark:bg-gray-800  bg-gray-100"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />

          {/* Confirm New Password */}
          <FormField
            control={form.control}
            name="new_password_confirmation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {t("fields.new_password_confirmation.label")}
                </FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder={t(
                      "fields.new_password_confirmation.placeholder"
                    )}
                    className="dark:bg-gray-800 bg-gray-100"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full text-white"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? t("submitting") : t("submit")}
          </Button>
        </div>
      </form>
    </Form>
  );
}
