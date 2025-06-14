import CustomButton from "@/components/buttons/CustomButton";
import { images } from "@/constants/images";
import Image from "next/image";
import { FiMapPin, FiBriefcase } from "react-icons/fi";
import { TbFileDescription } from "react-icons/tb";
import { HiAcademicCap } from "react-icons/hi2";
import { BiSolidCertification } from "react-icons/bi";
import { RiContractFill } from "react-icons/ri";
import { GrMoney } from "react-icons/gr";
import { MdWork, MdCastForEducation } from "react-icons/md";
import { GiSkills } from "react-icons/gi";

const JobDetailsPage = () => {
  const job = {
    title: "Front End Developer",
    company: "FUTUREX ",
    industry: "Software Development",
    location: "Amman, Jordan",
    status: "Apply Now",
    image: "",
    description: [
      "We're looking for a skilled Front End Developer to join our growing team at FUTUREX Technologies.",
      "You'll be responsible for building responsive and accessible user interfaces using modern web technologies.",
      "The ideal candidate will have 2+ years of experience with React.js and a passion for creating exceptional user experiences.",
    ],
    qualifications: [
      "Bachelor's degree in Computer Science, Software Engineering, or related field",
      "Strong understanding of data structures and algorithms",
      "Minimum GPA of 3.0/4.0 or equivalent",
      "Knowledge of web development fundamentals",
    ],
    certifications: [
      "React Certification (optional)",
      "JavaScript Developer Certification",
      "Google Mobile Web Specialist (preferred)",
      "AWS Certified Developer (plus)",
    ],
    courses: [
      "Advanced React Patterns",
      "Modern JavaScript (ES6+)",
      "Responsive Web Design",
      "Web Performance Optimization",
      "Progressive Web Apps",
    ],
    salary: "1,200 - 1,800",
    contractType: "Full-time",
    workMode: "Remote",
    educationLevel: "B.Sc. in Computer Science",
    duties: [
      "Develop responsive user interfaces using React.js",
      "Build reusable components and front-end libraries",
      "Optimize applications for performance and accessibility",
      "Collaborate with UX designers and backend developers",
      "Implement automated testing and CI/CD pipelines",
    ],
    personalSkills: [
      "Strong problem-solving abilities",
      "Excellent communication skills",
      "Attention to detail",
      "Ability to work in agile teams",
      "Time management skills",
    ],
    softwareSkills: [
      "Visual Studio Code",
      "Git/GitHub",
      "Chrome DevTools",
      "Figma (basic)",
      "JIRA/Asana",
    ],
    technicalSkills: [
      "React.js (Hooks, Context API)",
      "JavaScript (ES6+)",
      "HTML5/CSS3",
      "Redux/State Management",
      "RESTful APIs",
      "CSS Preprocessors (SASS)",
    ],
    experienceLevel: "Mid-level (2-4 years)",
    yearsOfExperience: "2+ years in frontend development",
    preferredCandidate: [
      "Experience with TypeScript",
      "Knowledge of testing frameworks (Jest, Cypress)",
      "Familiarity with backend technologies (Node.js)",
      "Understanding of CI/CD pipelines",
    ],
    languages: ["English (Professional)", "Arabic (Native)"],
    otherRequirements: [
      "Portfolio or GitHub profile showcasing projects",
      "Availability to start within 2 weeks",
      "Willingness to learn new technologies",
    ],
    address: "FUTUREX Tower, 5th Circle, Al-Jeel Al-Jadeed St., Amman, Jordan",
  };

  return (
    <div className="max-w-7xl mx-auto mt-24 px-4 sm:px-6 lg:px-8 py-8">
      {/* Job Header */}
      <div className="mb-6 md:mb-10">
        <div className="flex flex-col md:flex-row justify-between items-start gap-4 md:gap-6">
          <div className="flex flex-col xs:flex-row items-start gap-3 xs:gap-4 w-full">
            {/* Company Logo */}
            <div className="flex-shrink-0 mx-auto xs:mx-0">
              {job.image ? (
                <div className="rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                  <Image
                    src={job.image}
                    height={80}
                    width={80}
                    alt={job.title}
                    className="size-16 md:size-20 object-cover"
                  />
                </div>
              ) : (
                <div className="rounded-lg overflow-hidden  p-2">
                  <Image
                    src={images.jobOpportinuty}
                    height={80}
                    width={80}
                    alt={job.title}
                    className="size-16 md:size-20 object-contain"
                  />
                </div>
              )}
            </div>

            {/* Job Info */}
            <div className="flex-1 w-full text-center xs:text-left">
              <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-1">
                {job.title}
              </h1>
              <h2 className="text-lg md:text-xl text-blue-700 dark:text-blue-500 font-medium mb-3">
                {job.company}
              </h2>
              <div className="flex flex-wrap justify-center xs:justify-start items-center gap-2">
                <span className="flex items-center gap-1.5 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full text-xs md:text-sm">
                  <FiBriefcase className="text-gray-700 dark:text-gray-300 size-3" />
                  <span className="text-gray-700 dark:text-gray-300">
                    {job.industry}
                  </span>
                </span>
                <span className="flex items-center gap-1.5 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full text-xs md:text-sm">
                  <FiMapPin className="text-gray-700 dark:text-gray-300 size-3" />
                  <span className="text-gray-700 dark:text-gray-300">
                    {job.location}
                  </span>
                </span>
              </div>
            </div>
          </div>

          {/* Apply Button - Now positioned better on mobile */}
          <div className="w-full xs:w-auto mt-4 xs:mt-0 flex justify-center xs:block">
            <CustomButton
              content={job.status}
              onClick={() => console.log("Apply button clicked")}
            />
          </div>
        </div>
      </div>

      {/* Main Content - Two Columns */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Column */}
        <div className="lg:w-2/3 space-y-8">
          {/* Job Description */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <TbFileDescription className="text-primary-color1 dark:text-blue-600 size-6" />
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                Job Description
              </h3>
            </div>
            <ul className="space-y-3 pl-2 border-l-2 border-blue-200 dark:border-blue-800 pl-4">
              {job.description.map((item, index) => (
                <li
                  key={index}
                  className="text-gray-600 dark:text-gray-300 leading-relaxed"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Duties and Responsibilities */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <MdWork className="text-primary-color1 dark:text-blue-600 size-6" />
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                Duties and Responsibilities
              </h3>
            </div>
            <ul className="space-y-3 pl-2 border-l-2 border-blue-200 dark:border-blue-800 pl-4">
              {job.duties.map((duty, index) => (
                <li
                  key={index}
                  className="text-gray-600 dark:text-gray-300 flex items-start"
                >
                  <span className="text-blue-500 dark:text-blue-400 mr-2">
                    •
                  </span>
                  {duty}
                </li>
              ))}
            </ul>
          </div>

          {/* Qualifications */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <HiAcademicCap className="text-primary-color1 dark:text-blue-600 size-6" />
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                Academic Qualifications
              </h3>
            </div>
            <ul className="space-y-3 pl-2 border-l-2 border-blue-200 dark:border-blue-800 pl-4">
              {job.qualifications.map((item, index) => (
                <li
                  key={index}
                  className="text-gray-600 dark:text-gray-300 flex items-start"
                >
                  <span className="text-blue-500 dark:text-blue-400 mr-2">
                    •
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Skills */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <GiSkills className="text-primary-color1 dark:text-blue-600 size-6" />
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                Skills
              </h3>
            </div>
            <div className="space-y-5 pl-2 border-l-2 border-blue-200 dark:border-blue-800 pl-4">
              <div>
                <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Personal Skills
                </h4>
                <div className="flex flex-wrap gap-2">
                  {job.personalSkills.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 px-3 py-1.5 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Technical Skills
                </h4>
                <div className="flex flex-wrap gap-2">
                  {job.technicalSkills.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400 px-3 py-1.5 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:w-1/3 space-y-8">
          {/* Job Details */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <RiContractFill className="text-primary-color1 dark:text-blue-600 size-6" />
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                Job Details
              </h3>
            </div>
            <div className="space-y-4  border-l-2 border-blue-200 dark:border-blue-800 pl-4">
              <div>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  Salary
                </p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {job.salary} $
                </p>
              </div>
              <div>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  Contract Type
                </p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {job.contractType}
                </p>
              </div>
              <div>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  Work Mode
                </p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {job.workMode}
                </p>
              </div>
              <div>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  Education Level
                </p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {job.educationLevel}
                </p>
              </div>
            </div>
          </div>

          {/* Requirements */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <BiSolidCertification className="text-primary-color1 dark:text-blue-600 size-6" />
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                Requirements
              </h3>
            </div>
            <div className="space-y-4 pl-2 border-l-2 border-blue-200 dark:border-blue-800 pl-4">
              <div>
                <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Preferred Candidate
                </h4>
                <ul className="space-y-2">
                  {job.preferredCandidate.map((item, index) => (
                    <li
                      key={index}
                      className="text-gray-600 dark:text-gray-300 flex items-start"
                    >
                      <span className="text-blue-500 dark:text-blue-400 mr-2">
                        •
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Languages
                </h4>
                <div className="flex flex-wrap gap-2">
                  {job.languages.map((lang, index) => (
                    <span
                      key={index}
                      className="bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-400 px-3 py-1.5 rounded-full text-sm"
                    >
                      {lang}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Quick Facts */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <GrMoney className="text-primary-color1 dark:text-blue-600 size-6" />
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                Quick Facts
              </h3>
            </div>
            <div className="space-y-4 pl-2 border-l-2 border-blue-200 dark:border-blue-800 pl-4">
              <div>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  Experience Level
                </p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {job.experienceLevel}
                </p>
              </div>
              <div>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  Years of Experience
                </p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {job.yearsOfExperience}
                </p>
              </div>
              <div>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  Address
                </p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {job.address}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailsPage;
