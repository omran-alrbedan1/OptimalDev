"use client";
import Header from "@/components/Header";
import PartnerCard from "../cards/PartnerCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "../ui/carousel";
import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";

const Partners = ({ partners }: { partners: Partner[] }) => {
  const t = useTranslations("ourPartners");
  console.log(partners);

  return (
    <section className="px-5 md:px-10 lg:px-20 flex flex-col items-center md:-mt-8">
      <Header title={t("title")} className="pb-11" />
      <AutoAdvancingCarousel partners={partners} />
    </section>
  );
};

const AutoAdvancingCarousel = ({ partners }: { partners: Partner[] }) => {
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!isHovered) {
      intervalRef.current = setInterval(() => {
        const nextButton = document.querySelector(
          ".carousel-next"
        ) as HTMLElement;
        if (nextButton) {
          nextButton.click();
        }
      }, 3000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isHovered]);

  return (
    <div
      className="w-full max-w-7xl -mt-8 relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
        dir="ltr"
      >
        <div className="relative">
          <CarouselContent className="-mr-8 relative">
            {partners?.map((partner, index) => (
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

          <CarouselPrevious className="absolute left-0 top-1/2 hover:text-primary-color1 hover:scale-125 transition-all duration-300 -translate-y-1/2 -translate-x-12 hidden md:flex" />
          <CarouselNext className="carousel-next absolute right-0 top-1/2 hover:text-primary-color1 hover:scale-125 transition-all duration-300 -translate-y-1/2 translate-x-12 hidden md:flex" />
        </div>
      </Carousel>
    </div>
  );
};

export default Partners;
