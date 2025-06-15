"use client";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginFormSchema } from "@/lib/validation/userValidation";

export default function LoginForm() {
  const searchParams = useSearchParams();
  const jobId = searchParams.get("jobId");

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof loginFormSchema>) {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Replace with actual login logic
      console.log("Login values:", values);

      toast.success("Login successful!", {
        description: "You have been logged in successfully.",
      });
    } catch (error) {
      console.error("Login error", error);
      toast.error("Login failed", {
        description: "Invalid email or password. Please try again.",
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
          <h1 className="text-2xl font-bold">Login to your account</h1>
          <p className="w-full text-sm text-gray-600 dark:text-gray-300">
            Enter your email below to login to your account
          </p>
        </div>

        <div className="grid gap-6">
          {/* Email Field */}
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              {...form.register("email")}
            />
            {form.formState.errors.email && (
              <p className="text-sm text-red-500">
                {form.formState.errors.email.message}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              <Link
                href="/forget_password"
                className="ml-auto text-sm hover:text-primary-color1"
              >
                Forgot your password?
              </Link>
            </div>
            <Input
              id="password"
              type="password"
              placeholder="••••••"
              {...form.register("password")}
            />
            {form.formState.errors.password && (
              <p className="text-sm text-red-500">
                {form.formState.errors.password.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full text-white bg-primary-color1 hover:bg-primary-color1/90"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? "Logging in..." : "Login"}
          </Button>
        </div>

        {/* Sign Up Link */}
        <div className="text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link
            href={`/register?jobId=${jobId}`}
            className="underline underline-offset-4 text-primary-color1"
          >
            Sign up
          </Link>
        </div>
      </form>
    </Form>
  );
}
