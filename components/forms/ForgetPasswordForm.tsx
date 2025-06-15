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
import { forgotPasswordSchema } from "@/lib/validation/userValidation";

export default function ForgotPasswordForm() {
  const form = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof forgotPasswordSchema>) {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("Reset link sent", {
        description:
          "If an account exists with this email, you'll receive a password reset link.",
      });
    } catch (error) {
      console.error("Error sending reset link", error);
      toast.error("Failed to send reset link", {
        description:
          "An error occurred while trying to send the reset link. Please try again.",
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
          <h1 className="text-2xl font-bold">Forgot your password?</h1>
          <p className="w-full text-sm text-gray-600 dark:text-gray-300">
            Enter your email and we will send you a link to reset your password
          </p>
        </div>

        <div className="grid gap-6">
          {/* Email Field */}
          <div className="grid gap-2">
            <Label htmlFor="email">
              Email
              <span className="text-red-400 text-2xl ml-1">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              {...form.register("email")}
              className="border border-primary-color1"
            />
            {form.formState.errors.email && (
              <p className="text-sm text-red-500">
                {form.formState.errors.email.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full text-white bg-primary-color1 hover:bg-primary-color1/90"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? "Sending..." : "Send reset link"}
          </Button>

          {/* Back to login link */}
          <div className="text-center text-sm">
            <Link href="/login" className="text-primary-color1 hover:underline">
              Back to login
            </Link>
          </div>
        </div>
      </form>
    </Form>
  );
}
