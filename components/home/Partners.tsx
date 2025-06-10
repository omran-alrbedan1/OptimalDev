import Header from "@/components/Header";
import PartnerCard from "../cards/PartnerCard";

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
    title: "FUTURE X",
    description:
      "A software development company specializing in advanced technological solutions",
    image: "/images/FUTURE X.jpg",
  },
];

const Partners = async () => {
  return (
    <section className="px-5 md:px-10 lg:px-20 flex flex-col items-center mt-12 md:mt-20">
      <Header title="Our Partners" className="pb-11" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 gap-y-16 w-full max-w-6xl">
        {partners.map((partner, index) => (
          <PartnerCard key={partner.id} partner={partner} index={index} />
        ))}
      </div>
    </section>
  );
};

export default Partners;
