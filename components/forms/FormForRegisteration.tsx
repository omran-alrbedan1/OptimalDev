"use client";

import React, { useState } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { MdEmail, MdBusiness, MdLocationOn, MdNotes, MdReportProblem } from "react-icons/md";
import { IoPerson } from "react-icons/io5";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { CheckCircleIcon, Loader, XIcon } from "lucide-react";

const FormForRegisteration = ({ service_id, containerStyle }: { service_id?: number; containerStyle?: string }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [errors, setErrors] = useState({
    full_name: "",
    company_name: "",
    email: "",
    address: "",
    phone: "",
    notes: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState({
    title: "",
    description: "",
    isSuccess: false,
  });

  const regex = {
    name: /^[a-zA-Z\s]+$/,
    company: /^[a-zA-Z0-9\s&.,-]+$/,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    phone: /^\+?[1-9]\d{1,14}$/,
    address: /^[a-zA-Z0-9\s,.-]+$/,
    notes: /.+/,
  };

  const validateForm = (formData: any) => {
    const newErrors = {
      full_name: "",
      company_name: "",
      email: "",
      address: "",
      phone: "",
      notes: "",
    };

    if (!regex.name.test(formData.full_name)) {
      newErrors.full_name = "Full name must contain only letters";
    }

    if (!regex.company.test(formData.company_name)) {
      newErrors.company_name = "Invalid company name";
    }

    if (!regex.email.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!regex.address.test(formData.address)) {
      newErrors.address = "Invalid address";
    }

    if (!regex.phone.test(phoneNumber)) {
      newErrors.phone = "Invalid phone number";
    }

    if (!regex.notes.test(formData.notes)) {
      newErrors.notes = "Notes cannot be empty";
    }

    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    const validationErrors = validateForm(data);
    setErrors(validationErrors);

    const hasErrors = Object.values(validationErrors).some(
      (error) => error !== ""
    );

    if (!hasErrors) {
      setIsSubmitting(true);
      try {
        const payload = {
          ...data,
          phone: phoneNumber,
          ...(service_id && { service_id })
        };
        console.log(payload);

        const response = await axios.post('/api/registration', payload, {
          headers: {
            "Content-Type": "application/json",
            "accept": "application/json"
          }
        });
        console.log(response);

        if (response.status === 201) {
          setDialogContent({
            title: "Success!",
            description: "Your registration has been submitted successfully.",
            isSuccess: true,
          });
        } else {
          setDialogContent({
            title: "Error",
            description: response.data.message || "Failed to submit registration. Please try again.",
            isSuccess: false,
          });
        }
      } catch (error: any) {
        console.log(error);
        setDialogContent({
          title: "Error",
          description: error.message || "An unexpected error occurred. Please try again later.",
          isSuccess: false,
        });
      } finally {
        setDialogOpen(true);
        setIsSubmitting(false);
      }
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}

        className={`text-gray-700 flex flex-col gap-6 ${containerStyle}`}
      >
        <div className="flex max-sm:flex-col gap-4">
          <div className="flex-1 relative">
            <div
              className={`flex flex-nowrap items-center gap-2 px-3 rounded-[8px] bg-white dark:bg-darkMod-400 h-[50px] md:h-14 border ${errors.full_name
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
                name="full_name"
                placeholder="Your Full Name"
                className="dark:text-white outline-none overflow-hidden dark:bg-darkMod-400 w-full"
              />
            </div>
            {errors.full_name && (
              <p className="text-red-500 text-sm mt-1">{errors.full_name}</p>
            )}
          </div>

          <div className="flex-1 relative">
            <div
              className={`flex flex-nowrap items-center gap-2 px-3 rounded-[8px] bg-white dark:bg-darkMod-400  h-[50px] md:h-14 border ${errors.company_name
                ? "border-red-500"
                : "border-gray-300 focus-within:border-primary-color1"
                }`}
            >
              <span className="text-primary-color1 text-xl">
                <MdBusiness />
              </span>
              <input
                required
                type="text"
                name="company_name"
                placeholder="Your Company Name"
                className="dark:text-white outline-none overflow-hidden dark:bg-darkMod-400 w-full"
              />
            </div>
            {errors.company_name && (
              <p className="text-red-500 text-sm mt-1">{errors.company_name}</p>
            )}
          </div>
        </div>

        <div className="flex max-sm:flex-col gap-3">
          <div className="flex-1 relative">
            <div
              className={`flex flex-nowrap items-center gap-2 px-3 rounded-[8px] bg-white dark:bg-darkMod-400  h-[50px] md:h-14 border ${errors.email
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
                placeholder="Your Email"
                className="dark:text-white outline-none dark:bg-darkMod-400 overflow-hidden w-full"
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div className="flex-1 relative">
            <div
              className={`flex flex-nowrap items-center gap-2 px-3 rounded-[8px] bg-white dark:bg-darkMod-400  h-[50px] md:h-14 border ${errors.phone
                ? "border-red-500"
                : "border-gray-300 focus-within:border-primary-color1"
                }`}
            >
              <PhoneInput
                international
                defaultCountry="SY"
                value={phoneNumber}
                onChange={setPhoneNumber}
                placeholder="Your Phone Number"
                className="dark:text-white outline-none overflow-hidden w-full"
                numberInputProps={{
                  className:
                    "dark:bg-darkMod-400 focus:border-none focus:outline-none",
                  style: { outline: "none", border: "none" },
                }}
              />
            </div>
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
            )}
          </div>
        </div>

        <div className="flex-1 relative">
          <div
            className={`flex flex-nowrap items-center gap-2 px-3 rounded-[8px] bg-white dark:bg-darkMod-400  h-[50px] md:h-14 border ${errors.address
              ? "border-red-500"
              : "border-gray-300 focus-within:border-primary-color1"
              }`}
          >
            <span className="text-primary-color1 text-xl">
              <MdLocationOn />
            </span>
            <input
              required
              type="text"
              name="address"
              placeholder="Your Address"
              className="dark:text-white outline-none overflow-hidden dark:bg-darkMod-400 w-full"
            />
          </div>
          {errors.address && (
            <p className="text-red-500 text-sm mt-1">{errors.address}</p>
          )}
        </div>

        <div className="flex-1 relative">
          <div
            className={`flex items-start gap-2 px-3 py-2 rounded-[8px] bg-white dark:bg-darkMod-400 border ${errors.notes
              ? "border-red-500"
              : "border-gray-300 focus-within:border-primary-color1"
              }`}
          >
            <span className="text-primary-color1 text-xl ">
              <MdNotes />
            </span>
            <textarea
              rows={5}
              required
              className="dark:text-white outline-none dark:bg-darkMod-400 w-full resize-none"
              placeholder="Explain about your project idea"
              name="notes"
            ></textarea>
          </div>
          {errors.notes && (
            <p className="text-red-500 text-sm mt-1">{errors.notes}</p>
          )}
        </div>
        <div className="flex justify-start items-center flex-1">
          <Button
            type="submit"
            className="text-lg tracking-wider bg-primary-color1 hover:bg-primary-hover w-full md:w-1/4 max-sm:w-full  h-[50px] md:h-14 flex justify-center items-center rounded-[8px] relative"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="absolute text-white flex justify-center items-center gap-3"><span className="loader"></span>Submit</span>
            ) : (
              <span className="text-white absolute">Submit</span>
            )}
 
          </Button>
        </div>
      </form>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent
          className={`dark:bg-darkMod-600 bg-white  rounded-[20px] sm:rounded-xl lg:rounded-[10px] p-8 shadow-lg w-[350px] sm:w-[400px] lg:w-[450px]`}
        >
          <button
            onClick={() => setDialogOpen(false)}
            className="absolute top-4 right-4 z-10 text-gray-500 hover:text-gray-700 dark:text-gray-300 hover:dark:text-gray-400 transition-colors"
          >
            <XIcon className="w-6 h-6" />
          </button>
          <div className="flex flex-col items-center justify-center space-y-4">
            {/* Checkmark Icon */}
            <div
              className={`w-16 h-16 rounded-full flex items-center justify-center ${dialogContent.isSuccess ? "bg-green-500 text-white" : "bg-red-500 text-white"
                }`}
            >
              {dialogContent.isSuccess ? <CheckCircleIcon className="w-8 h-8" /> : <MdReportProblem className="w-8 h-8" />}
            </div>


            <DialogTitle
              className={`text-xl font-semibold ${dialogContent.isSuccess ? "text-green-600" : "text-red-600"
                }`}
            >
              {dialogContent.title}

            </DialogTitle>

            {/* Description */}
            <DialogDescription className="text-gray-600 dark:text-gray-300 text-center">
              {dialogContent.description}
            </DialogDescription>
          </div>


        </DialogContent>
      </Dialog>
    </>
  );
};

export default FormForRegisteration;