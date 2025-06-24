//@ts-nocheck
"use client";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

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

const { Dragger } = Upload;

export default function RegisterForm() {
  const [fileList, setFileList] = useState([]);
  const t = useTranslations("forms.registerForm");
  const locale = useLocale();
  const isRTL = locale === "ar";
  const router = useRouter();

  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      name: "",
      surname: "",
      email: "",
      phone: "",
      country: "",
      city: "",
      password: "",
      confirmPassword: "",
      acceptTerms: false,
    },
  });

  const selectedCountry = form.watch("country");

  const uploadProps = {
    name: "cv",
    multiple: false,
    accept: ".pdf,.doc,.docx",
    fileList: fileList,
    beforeUpload: (file: any) => {
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

  async function onSubmit(values: z.infer<typeof registerFormSchema>) {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Registration values:", values);

      toast.success(t("toast.success.title"), {
        description: t("toast.success.description"),
      });
      router.push(`/${locale}/login`);
    } catch (error) {
      console.error("Registration error", error);
      toast.error(t("toast.error.title"), {
        description: t("toast.error.description"),
      });
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col"
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
          {/* Name Field */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="dark:text-gray-300">
                  {t("fields.name.label")}
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder={t("fields.name.placeholder")}
                    {...field}
                    className="border border-gray-200 dark:border-gray-500 bg-gray-50 dark:bg-gray-600"
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

          {/* Surname Field */}
          <FormField
            control={form.control}
            name="surname"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="dark:text-gray-300">
                  {t("fields.surname.label")}
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder={t("fields.surname.placeholder")}
                    {...field}
                    className="border border-gray-200 dark:border-gray-500 bg-gray-50 dark:bg-gray-600"
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

          {/* Email Field */}
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
                      className="border border-gray-200 dark:border-gray-500 bg-gray-50 dark:bg-gray-600"
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

          {/* Phone Field */}
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
                      country={isRTL ? "sa" : "us"}
                      value={field.value}
                      onChange={(phone) => field.onChange(phone)}
                      inputClass="!w-full rounded-md !border dark:!border-gray-500 !bg-gray-50 dark:!bg-gray-600 border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:!bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      containerClass="mt-1"
                      buttonClass="!pr-2"
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

          {/* Country Field */}
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="dark:text-gray-300">
                  {t("fields.country.label")}
                </FormLabel>
                <FormControl>
                  <select
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      form.resetField("city");
                    }}
                    className="flex h-10 w-full border dark:text-white border-gray-200 dark:border-gray-500 bg-gray-50 dark:bg-gray-600 rounded-md border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="">{t("fields.country.placeholder")}</option>
                    {Country.getAllCountries().map((c) => (
                      <option key={c.isoCode} value={c.isoCode}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </FormControl>
                {form.formState.errors.country && (
                  <p className="text-sm text-red-500">
                    {t("fields.country.error")}
                  </p>
                )}
              </FormItem>
            )}
          />

          {/* City Field */}
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="dark:text-gray-300">
                  {t("fields.city.label")}
                </FormLabel>
                <FormControl>
                  <select
                    {...field}
                    disabled={!selectedCountry}
                    className="flex h-10 w-full border dark:text-white border-gray-200 dark:border-gray-500 bg-gray-50 dark:bg-gray-600 rounded-md border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="">{t("fields.city.placeholder")}</option>
                    {selectedCountry &&
                      City.getCitiesOfCountry(selectedCountry)?.map((c) => (
                        <option key={c.name} value={c.name}>
                          {c.name}
                        </option>
                      ))}
                  </select>
                </FormControl>
                {form.formState.errors.city && (
                  <p className="text-sm text-red-500">
                    {t("fields.city.error")}
                  </p>
                )}
              </FormItem>
            )}
          />

          {/* Password Field */}
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
                    className="border border-gray-200 dark:border-gray-500 bg-gray-50 dark:bg-gray-600"
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

          {/* Confirm Password Field */}
          <FormField
            control={form.control}
            name="confirmPassword"
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
                    className="border border-gray-200 dark:border-gray-400 bg-gray-50 dark:bg-gray-600"
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

          {/* CV Field */}
          <div className="grid gap-2 md:col-span-2 relative h-fit mb-8">
            <FormField
              control={form.control}
              name="cv"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="dark:text-gray-300">
                    {t("fields.cv.label")}
                  </FormLabel>
                  <FormControl>
                    <Dragger
                      {...uploadProps}
                      className="mb-2 border-gray-300 rounded-md p-4"
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

          {/* Terms and Conditions Checkbox */}
          <div className="md:col-span-2">
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

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full md:col-span-2 text-white bg-primary-color1 hover:bg-primary-color1/90"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? t("submitting") : t("submit")}
          </Button>
        </div>

        {/* Login Link */}
        <div className="text-center text-sm mt-3 md:col-span-2 dark:text-gray-300">
          {t("loginLink.prefix")}{" "}
          <Link
            href={`/${locale}/login`}
            className="underline underline-offset-4 text-primary-color1"
          >
            {t("loginLink.loginText")}
          </Link>
        </div>
      </form>
    </Form>
  );
}
