import ServiceCard from "@/components/cards/ServiceCard";
import Header from "@/components/Header";
import { icons } from "@/constants/icons";
import Link from "next/link";

type Service = {
  id: number;
  title: string;
  description: string;
  icon: string;
};

const services: Service[] = [
  {
    id: 1,
    title: "Talent Acquisition",
    description:
      "We find the perfect talent that aligns with your company's vision and culture.",
    icon: icons.questions,
  },
  {
    id: 2,
    title: "HR Consulting",
    description:
      "Strategic HR solutions to optimize your workforce and drive business growth.",
    icon: icons.briefcase,
  },
  {
    id: 3,
    title: "Employee Development",
    description:
      "Transform your team's potential with customized training programs.",
    icon: icons.training,
  },
  {
    id: 4,
    title: "Skills Assessment",
    description:
      "Data-driven evaluations to ensure candidates meet your needs.",
    icon: icons.skills,
  },
  {
    id: 5,
    title: "Staff Outsourcing",
    description: "Flexible staffing solutions without long-term commitments.",
    icon: icons.team,
  },
  {
    id: 6,
    title: "Employer Branding",
    description: "Build a magnetic employer brand that attracts top talent.",
    icon: icons.star,
  },
];

export default async function Services() {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return (
    <section className="flex flex-col items-center mt-10 px-5 sm:px-10 md:px-16 mx-auto mb-16 md:mb-20">
      <Header
        title="Our Services"
        paragraph="Optimal Path connects the right talent with the right opportunities."
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-10 sm:gap-y-10 justify-items-center mx-auto mt-10 w-full">
        {services.map((service, index) => (
          <ServiceCard key={service.id} service={service} index={index} />
        ))}
      </div>
      <button
        type="button"
        className="mt-14 sm:mt-16 w-36 h-12 md:w-40 md:h-14 text-lg rounded-[30px] text-primary-color1 
        border-primary-color1 border hover:bg-primary-color1 hover:border-none hover:text-white 
        font-semibold hover:opacity-75  transition-all duration-500"
      >
        <Link href="/">See more &gt;&gt;</Link>
      </button>
    </section>
  );
}
