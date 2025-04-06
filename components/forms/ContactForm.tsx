
"use client";

import React, { useState } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { MdEmail } from "react-icons/md";
import { IoPerson } from "react-icons/io5";

const ContactForm = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [errors, setErrors] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    message: "",
  });

  const regex = {
    name: /^[a-zA-Z\s]+$/,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    phone: /^\+?[1-9]\d{1,14}$/,
    message: /.+/,
  };

  const validateForm = (formData: any) => {
    const newErrors = {
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      message: "",
    };

    if (!regex.name.test(formData.first_name)) {
      newErrors.first_name = "First name must contain only letters";
    }

    if (!regex.name.test(formData.last_name)) {
      newErrors.last_name = "Last name must contain only letters";
    }

    if (!regex.email.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!regex.phone.test(phoneNumber)) {
      newErrors.phone = "Invalid phone number";
    }

    if (!regex.message.test(formData.message)) {
      newErrors.message = "Message cannot be empty";
    }

    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    
    const validationErrors = validateForm(data);
    setErrors(validationErrors);

    // Check if there are any errors
    const hasErrors = Object.values(validationErrors).some(error => error !== "");
    
    if (!hasErrors) {
      // Submit the form if no errors
      data.phone = phoneNumber;
      console.log("Form Data:", data);
      console.log("Form is valid. Submitting...");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="text-gray-700 flex flex-col gap-6   xl:pt-10"
    >
      {/* First Name */}
      <div className="flex max-sm:flex-col gap-4">
        <div className="flex-1 relative">
          <div
            className={`flex flex-nowrap items-center gap-2 px-3 rounded-[8px] bg-white dark:bg-darkMod-400  h-12 border ${
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
              className="dark:text-white outline-none overflow-hidden dark:bg-darkMod-400"
            />
          </div>
          {errors.first_name && (
            <p className="text-red-500 text-sm mt-1">{errors.first_name}</p>
          )}
        </div>

        {/* Last Name */}
        <div className="flex-1 relative">
          <div
            className={`flex flex-nowrap items-center gap-2 px-3 rounded-[8px] bg-white dark:bg-darkMod-400  h-12 border ${
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
              className=" dark:text-white outline-none dark:bg-darkMod-400 overflow-hidden"
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
            className={`flex flex-nowrap items-center gap-2 px-3 rounded-[8px] bg-white dark:bg-darkMod-400  h-12 border ${
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
              className="dark:text-white outline-none dark:bg-darkMod-400 overflow-hidden "
            />
          </div>
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        {/* Phone Number */}
        <div className=" flex-1 relative">
          <div
            className={`flex flex-nowrap items-center gap-2 px-3 rounded-[8px] bg-white dark:bg-darkMod-400  h-12 border ${
              errors.phone
                ? "border-red-500"
                : "border-gray-300 focus-within:border-primary-color1"
            }`}
          >
            <PhoneInput
              international
              defaultCountry="SY"
              value={phoneNumber}
              onChange={setPhoneNumber}
              placeholder="Enter phone number"
              className="dark:text-white outline-none overflow-hidden"
              numberInputProps={{
                className: "dark:bg-darkMod-400 focus:border-none focus:outline-none",
                style: { outline: "none", border: "none" } // Fallback for stubborn styles
              }}
            />
          </div>
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
          )}
        </div>
      </div>

      {/* Message */}
      <div className="flex-1 max-md:flex-col relative">
        <textarea
          rows={3}
          required
          className={`w-full outline-none px-4 py-2  dark:text-white dark:bg-darkMod-400 rounded-[8px] border ${
            errors.message
              ? "border-red-500"
              : "border-gray-300 focus-within:border-primary-color1"
          }`}
          placeholder="Your message here"
          name="message"
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