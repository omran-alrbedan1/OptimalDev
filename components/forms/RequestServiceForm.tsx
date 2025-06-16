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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Country, City } from "country-state-city";

import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

const serviceRequestSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  company: z.string().optional(),
  industry: z.string().optional(),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  country: z.string().min(1, {
    message: "Please select a country.",
  }),
  city: z.string().min(1, {
    message: "Please select a city.",
  }),
  employees: z.string().optional(),
  facebook: z.string().optional(),
  referral: z.string().optional(),
  services: z.array(z.string()).min(1, {
    message: "Please select at least one service.",
  }),
  businessType: z.string().optional(),
  position: z.string().optional(),
  phone: z.string().min(5, {
    message: "Please enter a valid phone number.",
  }),
  website: z.string().optional(),

  projectDetails: z.string().min(10, {
    message: "Please provide more details about your project.",
  }),
  websiteDetails: z.string().optional(),
  websiteOptions: z.string().optional(),
  dynamicWebsite: z.boolean().optional(),
  seoCompatible: z.boolean().optional(),
  hostingAssistance: z.boolean().optional(),
  seoSettings: z.boolean().optional(),
  cmsTraining: z.boolean().optional(),
  siteReports: z.boolean().optional(),
  mobileCompatible: z.boolean().optional(),
  paymentGateways: z.boolean().optional(),
  sslSecurity: z.boolean().optional(),
  companyEmails: z.boolean().optional(),
  techSupport: z.boolean().optional(),
  techSupportValue: z.string().optional(),
});

const serviceOptions = [
  "Logo And Visual Identity Service",
  "Design a bill of exchange",
  "Magazine design",
  "Design a company profile of up to 8 pages",
  "A4 Letter Head design",
  "Design a Note Book",
  "Cardboard folder design",
  "Design of badges/ID cards",
  "Stamp design",
  "Roll-up design",
  "Invoice design",
  "Envelop design",
];

const websiteOptions = [
  "Dynamic website - (Arabic and/or English) (optional)",
  "Site is compatible with search engines",
  "Uploading the website to hosting and/or assistance in choosing the appropriate hosting",
  "Adjust appropriate SEO settings",
  "Administrator training on content management CM (professional control panel)",
  "Site reports",
  "Compatible with tablets and computers",
  "Payment gateways (optional)",
  "Install SSL security for the site",
  "Creating company emails on hosting",
  "Technical support for the first year (included in the price quote)",
  "The value of technical support annually",
];

