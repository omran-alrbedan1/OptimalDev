//@ts-nocheck
"use client";
import Loader from "@/components/Loader";
import { JobApplicationModal } from "@/components/modal/JobApplicationModal";
import { images } from "@/constants/images";
import { useAppSelector } from "@/hooks/hook";
import { applyForJob, fetchJobDetails } from "@/lib/client-action";
import { Button } from "antd";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BiSolidCertification } from "react-icons/bi";
import { FiBriefcase, FiMapPin } from "react-icons/fi";
import { GiSkills } from "react-icons/gi";
import { MdWork } from "react-icons/md";
import { RiContractFill } from "react-icons/ri";
import { TbFileDescription } from "react-icons/tb";

// Updated Job type interface to match the actual data
interface Job {
  id: number;
  title: string;
  description: string;
  duties_responsibilities: string[];
  technical_skills: string | null;
  salary_min: string;
  salary_max: string;
  published_at: string;
  expires_at: string;
  type: string;
  years_experience: string;
  preferred_candidate: string | null;
  other_requirements: string[];
  address: string;
  applicants_count: number;
  applied: boolean;
  application_status: string;
  company: {
    id: number;
    name: string;
    description: string;
    address: string;
    logo: string | null;
    email: string;
    phone: string;
  };
  work_sector: {
    id: number;
    name: string;
  };
  country: {
    id: number;
    name: string;
  };
  city: {
    id: number;
    name: string;
  };
  contract_types: Array<{
    id: number;
    name: string;
  }>;
  work_modes: Array<{
    id: number;
    name: string;
  }>;
  experience_levels: Array<{
    id: number;
    name: string;
  }>;
  education_levels: Array<{
    id: number;
    name: string;
  }>;
  image: string;
}

const JobDetailsPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isApplying, setIsApplying] = useState(false);
  const [modalType, setModalType] = useState<"success" | "error" | "tests">(
    "success"
  );
  const locale = useLocale();
  const [requiredTests, setRequiredTests] = useState<any[]>([]);
  const [modalMessage, setModalMessage] = useState<any>("");
  const [modalVisible, setModalVisible] = useState(false);
  const pathname = usePathname();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const router = useRouter();
  const [jobId, setJobId] = useState<string | null>(null);

  const t = useTranslations("jobDetailsPage");
  const tt = useTranslations("careerPage.jobCard");

  // Resolve params promise
  useEffect(() => {
    const resolveParams = async () => {
      try {
        const resolvedParams = await params;
        setJobId(resolvedParams.id);
      } catch (error) {
        console.error("Error resolving params:", error);
        setError("Failed to load job details");
        setLoading(false);
      }
    };

    resolveParams();
  }, [params]);

  const applyToJob = async () => {
    if (!isAuthenticated || !jobId) {
      router.push(
        `/login?jobId=${jobId}&callbackUrl=${encodeURIComponent(pathname)}`
      );
      return;
    }

    // Check if already applied
    if (job?.applied) {
      setModalType("success");
      setModalMessage("You have already applied for this job");
      setModalVisible(true);
      return;
    }

    setIsApplying(true);
    try {
      const response = await applyForJob(Number(jobId));

      // Check if response exists and has the expected structure
      if (response && typeof response === "object") {
        if (
          typeof response.message === "string" &&
          (response.message.includes("يرجى إكمال الاختبارات المطلوبة أولاً") ||
            response.message.includes(
              "Please complete the required tests first"
            ))
        ) {
          setModalType("tests");
          setModalMessage(response.message);
          // Safely access required_tests with optional chaining and provide fallback
          setRequiredTests(response.required_tests || []);
        } else {
          setModalType("success");
          setModalMessage(
            response.message || "Application submitted successfully"
          );
          // Update job applied status
          if (job) {
            setJob({
              ...job,
              applied: true,
              application_status: "applied",
              applicants_count: job.applicants_count + 1,
            });
          }
        }
      } else {
        // Handle case where response is undefined or not an object
        setModalType("success");
        setModalMessage("Application submitted successfully");
        if (job) {
          setJob({
            ...job,
            applied: true,
            application_status: "applied",
            applicants_count: job.applicants_count + 1,
          });
        }
      }
      setModalVisible(true);
    } catch (error: any) {
      console.log(error.message);
      setModalType("error");
      setModalMessage(error.message || "An error occurred while applying");
      setModalVisible(true);
    } finally {
      setIsApplying(false);
    }
  };

  useEffect(() => {
    if (!jobId) return;

    const getJobDetails = async () => {
      try {
        const response = await fetchJobDetails(Number(jobId));
        setJob(response);
      } catch (err) {
        setError(t("error"));
      } finally {
        setLoading(false);
      }
    };

    getJobDetails();
  }, [jobId, t]);

  // Safe function to split skills
  const splitSkills = (skills: string | null): string[] => {
    if (!skills) return [];
    return skills
      .split(",")
      .map((skill) => skill.trim())
      .filter((skill) => skill.length > 0);
  };

  // Safe function to render array data
  const renderArrayData = (
    data: any[] | null | undefined,
    fallbackText: string = "Not specified"
  ) => {
    if (!data || data.length === 0) {
      return (
        <span className="text-gray-500 dark:text-gray-400 text-sm">
          {fallbackText}
        </span>
      );
    }
    return (
      <div className="flex flex-wrap gap-2">
        {data.map((item, index) => (
          <span
            key={index}
            className="bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 px-3 py-1.5 rounded-full text-sm"
          >
            {item.name}
          </span>
        ))}
      </div>
    );
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto mt-24 flex  items-center justify-center flex-col px-4 sm:px-6 lg:px-8 py-8">
        <Image
          src={images.serverError}
          height={300}
          width={300}
          alt="server error"
        />
        <div className=" text-primary px-4 py-3 rounded">{error}</div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="max-w-7xl mx-auto mt-24 px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded">
          {t("jobNotFound")}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto mt-24 px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6 md:mb-10">
        <div className="flex flex-col md:flex-row justify-between items-start gap-4 md:gap-6">
          <div
            className={`flex flex-col xs:flex-row items-start gap-3 xs:gap-4 w-full`}
          >
            <div className="flex-shrink-0 mx-auto xs:mx-0">
              {job.company.logo ? (
                <div className="rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                  <Image
                    src={job.company.logo}
                    height={80}
                    width={80}
                    alt={job.title}
                    className="size-16 md:size-20 object-cover"
                  />
                </div>
              ) : (
                <div className="rounded-lg overflow-hidden p-2">
                  <Image
                    src={images.favicon}
                    height={80}
                    width={80}
                    alt={job.title}
                    className="size-16 md:size-20 object-contain"
                  />
                </div>
              )}
            </div>

            <div
              className={`flex-1 w-full text-center ${
                locale === "ar" ? "xs:text-right" : "xs:text-left"
              }`}
            >
              <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-1">
                {job.title}
              </h1>
              <h2 className="text-lg md:text-xl text-blue-700 dark:text-blue-500 font-medium mb-3">
                {job.company.name}
              </h2>
              <div
                className={`flex flex-wrap xs:justify-start justify-center items-center gap-2`}
              >
                <span className="flex items-center gap-1.5 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full text-xs md:text-sm">
                  <FiBriefcase className="text-gray-700 dark:text-gray-300 size-3" />
                  <span className="text-gray-700 dark:text-gray-300">
                    {job.work_sector.name}
                  </span>
                </span>
                <span className="flex items-center gap-1.5 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full text-xs md:text-sm">
                  <FiMapPin className="text-gray-700 dark:text-gray-300 size-3" />
                  <span className="text-gray-700 dark:text-gray-300">
                    {job.city.name}, {job.country.name}
                  </span>
                </span>
                {job.applied && (
                  <span className="flex items-center gap-1.5 bg-green-100 dark:bg-green-900/20 px-3 py-1 rounded-full text-xs md:text-sm">
                    <span className="text-green-700 dark:text-green-400 font-medium">
                      ✓ {t("applied") || "Applied"}
                    </span>
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="w-full xs:w-auto mt-4 xs:mt-0 flex justify-center xs:block">
            <Button
              type={job.applied ? "default" : "primary"}
              size="large"
              loading={isApplying}
              className={`!px-5 !py-4 rounded-[4px] ${
                job.applied ? "!bg-green-500 !border-green-500 !text-white" : ""
              }`}
              onClick={applyToJob}
              disabled={job.applied}
            >
              {isApplying ? (
                <span className="flex items-center justify-center gap-2">
                  {tt("applying")}
                </span>
              ) : job.applied ? (
                "✓ " + (t("alreadyApplied") || "Applied")
              ) : !isAuthenticated ? (
                tt("loginToApply")
              ) : (
                tt("applyNow")
              )}
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3 space-y-12 max-sm:space-y-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <TbFileDescription className="text-primary-color1 dark:text-blue-600 size-6" />
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                {t("jobDescription")}
              </h3>
            </div>
            <div
              className={`border-blue-200 dark:border-blue-800 ${
                locale === "ar" ? "border-r-2 pr-2" : "border-l-2 pl-2"
              }`}
            >
              <div
                className="text-gray-600 dark:text-gray-300 leading-relaxed"
                dangerouslySetInnerHTML={{
                  __html: job.description || "",
                }}
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <RiContractFill className="text-primary-color1 dark:text-blue-600 size-6" />
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                {t("jobDetails")}
              </h3>
            </div>
            <div className="space-y-3">
              <DetailItem
                label={t("salaryRange")}
                value={`$${job.salary_min} - $${job.salary_max}`}
              />
              <DetailItem
                label={t("publishedDate")}
                value={new Date(job.published_at).toLocaleDateString()}
              />
              <DetailItem
                label={t("expirationDate")}
                value={new Date(job.expires_at).toLocaleDateString()}
              />
              <DetailItem label={t("jobType")} value={job.type} capitalize />
              <DetailItem
                label={t("yearsExperience")}
                value={`${job.years_experience} years`}
              />
              <DetailItem
                label={t("applicantsCount")}
                value={job.applicants_count.toString()}
              />
              <DetailItem label={t("address")} value={job.address} />
            </div>
          </div>
        </div>

        <div className="lg:w-1/3 space-y-8">
          {/* Contract Types */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <RiContractFill className="text-primary-color1 dark:text-blue-600 size-6" />
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                {t("contractTypes") || "Contract Types"}
              </h3>
            </div>
            <div
              className={`border-blue-200 dark:border-blue-800 ${
                locale === "ar" ? "border-r-2 pr-2" : "border-l-2 pl-2"
              }`}
            >
              {renderArrayData(job.contract_types)}
            </div>
          </div>

          {/* Work Modes */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <MdWork className="text-primary-color1 dark:text-blue-600 size-6" />
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                {t("workModes") || "Work Modes"}
              </h3>
            </div>
            <div
              className={`border-blue-200 dark:border-blue-800 ${
                locale === "ar" ? "border-r-2 pr-2" : "border-l-2 pl-2"
              }`}
            >
              {renderArrayData(job.work_modes)}
            </div>
          </div>

          {/* Experience Levels */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <BiSolidCertification className="text-primary-color1 dark:text-blue-600 size-6" />
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                {t("experienceLevels") || "Experience Levels"}
              </h3>
            </div>
            <div
              className={`border-blue-200 dark:border-blue-800 ${
                locale === "ar" ? "border-r-2 pr-2" : "border-l-2 pl-2"
              }`}
            >
              {renderArrayData(job.experience_levels)}
            </div>
          </div>

          {/* Education Levels */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <BiSolidCertification className="text-primary-color1 dark:text-blue-600 size-6" />
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                {t("educationLevels") || "Education Levels"}
              </h3>
            </div>
            <div
              className={`border-blue-200 dark:border-blue-800 ${
                locale === "ar" ? "border-r-2 pr-2" : "border-l-2 pl-2"
              }`}
            >
              {renderArrayData(job.education_levels)}
            </div>
          </div>

          {/* Technical Skills */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <GiSkills className="text-primary-color1 dark:text-blue-600 size-6" />
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                {t("technicalSkills")}
              </h3>
            </div>
            <div
              className={`border-blue-200 dark:border-blue-800 ${
                locale === "ar" ? "border-r-2 pr-2" : "border-l-2 pl-2"
              }`}
            >
              <div className="flex flex-wrap gap-2">
                {splitSkills(job.technical_skills).map((skill, index) => (
                  <span
                    key={index}
                    className="bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400 px-3 py-1.5 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
                {splitSkills(job.technical_skills).length === 0 && (
                  <span className="text-gray-500 dark:text-gray-400 text-sm">
                    No technical skills specified
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Preferred Candidate */}
          {job.preferred_candidate && (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <BiSolidCertification className="text-primary-color1 dark:text-blue-600 size-6" />
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                  {t("preferredCandidate")}
                </h3>
              </div>
              <div
                className={`border-blue-200 dark:border-blue-800 ${
                  locale === "ar" ? "border-r-2 pr-2" : "border-l-2 pl-2"
                }`}
              >
                <p className="text-gray-600 dark:text-gray-300">
                  {job.preferred_candidate}
                </p>
              </div>
            </div>
          )}

          {/* Company Information */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <FiBriefcase className="text-primary-color1 dark:text-blue-600 size-6" />
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                {t("companyInformation")}
              </h3>
            </div>
            <div
              className={`space-y-4 border-blue-200 dark:border-blue-800 ${
                locale === "ar" ? "border-r-2 pr-3" : "border-l-2 pl-3"
              }`}
            >
              <div>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  {t("address")}
                </p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {job.company.address}
                </p>
              </div>
              <div>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  {t("email")}
                </p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {job.company.email}
                </p>
              </div>
              <div>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  {t("phone")}
                </p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {job.company.phone}
                </p>
              </div>
              {job.company.description && (
                <div>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    {t("companyDescription") || "Company Description"}
                  </p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {job.company.description}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <JobApplicationModal
        visible={modalVisible}
        type={modalType}
        message={modalMessage}
        job={{
          id: job.id,
          title: job.title,
          company: job.company.name,
        }}
        requiredTests={requiredTests}
        onClose={() => setModalVisible(false)}
        locale={locale}
      />
    </div>
  );
};

export default JobDetailsPage;

const DetailItem = ({
  label,
  value,
  capitalize = false,
}: {
  label: string;
  value: string;
  capitalize?: boolean;
}) => (
  <div className="flex gap-4">
    <p className="text-gray-500 dark:text-gray-400 min-w-[140px]">{label}:</p>
    <p
      className={`font-medium text-gray-600 dark:text-gray-200 ${
        capitalize ? "capitalize" : ""
      }`}
    >
      {value}
    </p>
  </div>
);
