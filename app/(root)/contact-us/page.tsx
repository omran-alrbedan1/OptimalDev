import Header from "@/components/Header";
import Loader from "@/components/Loader";
import { AboutUsProps } from "@/types";
import axios from "axios";
import { Suspense } from "react";
import { FaAddressBook, FaPhone } from "react-icons/fa";
import { MdEmail, MdLocationOn } from "react-icons/md";

const ContactUsPage = async () => {
  // Fetch data from the backend
  const response = await axios.get(
    "https://main.hivetech.space/api/contact-us",
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const about_us = response.data.data;

  // Filter data by type
  const text = about_us.find((item:AboutUsProps) => item.type === "text"); // Use .find() instead of .filter()
  const email = about_us.find((item:AboutUsProps) => item.type === "email");
  const phone = about_us.find((item:AboutUsProps) => item.type === "phone");
  const address = about_us.find((item:AboutUsProps) => item.type === "address");

  return (
    <div className="h-screen relative">
      {/* Background Overlay */}
      <div className="absolute w-full h-full bg-primary-color2 opacity-60 z-10" />
      <img
        src="/images/building.jpg"
        alt="building"
        className="absolute w-full h-full object-cover"
      />

      {/* Content Section */}
      <div className="absolute w-full h-full z-20 pt-28 flex justify-center items-center flex-col">
        <div className="flex flex-col items-center justify-center text-center p-6">
          <h1
            className="text-5xl text-white mb-6 font-bold"
            style={{ letterSpacing: "4px" }}
          >
            Contact Us
          </h1>

          {/* Text Content */}
          {text && (
            <div
              className="text-gray-100 text-lg mb-6 max-w-4xl"
              dangerouslySetInnerHTML={{ __html: text.content }}
            />
          )}
        </div>

        {/* Address */}

        <div className="flex justify-evenly items-center w-full">
          <div>
            <div className="flex gap-3">
                <span className="w-8 h-8 rounded-full text-primary-color1 bg-white-100 text-xl flex justify-center items-center"><MdLocationOn /></span>
                {/* <FaAddressBook /> */}
              {address && (
                <p className="text-white text-lg mb-4 flex flex-col">
                  <span className="font-bold">Address:</span> <span>{address.content}</span>
                </p>
              )}
            </div>
            <div className="flex gap-3">
            <span className="w-8 h-8 rounded-full text-primary-color1 bg-white-100 text-xl flex justify-center items-center"><FaPhone /></span>
              {phone && (
                <p className="text-white text-lg mb-4  flex flex-col">
                  <span className="font-bold">Phone:</span> <span>{phone.content}</span>
                </p>
              )}
            </div>
            <div className="flex gap-3">
            <span className="w-8 h-8 rounded-full text-primary-color1 bg-white-100 text-xl flex justify-center items-center"><MdEmail /></span>
              {email && (
                <p className="text-white text-lg  flex flex-col">
                  <span className="font-bold">Email:</span><span> {email.content}</span>
                </p>
              )}
            </div>
          </div>
          <div>Card</div>
        </div>

     
      </div>
    </div>
  );
};

export default function Page() {
  return (
    <Suspense fallback={<Loader />}>
      <ContactUsPage />
    </Suspense>
  );
}
