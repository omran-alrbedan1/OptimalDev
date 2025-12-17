//@ts-nocheck
"use client";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

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
import { Checkbox } from "@/components/ui/checkbox";
import { registerFormSchema } from "@/lib/validation/userValidation";
import { useFetch, useFetchWithId } from "@/hooks/useFetch";
import { fetchCities, fetchCountries, register } from "@/lib/client-action";
import { useDispatch } from "react-redux";
import { loginSuccess } from "@/store/slices/authSlice";

const { Dragger } = Upload;

export default function RegisterForm() {
  const [fileList, setFileList] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const t = useTranslations("forms.registerForm");
  const locale = useLocale();
  const isRTL = locale === "ar";
  const router = useRouter();
  const dispatch = useDispatch();

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const jobId = searchParams.get("jobId");

  // Use the schema with translation function
  const schema = registerFormSchema(t);

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      country_id: "",
      city_id: "",
      password: "",
      cv: undefined,
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

      form.setValue("cv", file, { shouldValidate: true });
      setFileList([file]);
      return false;
    },
    onChange(info: any) {
      if (info.file.status === "removed") {
        form.setValue("cv", null, { shouldValidate: true });
        setFileList([]);
      }
    },
  };

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value ? e.target.value : "";
    form.setValue("country_id", value, { shouldValidate: true });
    form.setValue("city_id", "", { shouldValidate: true });
  };

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value ? e.target.value : "";
    form.setValue("city_id", value, { shouldValidate: true });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

async function onSubmit(values: z.infer<typeof schema>) {
  try {
    const formData = new FormData();

    formData.append("first_name", values.first_name);
    formData.append("last_name", values.last_name);
    formData.append("email", values.email);
    formData.append("phone", values.phone);
    formData.append("country_id", values.country_id);
    formData.append("city_id", values.city_id);
    formData.append("password", values.password);
    formData.append("password_confirmation", values.password_confirmation);
    formData.append("accept_terms", values.acceptTerms.toString());

    if (values.cv) {
      formData.append("cv", values.cv);
    }

    const response = await register(formData);

    if (response.access_token) {
      dispatch(loginSuccess(response));

      toast.success(t("toast.success.title"), {
        description: t("toast.success.description"),
      });

      const redirectUrl =
        callbackUrl && callbackUrl.length > 0
          ? decodeURIComponent(callbackUrl)
          : `/${locale}/home`;
      router.push(redirectUrl);
    }
  } catch (error: any) {

    let errorMessage = t("toast.error.description");
    
    if (error.error) {
      errorMessage = error.error;
    }
    
    if (error.details) {
      const errorDetails = Object.entries(error.details)
        .map(([field, messages]: [string, any]) => {
          const messageList = Array.isArray(messages) ? messages : [messages];
          return ` ${messageList.join(", ")}`;
        })
        .join("; ");
      
      errorMessage = errorDetails || errorMessage;
    }
    
    if (error.errors) {
      const errorDetails = Object.entries(error.errors)
        .map(([field, messages]: [string, any]) => {
          const messageList = Array.isArray(messages) ? messages : [messages];
          return `${messageList.join(", ")}`;
        })
        .join("; ");
      
      errorMessage = errorDetails || errorMessage;
    }


    toast.error(t("toast.error.title"), {
      description: errorMessage,
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
                <FormMessage className="text-red-500" />
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
                <FormMessage className="text-red-500" />
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
                  <FormMessage className="text-red-500" />
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
                  <FormMessage className="text-red-500" />
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
                    value={field.value}
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
                <FormMessage className="text-red-500" />
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
                    value={field.value}
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
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          {/* Password Field with Eye Icon */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="dark:text-gray-300">
                  {t("fields.password.label")}
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder={t("fields.password.placeholder")}
                      {...field}
                      className="border border-gray-200 dark:border-gray-500 bg-gray-50 dark:bg-gray-800 dark:text-gray-300 pr-10"
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
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          {/* Confirm Password Field with Eye Icon */}
          <FormField
            control={form.control}
            name="password_confirmation"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="dark:text-gray-300">
                  {t("fields.confirmPassword.label")}
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder={t("fields.confirmPassword.placeholder")}
                      {...field}
                      className="border border-gray-200 dark:border-gray-400 bg-gray-50 dark:bg-gray-800 dark:text-gray-300 pr-10"
                    />
                    <button
                      type="button"
                      onClick={toggleConfirmPasswordVisibility}
                      className="absolute inset-y-0 end-0 flex items-center pe-3 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          <div className="grid gap-2 md:col-span-2 relative h-fit mt-4">
            <FormField
              control={form.control}
              name="cv"
              render={({ field }) => (
                <FormItem className="flex flex-col items-start justify-start">
                  <FormLabel className="dark:text-gray-300">
                    {t("fields.cv.label")}
                  </FormLabel>
                  <FormControl className="pt-2">
                    <Dragger
                      {...uploadProps}
                      className="mb-2 border-gray-300 rounded-md"
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
                  <FormMessage className="text-red-500 mt-4" />
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
                    <FormMessage className="text-red-500 rtl:text-right !mt-4" />
                  </div>
                </FormItem>
              )}
            />
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