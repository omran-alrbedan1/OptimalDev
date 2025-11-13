//@ts-nocheck

"use client";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";

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
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Country, City } from "country-state-city";
import { Upload, message } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { registerFormSchema } from "@/lib/validation/userValidation";
import { useFetch, useFetchWithId } from "@/hooks/useFetch";
import { fetchCities, fetchCountries, register } from "@/lib/client-action";
import { setCookie } from "cookies-next";
import { Trash } from "lucide-react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "@/store/slices/authSlice";

const { Dragger } = Upload;

export default function RegisterForm() {
  const [fileList, setFileList] = useState([]);
  const t = useTranslations("forms.registerForm");
  const locale = useLocale();
  const isRTL = locale === "ar";
  const router = useRouter();
  const dispatch = useDispatch();

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const jobId = searchParams.get("jobId");
  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      country_id: "",
      city_id: "",
      password: "",
      password_confirmation: "",
      acceptTerms: false,
    },
  });

  const getLoginUrl = () => {
    const params = new URLSearchParams();
    if (jobId) params.append("jobId", jobId);
    if (callbackUrl) params.append("callbackUrl", callbackUrl);
    return `/${locale}/login${
      params.toString() ? `?${params.toString()}` : ""
    }`;
  };

  const { data: countries } = useFetch<Country[]>(fetchCountries);
  const countryId = form.watch("country_id");
  const { data: cities } = useFetchWithId<City[]>(fetchCities, countryId);

  const uploadProps = {
    name: "cv",
    multiple: false,
    accept: ".pdf,.doc,.docx",
    fileList: fileList,
    beforeUpload: (file: any) => {
      if (typeof window === "undefined" || !(file instanceof File)) {
        return false;
      }

      const isAllowedType = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ].includes(file.type);
      const isLt5M = file.size / 1024 / 1024 < 5;

      if (!isAllowedType) {
        message.error(t("fields.cv.errorType"));
        return Upload.LIST_IGNORE;
      }
      if (!isLt5M) {
        message.error(t("fields.cv.errorSize"));
        return Upload.LIST_IGNORE;
      }

      form.setValue("cv", file);
      setFileList([file]);
      return false;
    },
    onChange(info: any) {
      if (info.file.status === "removed") {
        form.setValue("cv", null);
        setFileList([]);
      }
    },
  };

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value ? Number(e.target.value) : undefined;
    form.setValue("country_id", value);
    form.resetField("city_id");
  };

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value ? Number(e.target.value) : undefined;
    form.setValue("city_id", value);
  };

  async function onSubmit(values: z.infer<typeof registerFormSchema>) {
    try {
      const formData = new FormData();

      formData.append("first_name", values.first_name);
      formData.append("last_name", values.last_name);
      formData.append("email", values.email);
      formData.append("phone", values.phone);
      formData.append("country_id", String(Number(values.country_id)));
      formData.append("city_id", String(Number(values.city_id)));
      formData.append("password", values.password);
      formData.append("password_confirmation", values.password_confirmation);
      formData.append("accept_terms", values.acceptTerms.toString());

      if (values.cv) {
        formData.append("cv", values.cv);
      }

      const response = await register(formData);

      if (response.access_token) {
        const isHttps = window.location.protocol === "https:";

        setCookie("token", response.access_token, {
          maxAge: 30 * 24 * 60 * 60,
          path: "/",
          secure: isHttps,
          sameSite: isHttps ? "strict" : "lax",
        });
      }
      dispatch(loginSuccess(response));
      toast.success(t("toast.success.title"), {
        description: t("toast.success.description"),
      });
      const redirectUrl =
        callbackUrl && callbackUrl.length > 0
          ? decodeURIComponent(callbackUrl)
          : `/${locale}/home`;
      router.push(redirectUrl);
    } catch (error) {
      console.error("Registration error", error);
      toast.error(t("toast.error.title"), {
        description:
          error instanceof Error ? error.message : t("toast.error.description"),
      });
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col w-full"
        dir={isRTL ? "rtl" : "ltr"}
      >
        <div className="flex flex-col items-center gap-2 text-center mb-4">
          <h1 className="text-2xl font-bold dark:text-gray-300">
            {t("title")}
          </h1>
          <p className="w-full text-sm text-gray-600 dark:text-gray-300">
            {t("description")}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 md:gap-2 md:gap-x-4">
          <FormField
            control={form.control}
            name="first_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="dark:text-gray-300">
                  {t("fields.name.label")}
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder={t("fields.name.placeholder")}
                    {...field}
                    className="border border-gray-200 dark:border-gray-500 bg-gray-50 dark:bg-gray-800 dark:text-gray-300"
                  />
                </FormControl>
                {form.formState.errors.name && (
                  <p className="text-sm text-red-500">
                    {t("fields.name.error")}
                  </p>
                )}
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="last_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="dark:text-gray-300">
                  {t("fields.surname.label")}
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder={t("fields.surname.placeholder")}
                    {...field}
                    className="border border-gray-200 dark:border-gray-500 bg-gray-50 dark:bg-gray-800 dark:text-gray-300"
                  />
                </FormControl>
                {form.formState.errors.surname && (
                  <p className="text-sm text-red-500">
                    {t("fields.surname.error")}
                  </p>
                )}
              </FormItem>
            )}
          />

          <div className="grid gap-2 md:col-span-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="dark:text-gray-300">
                    {t("fields.email.label")}
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder={t("fields.email.placeholder")}
                      {...field}
                      className="border border-gray-200 dark:border-gray-500 bg-gray-50 dark:bg-gray-800 dark:text-gray-300"
                    />
                  </FormControl>
                  {form.formState.errors.email && (
                    <p className="text-sm text-red-500">
                      {t("fields.email.error")}
                    </p>
                  )}
                </FormItem>
              )}
            />
          </div>

          <div className="grid gap-2 md:col-span-2">
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="dark:text-gray-300">
                    {t("fields.phone.label")}
                  </FormLabel>
                  <FormControl>
                    <PhoneInput
                      country={isRTL ? "sa" : "jo"}
                      value={field.value}
                      onChange={(phone) => field.onChange(phone)}
                      inputClass="!w-full rounded-md !border dark:!border-gray-500
                       !bg-gray-50 dark:!bg-gray-800 border-input
                      bg-background px-3 py-2 text-sm ring-offset-background
                      file:border-0 file:!bg-transparent file:text-sm file:font-medium dark:text-gray-300
                      placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2
                      focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      containerClass="mt-1 dark:!bg-gray-700"
                      buttonClass="!pr-2 dark:!bg-gray-800 dark:hover:bg-gray-700 !border-gray-300 dark:!border-gray-500"
                    />
                  </FormControl>
                  {form.formState.errors.phone && (
                    <p className="text-sm text-red-500">
                      {t("fields.phone.error")}
                    </p>
                  )}
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="country_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="dark:text-gray-300">
                  {t("fields.country.label")}
                </FormLabel>
                <FormControl>
                  <select
                    value={field.value ?? ""}
                    onChange={handleCountryChange}
                    className="flex h-10 w-full border dark:text-white border-gray-200 dark:border-gray-500 bg-gray-50 dark:bg-gray-800 rounded-md border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="">{t("fields.country.placeholder")}</option>
                    {countries?.map((country) => (
                      <option key={country.id} value={country.id}>
                        {country.name}
                      </option>
                    ))}
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="city_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="dark:text-gray-300">
                  {t("fields.city.label")}
                </FormLabel>
                <FormControl>
                  <select
                    value={field.value ?? ""}
                    onChange={handleCityChange}
                    disabled={!countryId}
                    className="flex h-10 w-full border dark:!text-white  dark:border-gray-500 bg-gray-50 dark:bg-gray-800 rounded-md border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 "
                  >
                    <option value="">{t("fields.city.placeholder")}</option>
                    {cities?.map((city) => (
                      <option key={city.id} value={city.id}>
                        {city.name}
                      </option>
                    ))}
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="dark:text-gray-300">
                  {t("fields.password.label")}
                </FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder={t("fields.password.placeholder")}
                    {...field}
                    className="border border-gray-200 dark:border-gray-500 bg-gray-50 dark:bg-gray-800 dark:text-gray-300"
                  />
                </FormControl>
                {form.formState.errors.password && (
                  <p className="text-sm text-red-500">
                    {t("fields.password.error")}
                  </p>
                )}
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password_confirmation"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="dark:text-gray-300">
                  {t("fields.confirmPassword.label")}
                </FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder={t("fields.confirmPassword.placeholder")}
                    {...field}
                    className="border border-gray-200 dark:border-gray-400 bg-gray-50 dark:bg-gray-800 dark:text-gray-300"
                  />
                </FormControl>
                {form.formState.errors.confirmPassword && (
                  <p className="text-sm text-red-500">
                    {t("fields.confirmPassword.error")}
                  </p>
                )}
              </FormItem>
            )}
          />

          <div className="grid gap-2 md:col-span-2 relative h-fit  mt-4">
            <FormField
              control={form.control}
              name="cv"
              render={({ field }) => (
                <FormItem className="flex flex-col items-start justify-start">
                  <FormLabel className="dark:text-gray-300 ">
                    {t("fields.cv.label")}
                  </FormLabel>
                  <FormControl className="pt-2">
                    <Dragger
                      {...uploadProps}
                      className="mb-2 border-gray-300 rounded-md "
                    >
                      <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                      </p>
                      <p className="ant-upload-text">
                        {t("fields.cv.dragText")}
                      </p>
                      <p className="ant-upload-hint">{t("fields.cv.hint")}</p>
                    </Dragger>
                  </FormControl>
                  {/* <FormMessage className="text-red-400">
                    {form.formState.errors.cv?.message ===
                      "fields.cv.errorSize" && t("fields.cv.errorSize")}
                    {form.formState.errors.cv?.message ===
                      "fields.cv.errorType" && t("fields.cv.errorType")}
                  </FormMessage> */}
                </FormItem>
              )}
            />
          </div>

          <div className="md:col-span-2 mb-5 mt-10">
            <FormField
              control={form.control}
              name="acceptTerms"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rtl:space-x-reverse">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="border-gray-300 dark:border-gray-400"
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none dark:text-gray-300 rtl:text-right">
                    <FormLabel>
                      {isRTL ? (
                        <>
                          أوافق على{" "}
                          <Link
                            href={`/${locale}/terms`}
                            className="underline text-primary-color1"
                          >
                            الشروط والأحكام
                          </Link>{" "}
                          و{" "}
                          <Link
                            href={`/${locale}/privacy`}
                            className="underline text-primary-color1"
                          >
                            سياسة الخصوصية
                          </Link>
                        </>
                      ) : (
                        <>
                          I accept the{" "}
                          <Link
                            href={`/${locale}/terms`}
                            className="underline text-primary-color1"
                          >
                            Terms and Conditions
                          </Link>{" "}
                          and{" "}
                          <Link
                            href={`/${locale}/privacy`}
                            className="underline text-primary-color1"
                          >
                            Privacy Policy
                          </Link>
                        </>
                      )}
                    </FormLabel>
                  </div>
                </FormItem>
              )}
            />
            <FormMessage className="text-red-400 rtl:text-right">
              {form.formState.errors.acceptTerms &&
                t("fields.acceptTerms.error")}
            </FormMessage>
          </div>

          <Button
            type="submit"
            className="w-full md:col-span-2 text-white bg-primary-color1 hover:bg-primary-color1/90"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? t("submitting") : t("submit")}
          </Button>
        </div>

        <div className="text-center text-sm mt-3 md:col-span-2 dark:text-gray-300">
          {t("loginLink.prefix")}{" "}
          <Link
            href={getLoginUrl()}
            className="underline underline-offset-4 text-primary-color1"
          >
            {t("loginLink.loginText")}
          </Link>
        </div>
      </form>
    </Form>
  );
}
import React from "react";
