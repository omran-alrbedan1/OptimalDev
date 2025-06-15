import Header from "@/components/Header";
import PartnerCard from "../cards/PartnerCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "../ui/carousel";
import { getTranslations } from "next-intl/server";

const partners = [
  {
    id: 1,
    title: "FUTURE X",
    description:
      "A software development company specializing in advanced technological solutions",
    image: "/images/FUTURE X.jpg",
  },
  {
    id: 2,
    title: "FUTURE X",
    description:
      "A software development company specializing in advanced technological solutions",
    image: "/images/FUTURE X.jpg",
  },
  {
    id: 3,
    title: "FUTURE X2",
    description:
      "A software development company specializing in advanced technological solutions",
    image: "/images/FUTURE X.jpg",
  },
  {
    id: 4,
    title: "Partner 3",
    description: "Another company providing excellent services",
    image: "/images/FUTURE X.jpg",
  },
  {
    id: 5,
    title: "Partner 4",
    description: "Innovative solutions provider",
    image: "/images/FUTURE X.jpg",
  },
];

const Partners = async () => {
  const t = await getTranslations("ourPartners");
  return (
    <section className="px-5 md:px-10 lg:px-20 flex flex-col  items-center mt-12 md:mt-20">
      <Header title={t("title")} className="pb-11" />

      <div className="w-full max-w-7xl mt-16 relative">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full "
          dir="ltr"
        >
          <div className="relative">
            <CarouselContent className=" -mr-8 relative ">
              {partners.map((partner, index) => (
                <CarouselItem
                  key={partner.id}
                  className="px-8 basis-full relative sm:basis-1/2 lg:basis-1/3"
                >
                  <div className="p-1">
                    <PartnerCard partner={partner} index={index} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Navigation Arrows */}
            <CarouselPrevious className="absolute left-0 top-1/2 hover:text-primary-color1 hover:scale-125  transition-all duration-300 -translate-y-1/2 -translate-x-12 hidden md:flex" />
            <CarouselNext className="absolute right-0 top-1/2 hover:text-primary-color1 hover:scale-125  transition-all duration-300 -translate-y-1/2 translate-x-12 hidden md:flex" />
          </div>
        </Carousel>
      </div>
    </section>
  );
};

export default Partners;
