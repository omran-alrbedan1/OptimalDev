//@ts-nocheck
"use client";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Country, City } from "country-state-city";
import { Upload, message } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { useState } from "react";

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
          <h1 className="text-2xl font-bold">Create an account</h1>
          <p className="w-full text-sm text-gray-600 dark:text-gray-300">
            Enter your details below to create your account
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 md:gap-8">
          {/* Name Field */}
          <div className="grid gap-2">
            <Label htmlFor="name">First Name</Label>
            <Input
              id="name"
              placeholder="John"
              {...form.register("name")}
              className=" border border-gray-200 dark:border-gray-400 bg-gray-50 dark:bg-gray-600"
            />
            {form.formState.errors.name && (
              <p className="text-sm text-red-500">
                {form.formState.errors.name.message}
              </p>
            )}
          </div>

          {/* Surname Field */}
          <div className="grid gap-2">
            <Label htmlFor="surname">Surname</Label>
            <Input
              id="surname"
              placeholder="Doe"
              {...form.register("surname")}
              className=" border border-gray-200 dark:border-gray-400 bg-gray-50 dark:bg-gray-600"
            />
            {form.formState.errors.surname && (
              <p className="text-sm text-red-500">
                {form.formState.errors.surname.message}
              </p>
            )}
          </div>

          {/* Phone Field */}
          <div className="grid gap-2 md:col-span-2">
            <Label htmlFor="phone">Phone Number</Label>
            <PhoneInput
              country={"us"}
              value={form.watch("phone")}
              onChange={(phone) => form.setValue("phone", phone)}
              inputClass=" !w-full rounded-md !border dark:!border-gray-400 !bg-gray-50 dark:!bg-gray-600  border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              containerClass="mt-1"
            />
            {form.formState.errors.phone && (
              <p className="text-sm text-red-500">
                {form.formState.errors.phone.message}
              </p>
            )}
          </div>

          {/* Country Field */}
          <div className="grid gap-2">
            <Label htmlFor="country">Country</Label>
            <select
              id="country"
              {...form.register("country", {
                onChange: () => form.resetField("city"),
              })}
              className="flex h-10 w-full rounded-md  border border-gray-200 dark:border-gray-400 bg-gray-50 dark:bg-gray-600 bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="">Select Country</option>
              {Country.getAllCountries().map((c) => (
                <option key={c.isoCode} value={c.isoCode}>
                  {c.name}
                </option>
              ))}
            </select>
            {form.formState.errors.country && (
              <p className="text-sm text-red-500">
                {form.formState.errors.country.message}
              </p>
            )}
          </div>

          {/* City Field - Always visible */}
          <div className="grid gap-2">
            <Label htmlFor="city">City</Label>
            <select
              id="city"
              {...form.register("city")}
              disabled={!selectedCountry}
              className="flex h-10 w-full  border border-gray-200 dark:border-gray-400 bg-gray-50 dark:bg-gray-600 rounded-md  border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="">Select City</option>
              {selectedCountry &&
                City.getCitiesOfCountry(selectedCountry)?.map((c) => (
                  <option key={c.name} value={c.name}>
                    {c.name}
                  </option>
                ))}
            </select>
            {form.formState.errors.city && (
              <p className="text-sm text-red-500">
                {form.formState.errors.city.message}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              {...form.register("password")}
              className=" border border-gray-200 dark:border-gray-400 bg-gray-50 dark:bg-gray-600"
            />
            {form.formState.errors.password && (
              <p className="text-sm text-red-500">
                {form.formState.errors.password.message}
              </p>
            )}
          </div>

          {/* Confirm Password Field */}
          <div className="grid gap-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="••••••••"
              {...form.register("confirmPassword")}
              className=" border border-gray-200 dark:border-gray-400 bg-gray-50 dark:bg-gray-600"
            />
            {form.formState.errors.confirmPassword && (
              <p className="text-sm text-red-500">
                {form.formState.errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* CV Field - Using Ant Design Upload */}
          <div className="grid gap-2 md:col-span-2">
            <Label>Upload CV (PDF or Word)</Label>
            <Dragger
              {...uploadProps}
              className=" mb-2 border-gray-300 rounded-md p-4"
            >
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">
                Click or drag file to this area to upload
              </p>
              <p className="ant-upload-hint">
                Support for single upload. Only PDF and Word documents are
                accepted (max 5MB).
              </p>
            </Dragger>
            {form.formState.errors.cv && (
              <p className="text-sm text-red-500">
                {form.formState.errors.cv.message}
              </p>
            )}
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
