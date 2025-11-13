"use client";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { FormFieldType } from "@/enum";
import CustomFormField from "../inputs/CustomFormField";
import { icons } from "@/constants/icons";
import { subscribeFormShema } from "@/lib/validation/userValidation";

export default function SubscribeForm() {
  const t = useTranslations("forms.subscribeForm");
  const form = useForm<z.infer<typeof subscribeFormShema>>({
    resolver: zodResolver(subscribeFormShema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof subscribeFormShema>) {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success(t("success.title"), {
        description: t("success.description"),
      });
      form.reset();
    } catch (error) {
      console.error("Form submission error", error);
      toast.error(t("error.title"), {
        description: t("error.description"),
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <p className="text-start mt-4 text-gray-600 dark:text-gray-300 mb-4 text-sm">
          {t("description")}
        </p>
        <div className="flex flex-col sm:flex-row gap-2 w-full">
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="email"
            placeholder={t("emailPlaceholder")}
            iconSrc={icons.email}
            required
          />
          <Button
            type="submit"
            className="bg-primary-color1 to-primary-color2 hover:from-primary-color1 hover:bg-primary-color1/90 text-white transition-all duration-300 shadow-lg hover:shadow-xl"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? t("submitting") : t("subscribe")}
          </Button>
        </div>
      </form>
    </Form>
  );
}
