"use client";
import { images } from "@/constants/images";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

const ServiceDetailsPage = () => {
  const { id } = useParams();

  const service = {
    title: "Premium Web Design Service",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Temporibus adipisci, vel a fugiat quae iste est? Perferendis dolores qui iste cumque, ratione, facilis, mollitia tempore unde atque incidunt libero adipisci. Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati voluptate provident quae repudiandae. Earum quo, nostrum, iusto blanditiis dicta ullam quas aut natus molestias et libero doloribus ipsam dolor ducimus.",
    image: images.service,
    price: "$999",
  };

  return (
    <div className="min-h-screen mt-20 py-12 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden transition-colors duration-300">
          <div className="md:flex">
            {/* Service Image */}
            <div className="md:w-1/2 relative h-96 md:h-auto">
              <Image
                src={service.image}
                alt={service.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            {/* Service Details */}
            <div className="md:w-1/2 p-8 md:p-10">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                {service.title}
              </h1>

              {/* Price and Delivery */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-end gap-3">
                  <span className="text-2xl font-bold text-primary-color1 dark:text-primary-color2">
                    {service.price}
                  </span>
                </div>
              </div>

              {/* Description */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
                  Service Description
                </h2>
                <p className="text-gray-600 dark:text-gray-300 whitespace-pre-line">
                  {service.description}
                </p>
              </div>

              {/* Request Button */}
              <Link
                href={`/services/${id}/request-service`}
                className="block w-full bg-primary-color1 hover:bg-primary-color1/90  text-white text-center font-bold py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-[1.02]"
              >
                Request This Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailsPage;
