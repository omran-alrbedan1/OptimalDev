"use client";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { FormFieldType } from "@/enum";
import CustomFormField from "../inputs/CustomFormField";
import { icons } from "@/constants/icons";
const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Please enter a valid email address" }),
});

export default function SubscribeForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("Subscription successful!", {
        description: "Thank you for subscribing to our newsletter.",
      });
      form.reset();
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Subscription failed", {
        description: "Please try again later.",
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <p className="text-start mt-4 text-gray-600 dark:text-gray-300 mb-4 text-sm">
          Stay updated with our latest news and offers
        </p>
        <div className="flex flex-col sm:flex-row gap-2 w-full">
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="email"
            placeholder="your@email.com"
            iconSrc={icons.email}
            required
          />
          <Button
            type="submit"
            className=" bg-primary-color1 to-primary-color2 hover:from-primary-color1 hover:bg-primary-color1/90 text-white transition-all duration-300 shadow-lg hover:shadow-xl"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? "Subscribing..." : "Subscribe"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
