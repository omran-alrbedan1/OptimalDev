"use client";

import React, { useState } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { MdEmail } from "react-icons/md";
import { IoPerson } from "react-icons/io5";

const ContactForm = () => {
  const [phoneNumber, setPhoneNumber] = useState(""); // Phone number state
  const [errors, setErrors] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    message: "",
  });

  // Regular expressions for validation
  const regex = {
    name: /^[a-zA-Z\s]+$/, // Only letters and spaces
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Valid email format
    phone: /^\+?[1-9]\d{1,14}$/, // International phone number format
    message: /.+/, // At least one character
  };

  const handleChange = (value: any) => {
    setPhoneNumber(value);

    // Validate phone number
    if (!regex.phone.test(value)) {
      setErrors((prev) => ({ ...prev, phone: "Invalid phone number" }));
    } else {
      setErrors((prev) => ({ ...prev, phone: "" }));
    }
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    // Validate based on input name
    switch (name) {
      case "first_name":
        if (!regex.name.test(value)) {
          setErrors((prev) => ({
            ...prev,
            first_name: "First name must contain only letters",
          }));
        } else {
          setErrors((prev) => ({ ...prev, first_name: "" }));
        }
        break;
      case "last_name":
        if (!regex.name.test(value)) {
          setErrors((prev) => ({
            ...prev,
            last_name: "Last name must contain only letters",
          }));
        } else {
          setErrors((prev) => ({ ...prev, last_name: "" }));
        }
        break;
      case "email":
        if (!regex.email.test(value)) {
          setErrors((prev) => ({
            ...prev,
            email: "Invalid email format",
          }));
        } else {
          setErrors((prev) => ({ ...prev, email: "" }));
        }
        break;
      case "message":
        if (!regex.message.test(value)) {
          setErrors((prev) => ({
            ...prev,
            message: "Message cannot be empty",
          }));
        } else {
          setErrors((prev) => ({ ...prev, message: "" }));
        }
        break;
      default:
        break;
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Get form data
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    // Add phone number to form data
    data.phone = phoneNumber;

    // Log all form values
    console.log("Form Data:", data);

    // Validate required fields
    if (
      !data.first_name ||
      !data.last_name ||
      !data.email ||
      !data.phone ||
      !data.message
    ) {
      console.error("All fields are required!");
      return;
    }

    // Additional validation (e.g., email format)
    if (!regex.email.test(data.email as string)) {
      console.error("Invalid email format!");
      return;
    }

    // If everything is valid, proceed with form submission
    console.log("Form is valid. Submitting...");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="text-gray-700 flex flex-col gap-6 max-xs:px-6 px-10 xl:pt-10"
    >
      {/* First Name */}
      <div className="flex max-sm:flex-col gap-4">
        <div className="flex-1 relative">
          <div
            className={`flex flex-nowrap items-center gap-2 px-3 rounded-[8px] bg-white dark:bg-darkMod-700 max-xs:h-10 h-12 border ${
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
              placeholder="First Name"
              onBlur={handleBlur}
              className="dark:text-white outline-none "
            />
          </div>
          {errors.first_name && (
            <p className="text-red-500 text-sm mt-1">{errors.first_name}</p>
          )}
        </div>

        {/* Last Name */}
        <div className="flex-1 relative">
          <div
            className={`flex flex-nowrap items-center gap-2 px-3 rounded-[8px] bg-white dark:bg-darkMod-700 max-xs:h-10 h-12 border ${
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
              placeholder="Last Name"
              onBlur={handleBlur}
              className=" dark:text-white outline-none "
            />
          </div>
          {errors.last_name && (
            <p className="text-red-500 text-sm mt-1">{errors.last_name}</p>
          )}
        </div>
      </div>

      {/* Email */}
      <div className="flex max-sm:flex-col gap-3">
        <div className="flex-1 relative">
          <div
            className={`flex flex-nowrap items-center gap-2 px-3 rounded-[8px] bg-white dark:bg-darkMod-700 max-xs:h-10 h-12 border ${
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
              placeholder="Email"
              onBlur={handleBlur}
              className="dark:text-white outline-none "
            />
          </div>
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        {/* Phone Number */}
        <div className=" flex-1 relative">
          <div
            className={`flex flex-nowrap items-center gap-2 px-3 rounded-[8px] bg-white dark:bg-darkMod-700 max-xs:h-10 h-12 border ${
              errors.phone
                ? "border-red-500"
                : "border-gray-300 focus-within:border-primary-color1"
            }`}
          >
            <PhoneInput
              international
              defaultCountry="SY"
              value={phoneNumber} // Controlled value
              onChange={handleChange} // Let TypeScript infer the type
              placeholder="Enter phone number"
              className="dark:text-white outline-none text-gray-400"
            />
          </div>
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
          )}
        </div>
      </div>

      {/* Message */}
      <div
        className={`flex-1 max-md:flex-col relative ${
          errors.message
            ? ""
            : "border-gray-300 focus-within:border-primary-color1"
        }`}
      >
        <textarea
          rows={3}
          required
          className={`w-full outline-none px-4 py-2  dark:text-white rounded-[8px] border ${
            errors.message
              ? "border-red-500"
              : "border-gray-300 focus-within:border-primary-color1"
          }`}
          placeholder="Your message here"
          name="message"
          onBlur={handleBlur}
        ></textarea>
        {errors.message && (
          <p className="text-red-500 text-sm mt-1">{errors.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <div className="flex-1">
        <button
          type="submit"
          className="bg-primary-color1 max-sm:w-full w-1/4 h-11 flex justify-center items-center rounded-[8px] relative"
        >
          <span className="absolute h-full w-full bg-primary-color2 opacity-30 rounded-[8px]" />
          <span className="absolute text-white">Submit</span>
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
