//@ts-nocheck
"use client";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Country, City } from "country-state-city";
import { Upload, message } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";

const { Dragger } = Upload;

// Define the form schema
const registerFormSchema = z
  .object({
    name: z.string().min(2, {
      message: "Name must be at least 2 characters.",
    }),
    surname: z.string().min(2, {
      message: "Surname must be at least 2 characters.",
    }),
    phone: z.string().min(5, {
      message: "Please enter a valid phone number.",
    }),
    country: z.string().min(1, {
      message: "Please select a country.",
    }),
    city: z.string().min(1, {
      message: "Please select a city.",
    }),
    password: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
    acceptTerms: z.literal<boolean>(true, {
      errorMap: () => ({ message: "You must accept the terms and policies" }),
    }),
    confirmPassword: z.string(),
    cv: z
      .instanceof(File)
      .refine(
        (file) => file.size <= 5 * 1024 * 1024, // 5MB
        { message: "CV file must be less than 5MB" }
      )
      .refine(
        (file) =>
          [
            "application/pdf",
            "application/msword",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          ].includes(file.type),
        { message: "Only PDF and Word documents are accepted" }
      ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export default function RegisterForm() {
  const [fileList, setFileList] = useState([]);
  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      name: "",
      surname: "",
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
        message.error("You can only upload PDF or Word files!");
        return Upload.LIST_IGNORE;
      }
      if (!isLt5M) {
        message.error("File must be smaller than 5MB!");
        return Upload.LIST_IGNORE;
      }

      form.setValue("cv", file);
      setFileList([file]);
      return false; // Prevent automatic upload
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
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Replace with actual registration logic
      console.log("Registration values:", values);

      toast.success("Registration successful!", {
        description: "Your account has been created successfully.",
      });
    } catch (error) {
      console.error("Registration error", error);
      toast.error("Registration failed", {
        description: "An error occurred. Please try again.",
      });
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6"
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold dark:text-gray-300">
            Create an account
          </h1>
          <p className="w-full text-sm text-gray-600 dark:text-gray-300">
            Enter your details below to create your account
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 md:gap-8">
          {/* Name Field */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="John"
                    {...field}
                    className="border border-gray-200 dark:border-gray-400 bg-gray-50 dark:bg-gray-600"
                  />
                </FormControl>
                <FormMessage className="shad-error text-red-400" />
              </FormItem>
            )}
          />

          {/* Surname Field */}
          <FormField
            control={form.control}
            name="surname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Surname</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Doe"
                    {...field}
                    className="border border-gray-200 dark:border-gray-400 bg-gray-50 dark:bg-gray-600"
                  />
                </FormControl>
                <FormMessage className="shad-error text-red-400" />
              </FormItem>
            )}
          />

          {/* Phone Field */}
          <div className="grid gap-2 md:col-span-2">
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <PhoneInput
                      country={"us"}
                      value={field.value}
                      onChange={(phone) => field.onChange(phone)}
                      inputClass="!w-full rounded-md !border dark:!border-gray-400 !bg-gray-50 dark:!bg-gray-600 border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      containerClass="mt-1"
                    />
                  </FormControl>
                  <FormMessage className="shad-error text-red-400" />
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
                <FormLabel>Country</FormLabel>
                <FormControl>
                  <select
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      form.resetField("city");
                    }}
                    className="flex h-10 w-full rounded-md border border-gray-200 dark:border-gray-400 bg-gray-50 dark:bg-gray-600 bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="">Select Country</option>
                    {Country.getAllCountries().map((c) => (
                      <option key={c.isoCode} value={c.isoCode}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </FormControl>
                <FormMessage className="shad-error text-red-400" />
              </FormItem>
            )}
          />

          {/* City Field */}
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <select
                    {...field}
                    disabled={!selectedCountry}
                    className="flex h-10 w-full border border-gray-200 dark:border-gray-400 bg-gray-50 dark:bg-gray-600 rounded-md border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="">Select City</option>
                    {selectedCountry &&
                      City.getCitiesOfCountry(selectedCountry)?.map((c) => (
                        <option key={c.name} value={c.name}>
                          {c.name}
                        </option>
                      ))}
                  </select>
                </FormControl>
                <FormMessage className="shad-error text-red-400" />
              </FormItem>
            )}
          />

          {/* Password Field */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    {...field}
                    className="border border-gray-200 dark:border-gray-400 bg-gray-50 dark:bg-gray-600"
                  />
                </FormControl>
                <FormMessage className="shad-error text-red-400" />
              </FormItem>
            )}
          />

          {/* Confirm Password Field */}
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    {...field}
                    className="border border-gray-200 dark:border-gray-400 bg-gray-50 dark:bg-gray-600"
                  />
                </FormControl>
                <FormMessage className="shad-error text-red-400" />
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
                  <FormLabel>Upload CV (PDF or Word)</FormLabel>
                  <FormControl>
                    <Dragger
                      {...uploadProps}
                      className="mb-2 border-gray-300 rounded-md p-4"
                    >
                      <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                      </p>
                      <p className="ant-upload-text">
                        Click or drag file to this area to upload
                      </p>
                      <p className="ant-upload-hint">
                        Support for single upload. Only PDF and Word documents
                        are accepted (max 5MB).
                      </p>
                    </Dragger>
                  </FormControl>
                  <FormMessage className="shad-error text-red-400" />
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
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="border-gray-300 dark:border-gray-400"
                    />
                  </FormControl>
                  <div className="space-y-1 mt-32 leading-none">
                    <FormLabel>
                      I accept the{" "}
                      <Link
                        href="/terms"
                        className="underline text-primary-color1"
                      >
                        Terms and Conditions
                      </Link>{" "}
                      and{" "}
                      <Link
                        href="/privacy"
                        className="underline text-primary-color1"
                      >
                        Privacy Policy
                      </Link>
                    </FormLabel>
                  </div>
                </FormItem>
              )}
            />
            <FormMessage className="shad-error text-red-400" />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full md:col-span-2 text-white bg-primary-color1 hover:bg-primary-color1/90"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting
              ? "Creating account..."
              : "Create Account"}
          </Button>
        </div>

        {/* Login Link */}
        <div className="text-center text-sm md:col-span-2">
          Already have an account?{" "}
          <Link
            href="/login"
            className="underline underline-offset-4 text-primary-color1"
          >
            Login
          </Link>
        </div>
      </form>
    </Form>
  );
}