export default function ServiceRequestForm() {
  const form = useForm<z.infer<typeof serviceRequestSchema>>({
    resolver: zodResolver(serviceRequestSchema),
    defaultValues: {
      name: "",
      industry: "",
      company: "",
      email: "",
      employees: "",
      facebook: "",
      referral: "",
      services: [],
      websiteOptions: "",
      businessType: "",
      position: "",
      phone: "",
      website: "",
      country: "",
      projectDetails: "",
      websiteDetails: "",
      dynamicWebsite: false,
      seoCompatible: false,
      hostingAssistance: false,
      seoSettings: false,
      cmsTraining: false,
      siteReports: false,
      mobileCompatible: false,
      paymentGateways: false,
      sslSecurity: false,
      companyEmails: false,
      techSupport: false,
      techSupportValue: "",
    },
  });
  const selectedCountry = form.watch("country");

  const handleCheckAll = (checked: boolean) => {
    if (checked) {
      form.setValue("services", serviceOptions);
    } else {
      form.setValue("services", []);
    }
  };

  const allServicesSelected =
    form.watch("services")?.length === serviceOptions.length;

  async function onSubmit(values: z.infer<typeof serviceRequestSchema>) {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Service request submitted:", values);

      toast.success("Request submitted successfully!", {
        description: "We'll get back to you soon with a quote.",
      });
    } catch (error) {
      console.error("Submission error", error);
      toast.error("Submission failed", {
        description: "An error occurred. Please try again.",
      });
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 mt-20 md:mt-24 p-4"
      >
        <div className="space-y-2">
          <h1 className="text-2xl font-bold dark:text-gray-300">
            Service Request
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Fill out the form to request our services
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="dark:text-gray-300">
                  Name/Surname{" "}
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="John Doe"
                    {...field}
                    className="border border-gray-200 dark:border-gray-500 outline-2 bg-gray-50 dark:bg-gray-600 focus:outline-primary-color1"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Industry */}
          <FormField
            control={form.control}
            name="industry"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="dark:text-gray-300">Industry</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="border border-gray-200 dark:border-gray-500 bg-gray-50 dark:bg-gray-600"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* company */}
          <FormField
            control={form.control}
            name="company"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="dark:text-gray-300">
                  Company Name
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Your Company"
                    {...field}
                    className="border border-gray-200  dark:border-gray-500 bg-gray-50 dark:bg-gray-600"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Position */}
          <FormField
            control={form.control}
            name="position"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="dark:text-gray-300">
                  Position/Role
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g. Marketing Manager"
                    {...field}
                    className="border border-gray-200  dark:border-gray-500 bg-gray-50 dark:bg-gray-600"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="dark:text-gray-300">Email </FormLabel>
                <FormControl>
                  <Input
                    placeholder="your@email.com"
                    {...field}
                    className="border border-gray-200  dark:border-gray-500 bg-gray-50 dark:bg-gray-600"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Phone */}
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="dark:text-gray-300">
                  Phone Number
                </FormLabel>
                <FormControl>
                  <PhoneInput
                    country={"us"}
                    value={field.value}
                    onChange={(phone) => field.onChange(phone)}
                    inputClass="!w-full rounded-md !border dark:!border-gray-500 !bg-gray-50 dark:!bg-gray-600 border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:!bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    containerClass="mt-1"
                  />
                </FormControl>
                <FormMessage className="shad-error text-red-400" />
              </FormItem>
            )}
          />
          {/* Number of Employees */}
          <FormField
            control={form.control}
            name="employees"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="dark:text-gray-300">
                  No. Of Employees
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g. 10"
                    {...field}
                    className="border border-gray-200  dark:border-gray-500 bg-gray-50 dark:bg-gray-600"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Facebook Page */}
          <FormField
            control={form.control}
            name="facebook"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="dark:text-gray-300">
                  Facebook Page
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="https://facebook.com/yourpage"
                    {...field}
                    className="border border-gray-200  dark:border-gray-500 bg-gray-50 dark:bg-gray-600"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-4 w-full">
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="dark:text-gray-300">Country</FormLabel>
                  <FormControl>
                    <select
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        form.resetField("city");
                      }}
                      className="flex h-10 w-full border dark:text-white border-gray-200 dark:border-gray-500 bg-gray-50 dark:bg-gray-600 rounded-md border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
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
                  <FormLabel className="dark:text-gray-300">City</FormLabel>
                  <FormControl>
                    <select
                      {...field}
                      disabled={!selectedCountry}
                      className="flex h-10 w-full border dark:text-white border-gray-200 dark:border-gray-500 bg-gray-50 dark:bg-gray-600 rounded-md border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
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
          </div>
          <FormField
            control={form.control}
            name="website"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="dark:text-gray-300">
                  Website Link
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="https://yourwebsite.com"
                    {...field}
                    className="border border-gray-200  dark:border-gray-500 bg-gray-50 dark:bg-gray-600"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="referral"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="dark:text-gray-300">
                  From Where You Hear About Us{" "}
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Write someting"
                    className="min-h-[120px] border border-gray-200 bg-gray-50 dark:bg-gray-700 dark:border-gray-600"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="projectDetails"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="dark:text-gray-300">
                  Your project details/message to us{" "}
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Please describe your project in detail..."
                    className="min-h-[120px] border border-gray-200 bg-gray-50 dark:bg-gray-700 dark:border-gray-600"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="md:col-span-2">
            <FormField
              control={form.control}
              name="services"
              render={() => (
                <FormItem>
                  <div className="mb-4 flex justify-between items-center">
                    <FormLabel className="text-base dark:text-gray-300">
                      Services Needed
                    </FormLabel>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        checked={allServicesSelected}
                        onCheckedChange={handleCheckAll}
                        id="checkAll"
                      />
                      <label
                        htmlFor="checkAll"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-gray-300"
                      >
                        Check All
                      </label>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {serviceOptions.map((service) => (
                      <FormField
                        key={service}
                        control={form.control}
                        name="services"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={service}
                              className="flex flex-row items-start space-x-3 space-y-0 dark:text-gray-300"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(service)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([
                                          ...field.value,
                                          service,
                                        ])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== service
                                          )
                                        );
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">
                                {service}
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="md:col-span-2 space-y-4">
            <h2 className="font-medium dark:text-gray-300">
              Details of your project Website
            </h2>

            <FormField
              control={form.control}
              name="websiteOptions"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      value={field.value}
                      className="grid grid-cols-1 md:grid-cols-2 gap-4"
                    >
                      {websiteOptions.map((option) => (
                        <FormItem
                          key={option}
                          className="flex items-center space-x-3 space-y-0"
                        >
                          <FormControl>
                            <RadioGroupItem value={option} />
                          </FormControl>
                          <FormLabel className="font-normal dark:text-gray-300">
                            {option}
                          </FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <Button type="submit" className="w-full text-white">
          Submit Request
        </Button>
      </form>
    </Form>
  );
}
