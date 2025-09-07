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

const JobDetailsPage = ({ params }: { params: { id: string } }) => {
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isApplying, setIsApplying] = useState(false);
  const [modalType, setModalType] = useState<"success" | "error" | "tests">(
    "success"
  );
  const locale = useLocale();
  const [requiredTests, setRequiredTests] = useState<any[]>([]);
  const [modalMessage, setModalMessage] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const pathname = usePathname();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const router = useRouter();

  const t = useTranslations("jobDetailsPage");
  const tt = useTranslations("careerPage.jobCard");

  const applyToJob = async () => {
    if (!isAuthenticated) {
      router.push(
        `/login?jobId=${params.id}&callbackUrl=${encodeURIComponent(pathname)}`
      );
      return;
    }
    setIsApplying(true);
    try {
      const response = await applyForJob(Number(params.id));
      if (
        typeof response.message === "string" &&
        (response.message.includes("يرجى إكمال الاختبارات المطلوبة أولاً") ||
          response.message.includes("Please complete the required tests first"))
      ) {
        setModalType("tests");
        setModalMessage(response.message);
        setRequiredTests(response.required_tests);
      } else {
        setModalType("success");
        setModalMessage(
          response.message || "Application submitted successfully"
        );
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
    const getJobDetails = async () => {
      try {
        const response = await fetchJobDetails(Number(params.id));
        setJob(response);
      } catch (err) {
        setError(t("error"));
      } finally {
        setLoading(false);
      }
    };

    getJobDetails();
  }, [params.id, t]);

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

  const splitSkills = (skills: string) => {
    return skills.split(",").map((skill) => skill.trim());
  };
  return (
    <div className="max-w-7xl mx-auto mt-24 px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6 md:mb-10">
        <div className="flex flex-col md:flex-row justify-between items-start gap-4 md:gap-6">
          <div
            className={`flex flex-col xs:flex-row items-start gap-3 xs:gap-4 w-full `}
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
                useLocale() === "ar" ? "xs:text-right" : "xs:text-left"
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
              </div>
            </div>
          </div>

          <div className="w-full xs:w-auto mt-4 xs:mt-0 flex justify-center xs:block ">
            <Button
              type="primary"
              size="large"
              loading={isApplying}
              className={`!px-5 !py-4 rounded-[4px]`}
              onClick={applyToJob}
            >
              {isApplying ? (
                <span className="flex items-center justify-center gap-2">
                  {tt("applying")}
                </span>
              ) : isAuthenticated ? (
                tt("applyNow")
              ) : (
                tt("loginToApply")
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
              className={`  border-blue-200 dark:border-blue-800 ${
                useLocale() === "ar" ? "border-r-2 pr-2" : "border-l-2 pl-2"
              }`}
            >
              <div
                className="text-gray-600 dark:text-gray-300 leading-relaxed"
                dangerouslySetInnerHTML={{
                  __html: job?.description || "",
                }}
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <MdWork className="text-primary-color1 dark:text-blue-600 size-6" />
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                {t("dutiesResponsibilities")}
              </h3>
            </div>
            <div
              className={`  border-blue-200 dark:border-blue-800 ${
                useLocale() === "ar" ? "border-r-2 pr-2" : "border-l-2 pl-2"
              }`}
            >
              <p className="text-gray-600 dark:text-gray-300">
                {job.duties_responsibilities}
              </p>
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
            </div>
          </div>
        </div>

        <div className="lg:w-1/3 space-y-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <GiSkills className="text-primary-color1 dark:text-blue-600 size-6" />
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                {t("technicalSkills")}
              </h3>
            </div>
            <div
              className={`  border-blue-200 dark:border-blue-800 ${
                useLocale() === "ar" ? "border-r-2 pr-2" : "border-l-2 pl-2"
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
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <BiSolidCertification className="text-primary-color1 dark:text-blue-600 size-6" />
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                {t("requirements")}
              </h3>
            </div>
            <div
              className={` space-y-4 border-blue-200 dark:border-blue-800 ${
                useLocale() === "ar" ? "border-r-2 pr-3" : "border-l-2 pl-3"
              }`}
            >
              <div>
                <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t("yearsExperience")}
                </h4>
                <p className="text-gray-600 dark:text-gray-300">
                  {job.years_experience} years
                </p>
              </div>

              {job.preferred_candidate && (
                <div>
                  <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t("preferredCandidate")}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    {job.preferred_candidate}
                  </p>
                </div>
              )}

              <div>
                <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t("otherRequirements")}
                </h4>
                <p className="text-gray-600 dark:text-gray-300">
                  {job.other_requirements}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <FiBriefcase className="text-primary-color1 dark:text-blue-600 size-6" />
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                {t("companyInformation")}
              </h3>
            </div>
            <div
              className={` space-y-4 border-blue-200 dark:border-blue-800 ${
                useLocale() === "ar" ? "border-r-2 pr-3" : "border-l-2 pl-3"
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
    <p className="text-gray-500 dark:text-gray-400">{label} : </p>
    <p
      className={`font-medium text-gray-600 dark:text-gray-200 ${
        capitalize ? "capitalize" : ""
      }`}
    >
      {value}
    </p>
  </div>
);
