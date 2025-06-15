"use client";

import React, { useState } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { MdEmail, MdSubject } from "react-icons/md";
import { IoPerson } from "react-icons/io5";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";

const ContactForm = () => {
  const t = useTranslations("forms.contactForm");
  const pathname = usePathname();
  const isArabic = pathname.includes("/ar");

  const [phoneNumber, setPhoneNumber] = useState("");
  const [errors, setErrors] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const regex = {
    name: /^[a-zA-Z\u0600-\u06FF\s]+$/,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    phone: /^\+?[1-9]\d{1,14}$/,
    subject: /.+/,
    message: /.+/,
  };

  const validateForm = (formData: any) => {
    const newErrors = {
      first_name: !formData.first_name
        ? t("validation.required")
        : !regex.name.test(formData.first_name)
        ? t("fields.firstName.error")
        : "",
      last_name: !formData.last_name
        ? t("validation.required")
        : !regex.name.test(formData.last_name)
        ? t("fields.lastName.error")
        : "",
      email: !formData.email
        ? t("validation.required")
        : !regex.email.test(formData.email)
        ? t("fields.email.error")
        : "",
      phone: !phoneNumber
        ? t("validation.required")
        : !regex.phone.test(phoneNumber)
        ? t("fields.phone.error")
        : "",
      subject: !formData.subject ? t("validation.required") : "",
      message: !formData.message ? t("validation.required") : "",
    };

    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    const validationErrors = validateForm(data);
    setErrors(validationErrors);

    if (!Object.values(validationErrors).some((error) => error)) {
      data.phone = phoneNumber;
      console.log("Form Data:", data);
      // Add your form submission logic here
    }
  };

  return (
    <form
      dir={isArabic ? "rtl" : "ltr"}
      onSubmit={handleSubmit}
      className={`text-gray-700 flex flex-col gap-6 xl:pt-10 ${
        isArabic ? "text-right" : "text-left"
      }`}
    >
      {/* Name Row */}
      <div className="flex max-sm:flex-col gap-4">
        {/* First Name */}
        <div className="flex-1 relative">
          <div
            className={`flex flex-nowrap items-center gap-2 px-3 rounded-[8px] bg-white dark:bg-darkMod-400 h-12 border ${
              errors.first_name
                ? "border-red-500"
                : "border-gray-300 focus-within:border-primary-color1"
            }`}
          >
            <span className="text-primary-color1 text-xl">
              <IoPerson />
            </span>
            <input
              required
              type="text"
              name="first_name"
              placeholder={t("fields.firstName.placeholder")}
              className="dark:text-white outline-none overflow-hidden dark:bg-darkMod-400 w-full"
              dir={isArabic ? "rtl" : "ltr"}
            />
          </div>
          {errors.first_name && (
            <p className="text-red-500 text-sm mt-1">{errors.first_name}</p>
          )}
        </div>

        {/* Last Name */}
        <div className="flex-1 relative">
          <div
            className={`flex flex-nowrap items-center gap-2 px-3 rounded-[8px] bg-white dark:bg-darkMod-400 h-12 border ${
              errors.last_name
                ? "border-red-500"
                : "border-gray-300 focus-within:border-primary-color1"
            }`}
          >
            <span className="text-primary-color1 text-xl">
              <IoPerson />
            </span>
            <input
              required
              type="text"
              name="last_name"
              placeholder={t("fields.lastName.placeholder")}
              className="dark:text-white outline-none dark:bg-darkMod-400 overflow-hidden w-full"
              dir={isArabic ? "rtl" : "ltr"}
            />
          </div>
          {errors.last_name && (
            <p className="text-red-500 text-sm mt-1">{errors.last_name}</p>
          )}
        </div>
      </div>

      {/* Contact Row */}
      <div className="flex max-sm:flex-col gap-3">
        {/* Email */}
        <div className="flex-1 relative">
          <div
            className={`flex flex-nowrap items-center gap-2 px-3 rounded-[8px] bg-white dark:bg-darkMod-400 h-12 border ${
              errors.email
                ? "border-red-500"
                : "border-gray-300 focus-within:border-primary-color1"
            }`}
          >
            <span className="text-primary-color1 text-xl">
              <MdEmail />
            </span>
            <input
              required
              type="email"
              name="email"
              placeholder={t("fields.email.placeholder")}
              className="dark:text-white outline-none dark:bg-darkMod-400 overflow-hidden w-full"
              dir={isArabic ? "rtl" : "ltr"}
            />
          </div>
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        {/* Phone Number */}
        <div className="flex-1 relative">
          <div
            className={`flex flex-nowrap items-center gap-2 px-3 rounded-[8px] bg-white dark:bg-darkMod-400 h-12 border ${
              errors.phone
                ? "border-red-500"
                : "border-gray-300 focus-within:border-primary-color1"
            }`}
          >
            <PhoneInput
              international
              defaultCountry={isArabic ? "JO" : "US"}
              value={phoneNumber}
              //@ts-ignore
              onChange={setPhoneNumber}
              placeholder={t("fields.phone.placeholder")}
              className="dark:text-white outline-none overflow-hidden w-full"
              numberInputProps={{
                className:
                  "dark:bg-darkMod-400 focus:border-none focus:outline-none w-full",
                style: { outline: "none", border: "none" },
                dir: isArabic ? "rtl" : "ltr",
              }}
            />
          </div>
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
          )}
        </div>
      </div>

      {/* Subject */}
      <div className="flex-1 relative">
        <div
          className={`flex flex-nowrap items-center gap-2 px-3 rounded-[8px] bg-white dark:bg-darkMod-400 h-12 border ${
            errors.subject
              ? "border-red-500"
              : "border-gray-300 focus-within:border-primary-color1"
          }`}
        >
          <span className="text-primary-color1 text-xl">
            <MdSubject />
          </span>
          <input
            required
            type="text"
            name="subject"
            placeholder={t("fields.subject.placeholder")}
            className="dark:text-white outline-none dark:bg-darkMod-400 overflow-hidden w-full"
            dir={isArabic ? "rtl" : "ltr"}
          />
        </div>
        {errors.subject && (
          <p className="text-red-500 text-sm mt-1">{errors.subject}</p>
        )}
      </div>

      {/* Message */}
      <div className="flex-1 max-md:flex-col relative">
        <textarea
          rows={3}
          required
          className={`w-full outline-none px-4 py-2 dark:text-white dark:bg-darkMod-400 rounded-[8px] border ${
            errors.message
              ? "border-red-500"
              : "border-gray-300 focus-within:border-primary-color1"
          }`}
          placeholder={t("fields.message.placeholder")}
          name="message"
          dir={isArabic ? "rtl" : "ltr"}
        ></textarea>
        {errors.message && (
          <p className="text-red-500 text-sm mt-1">{errors.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <div className="flex-1">
        <button
          type="submit"
          className={`bg-primary-color1 ${
            isArabic ? "ml-auto" : "mr-auto"
          } max-sm:w-full w-1/4 h-11 flex justify-center items-center rounded-[8px] text-white relative overflow-hidden hover:bg-primary-color1-dark transition-colors`}
        >
          <span className="absolute inset-0 bg-primary-color2 opacity-30 rounded-[8px] hover:opacity-40 transition-opacity" />
          <span className="relative z-10">{t("submit")}</span>
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
