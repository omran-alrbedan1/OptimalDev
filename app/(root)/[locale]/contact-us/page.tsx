"use client";
import { useEffect, useState } from "react";
import { MdEmail, MdLocationOn } from "react-icons/md";
import Loader from "@/components/Loader";
import ContactForm from "@/components/forms/ContactForm";
import { Smartphone } from "lucide-react";
import { fetchContactInfo, fetchOrganization } from "@/lib/client-action";

const ContactUsPage = () => {
  const [contactInfo, setContactInfo] = useState<any>(null);
  const [organization, setOrganization] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    Promise.all([fetchContactInfo(), fetchOrganization()])
      .then(([contactData, orgData]) => {
        setContactInfo(contactData);
        setOrganization(orgData);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="min-h-[90vh] overflow-y-auto relative">
      {/* Background Overlay */}
      <img
        src="/images/building.jpg"
        alt="building"
        className="absolute w-full h-full object-cover md:object-fill"
      />
      <div className="absolute w-full h-full bg-darkMod-700 opacity-70" />

      {/* Content Section */}
      <div className="relative w-full h-full z-10 max-md:pt-28 md:pt-32 flex justify-center items-center flex-col pb-10">
        <div className="flex flex-col items-center justify-center text-center p-3 sm:p-6">
          <h1
            className="text-2xl sm:text-3xl md:text-4xl text-white mb-6 font-bold"
            style={{ letterSpacing: "4px" }}
          >
            {contactInfo?.title}
          </h1>

          {/* Text Content */}
          {contactInfo?.text && (
            <div className="text-gray-200 text-[15px] md:text-lg mb-6 max-w-4xl max-sm:font-light">
              {contactInfo?.text}
            </div>
          )}
        </div>

        <div className="px-5 sm:pl-10 lg:pl-0 -mt-8 max-lg:gap-10 flex mx-auto max-w-full justify-start items-start lg:justify-evenly lg:items-center w-full max-lg:flex-col">
          <div className="flex flex-col justify-start lg:justify-center items-start lg:items-center max-lg:w-full lg:basis-[470px]">
            <div className="flex flex-col gap-y-3 lg:gap-y-5">
              {/* Location */}
              <div className="flex items-center gap-4">
                <span className="max-xs:w-8 max-xs:h-8 w-9 h-9 rounded-full text-primary-color1 bg-white-100 text-xl flex justify-center items-center max-xs:mt-1 mt-2">
                  <MdLocationOn />
                </span>
                {organization?.location && (
                  <p className="text-white text-sm sm:text-lg flex flex-col">
                    <span>{organization.location}</span>
                  </p>
                )}
              </div>

              {/* Phone 1 */}
              <div className="flex items-center gap-4">
                <span className="max-xs:w-8 max-xs:h-8 w-9 h-9 rounded-full text-primary-color1 bg-white-100 text-lg flex justify-center items-center mt-2 max-xs:mt-1">
                  <Smartphone />
                </span>
                {organization?.phone_1 && (
                  <a
                    href={`tel:${organization.phone_1}`}
                    className="text-white text-sm sm:text-lg hover:text-primary-color1 transition-colors"
                  >
                    <span>{organization.phone_1}</span>
                  </a>
                )}
              </div>

              {/* Phone 2 */}
              {organization?.phone_2 && (
                <div className="flex items-center gap-4">
                  <span className="max-xs:w-8 max-xs:h-8 w-9 h-9 rounded-full text-primary-color1 bg-white-100 text-lg flex justify-center items-center mt-2 max-xs:mt-1">
                    <Smartphone />
                  </span>
                  <a
                    href={`tel:${organization.phone_2}`}
                    className="text-white text-sm sm:text-lg hover:text-primary-color1 transition-colors"
                  >
                    <span>{organization.phone_2}</span>
                  </a>
                </div>
              )}

              {/* Phone 3 */}
              {organization?.phone_3 && (
                <div className="flex items-center gap-4">
                  <span className="max-xs:w-8 max-xs:h-8 w-9 h-9 rounded-full text-primary-color1 bg-white-100 text-lg flex justify-center items-center mt-2 max-xs:mt-1">
                    <Smartphone />
                  </span>
                  <a
                    href={`tel:${organization.phone_3}`}
                    className="text-white text-sm sm:text-lg hover:text-primary-color1 transition-colors"
                  >
                    <span>{organization.phone_3}</span>
                  </a>
                </div>
              )}

              {/* Email */}
              <div className="flex items-center gap-4">
                <span className="max-xs:w-8 max-xs:h-8 w-9 h-9 rounded-full text-primary-color1 bg-white-100 text-xl flex justify-center items-center mt-3 max-xs:mt-1">
                  <MdEmail />
                </span>
                {organization?.email && (
                  <a
                    href={`mailto:${organization.email}`}
                    className="text-white text-sm sm:text-lg hover:text-primary-color1 transition-colors"
                  >
                    <span>{organization.email}</span>
                  </a>
                )}
              </div>
            </div>
          </div>
          <div className="w-full overflow-hidden lg:w-1/2 xl:pt-8 lg:pt-16">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Page() {
  return <ContactUsPage />;
}
