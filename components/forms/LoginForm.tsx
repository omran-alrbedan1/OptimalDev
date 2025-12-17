"use client";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginFormSchema } from "@/lib/validation/userValidation";
import { useLocale, useTranslations } from "next-intl";
import { useDispatch } from "react-redux";
import { loginStart, loginSuccess } from "@/store/slices/authSlice";
import { login } from "@/lib/client-action";

type LoginFormValues = z.infer<typeof loginFormSchema>;

export default function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const dispatch = useDispatch();
  const jobId = searchParams.get("jobId");
  const t = useTranslations("forms.loginForm");
  const locale = useLocale();
  const isRTL = locale === "ar";
  const router = useRouter();
  
  // State for password visibility
  const [showPassword, setShowPassword] = useState(false);

  const getRegisterUrl = () => {
    const params = new URLSearchParams();
    if (jobId) params.append("jobId", jobId);
    if (callbackUrl) params.append("callbackUrl", callbackUrl);
    return `/${locale}/register${
      params.toString() ? `?${params.toString()}` : ""
    }`;
  };

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      login: "",
      password: "",
    },
  });

async function onSubmit(values: LoginFormValues) {
  try {
    dispatch(loginStart());
    const response = await login(values.login, values.password);

    // Dispatch success action - Redux will handle cookie storage
    dispatch(loginSuccess(response));

    toast.success(t("toast.success.title"));
    const redirectUrl =
      callbackUrl && callbackUrl.length > 0
        ? decodeURIComponent(callbackUrl)
        : `/${locale}/career`;
    router.push(redirectUrl);
  } catch (error: any) {
    let errorMessage = t("toast.error.description"); 
    
    if (error?.message) {
      errorMessage = error.message;
    } else if (error?.error) {
      errorMessage = error.error;
    } else if (typeof error === 'string') {
      errorMessage = error;
    }
    
    toast.error(errorMessage, {
      duration: 5000,
    });
  }
}

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

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

        <div className="space-y-4 dark:!text-white">
          <div className="space-y-2 ">
            <Label htmlFor="identifier">{t("fields.identifier.label")}</Label>
            <Input
              id="identifier"
              placeholder={t("fields.identifier.placeholder")}
              {...form.register("login")}
              autoComplete="username"
              className="dark:bg-gray-800 "
            />
            {form.formState.errors.login && (
              <p className="text-sm text-red-500">
                {t("fields.identifier.error")}
              </p>
            )}
          </div>

          {/* Password Field with Eye Icon */}
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
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder={t("fields.password.placeholder")}
                {...form.register("password")}
                autoComplete="current-password"
                className="dark:bg-gray-800 pr-10"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 end-0 flex items-center pe-3 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
            {form.formState.errors.password && (
              <p className="text-sm text-red-500">
                {t("fields.password.error")}
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full text-white"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? t("submitting") : t("submit")}
          </Button>
        </div>

        <div className="text-center text-sm">
          {t("noAccount")}{" "}
          <Link
            href={getRegisterUrl()}
            className="font-medium text-primary hover:underline"
          >
            {t("signUp")}
          </Link>
        </div>
      </form>
    </Form>
  );
}