"use client";
import { motion } from "framer-motion";


const Hero = ({
  name,
  bio,
  image,
  position,
}: {
  name: string;
  bio: string;
  image: string;
  position: string;
}) => {
  
  return (
    <section className={`relative w-full h-screen  mx-auto pt-20 sm:pt-40`}>
      <div
        className={`max-w-7xl mx-auto sm:px-10 px-6 flex flex-row max-xs:flex-col-reverse items-start gap-5`}
      >
        <div className="w-1/2 max-xs:w-full flex items-start gap-5">
          <div className="flex flex-col justify-center items-center mt-5">
            <div className="w-5 h-5 rounded-full bg-primary-color1" />
            <div className="w-1 sm:h-80 h-40 violet-gradient" />
          </div>

          <div>
            <h1
              className={`font-black lg:text-[35px] sm:text-[30px] xs:text-[26px] text-[23px] lg:leading-[98px] mt-2 `}
            >
              Hi, I'm{" "}
              <span className="text-primary-color1 dark:text-secondary">
                {name}
              </span>
            </h1>
            <p
              className={`text-gray-500 dark:text-gray-300 font-medium lg:text-[21px] sm:text-[19px] xs:text-[17px] text-[15px] lg:leading-[40px] mt-2`}
            >
              {bio}
            </p>
            <div>
              <button>contact me</button>
              <button>show my cv</button>
            </div>
            <div>
              <span>facebook</span>
              <span>github</span>
              <span>facebook</span>
              <span>facebook</span>
              <span>facebook</span>
            </div>
          </div>
        </div>
        <div className="w-1/2 max-xs:w-full max-xs:p-10">
          <div className="flex flex-col items-center justify-center gap-8">
            <img
              src={`https://main.hivetech.space/storage/${image}`}
              alt="profilePhoto"
              width={350}
              height={350}
              className="rounded-full"
            />
            <p className="text-center text-2xl text-gray-500 dark:text-gray-300 tracking-widest font-semibold max-xs:text-[18px]">
              {position}
            </p>
          </div>
        </div>
      </div>

      <div className="absolute max-xs:hidden xs:bottom-10 bottom-32 w-full flex justify-center items-center">
        <a href="#about" className="">
          <div className="w-[35px] h-[64px] rounded-3xl border-4 border-primary-color1 flex justify-center items-start p-2">
            <motion.div
              animate={{
                y: [0, 24, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className="w-3 h-3 rounded-full bg-primary-color1 mb-1"
            />
          </div>
        </a>
        <div id="about"></div>
      </div>
    </section>
  );
};

export default Hero;
