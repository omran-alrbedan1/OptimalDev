import Image from "next/image";

const error = () => {
  return (
    <div className="flex flex-col items-center h-screen justify-center">
      <Image
        src={"/images/page-not-found.png"}
        width={400}
        height={500}
        className="h-[50vh]"
        alt="not_found_page"
      />
      <p className="text-[30px] font-bold tracking-widest md:text-[40px] text-gray-600 dark:text-gray-300">
        Page Not Found{" "}
      </p>
    </div>
  );
};

export default error;
