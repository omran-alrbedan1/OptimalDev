//@ts-nocheck
"use client";
import { useAppSelector } from "@/hooks/hook";
import { applyForJob } from "@/lib/client-action";
import { Button, Dropdown, MenuProps } from "antd";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useMemo } from "react";
import { FiBriefcase, FiClock, FiMapPin, FiShare2 } from "react-icons/fi";
import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";
import { toast } from "sonner";
import { JobApplicationModal } from "@/components/modal/JobApplicationModal";

const JobCard = ({ job }: { job: any }) => {
  const t = useTranslations("careerPage.jobCard");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isApplying, setIsApplying] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState<"success" | "error" | "tests">(
    "success"
  );
  const [modalMessage, setModalMessage] = useState("");
  const [requiredTests, setRequiredTests] = useState<any[]>([]);
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  // Fixed job URL construction
  const jobUrl = useMemo(() => {
    // Check if window is defined (client-side)
    if (typeof window !== "undefined") {
      return `${window.location.origin}/${locale}/career/${job.id}`;
    }
    // Fallback for server-side rendering
    return `/${locale}/career/${job.id}`;
  }, [locale, job.id]);

  const shareTitle = `${t("checkOutJob")}: ${job.title} ${t("at")} ${
    job.company
  }`;

  const applyToJob = async () => {
    if (!isAuthenticated) {
      router.push(
        `/login?jobId=${job.id}&callbackUrl=${encodeURIComponent(pathname)}`
      );
      return;
    }
    setIsApplying(true);
    try {
      const response = await applyForJob(Number(job.id));
      console.log(response);
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

  const handleCopyLink = () => {
    navigator.clipboard.writeText(jobUrl);
    toast.success(t("linkCopied"), {
      duration: 2000,
    });
  };

  const items: MenuProps["items"] = [
    {
      key: "facebook",
      label: (
        <FacebookShareButton url={jobUrl} quote={shareTitle}>
          <div className={`flex items-center gap-2 px-2 py-1 `}>
            <FacebookIcon size={24} round />
            <span>{t("facebook")}</span>
          </div>
        </FacebookShareButton>
      ),
    },
    {
      key: "linkedin",
      label: (
        <LinkedinShareButton
          url={jobUrl}
          title={job.title}
          summary={job.description}
          source={typeof window !== "undefined" ? window.location.hostname : ""}
        >
          <div className={`flex items-center gap-2 px-2 py-1`}>
            <LinkedinIcon size={24} round />
            <span>{t("linkedin")}</span>
          </div>
        </LinkedinShareButton>
      ),
    },
    {
      key: "whatsapp",
      label: (
        <WhatsappShareButton url={jobUrl} title={shareTitle}>
          <div className={`flex items-center gap-2 px-2 py-1 `}>
            <WhatsappIcon size={24} round />
            <span>{t("whatsapp")}</span>
          </div>
        </WhatsappShareButton>
      ),
    },
    {
      key: "copy",
      label: (
        <button
          onClick={handleCopyLink}
          className={`flex items-center gap-2 px-2 py-1 w-full `}
        >
          <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center">
            <FiShare2 className="text-gray-600 text-sm" />
          </div>
          <span>{t("copyLink")}</span>
        </button>
      ),
    },
  ];

  const getWorkModeColor = (mode: string) => {
    switch (mode) {
      case "Remote":
        return "bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400";
      case "Hybrid":
        return "bg-yellow-50 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400";
      default:
        return "bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300";
    }
  };

  return (
    <>
      <div
        className={`bg-white dark:bg-gray-800 min-h-[18rem] sm:min-h-[20rem] rounded-lg md:rounded-xl shadow-sm p-4 md:p-6 hover:shadow-md transition-all duration-300 border border-gray-100 dark:border-gray-700 flex flex-col `}
      >
        <div className={`flex items-start gap-3 md:gap-4 flex-1 `}>
          <Link href={`/${locale}/career/${job.id}`} className="pb-10">
            <div className="bg-gray-100 dark:bg-gray-700 p-2 md:p-3 rounded-lg flex items-center justify-center">
              {job.image ? (
                <Image
                  src={job.image}
                  height={32}
                  width={32}
                  alt={job.title}
                  className="size-6 md:size-8"
                />
              ) : (
                <FiBriefcase className="text-lg md:text-xl text-gray-600 dark:text-gray-300 size-6 md:size-8" />
              )}
            </div>
          </Link>

          <div className="flex-1 flex flex-col h-full">
            <Link href={`/${locale}/career/${job.id}`} className="pb-10">
              <div className={`flex flex-col `}>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base md:text-lg lg:text-xl font-bold text-gray-800 dark:text-white line-clamp-1">
                      {job.title}
                    </h3>
                    <span className="font-semibold text-xs md:text-sm text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 p-1 px-2 rounded-full self-start sm:self-auto mt-1 sm:mt-0">
                      {job.salary}
                    </span>
                  </div>
                  <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300 mt-0 md:mt-1 line-clamp-1">
                    {job.company} • {job.city}, {job.country}
                  </p>
                </div>
              </div>

              <div className={`flex flex-wrap gap-1.5 md:gap-2 my-2 md:my-3 `}>
                <span className="bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 px-2 py-0.5 md:px-3 md:py-1 rounded-full text-xs md:text-sm flex items-center gap-1">
                  <FiBriefcase className="text-[10px] md:text-xs" />
                  {job.type_of_contract}
                </span>
                <span
                  className={`${getWorkModeColor(
                    job.work_mode
                  )} px-2 py-0.5 md:px-3 md:py-1 rounded-full text-xs md:text-sm flex items-center gap-1`}
                >
                  <FiMapPin className="text-[10px] md:text-xs" />{" "}
                  {job.work_mode}
                </span>
                <span className="bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 px-2 py-0.5 md:px-3 md:py-1 rounded-full text-xs md:text-sm line-clamp-1">
                  {t("industry")}: {job.industry}
                </span>
              </div>

              <p className="text-xs md:text-sm text-gray-700 dark:text-gray-300 my-2 md:my-3 line-clamp-2 md:line-clamp-3">
                {job.description}
              </p>
            </Link>

            <div className="mt-auto pt-2 md:pt-3 border-t border-gray-100 dark:border-gray-700">
              <div
                className={`flex flex-col xs:flex-row xs:justify-between xs:items-center gap-2`}
              >
                <Link
                  href={`/${locale}/career/${job.id}`}
                  className="inline-flex"
                >
                  <span className="text-sm md:font-medium md:text-md text-gray-500 dark:text-gray-400 flex items-center gap-1">
                    <FiClock className="text-[10px] md:text-lg" /> {job.posted}
                  </span>
                </Link>
                <div className={`flex gap-2 w-full xs:w-auto `}>
                  <Button
                    type="primary"
                    size="small"
                    loading={isApplying}
                    className={`!px-3 md:!px-4 !rounded-[5px] !py-3 md:!py-3.5 !text-xs md:!text-sm !font-medium flex-1 xs:flex-none text-center dark:bg-blue-600 dark:hover:bg-blue-700 `}
                    onClick={applyToJob}
                  >
                    {isApplying ? (
                      <span className="flex items-center justify-center gap-2">
                        {t("applying")}
                      </span>
                    ) : isAuthenticated ? (
                      t("applyNow")
                    ) : (
                      t("loginToApply")
                    )}
                  </Button>
                  <Dropdown
                    menu={{ items }}
                    placement={locale === "ar" ? "bottomRight" : "bottomLeft"}
                    trigger={["click"]}
                    overlayClassName="share-dropdown"
                  >
                    <Button
                      size="small"
                      className="!px-3 !py-2 md:!py-3.5 !text-xs md:!text-sm !font-medium !rounded-lg !flex items-center justify-center !bg-gray-50 dark:!bg-gray-700 hover:!bg-gray-200 dark:hover:!bg-gray-600 !border-none"
                    >
                      <FiShare2 className="text-gray-600 dark:text-gray-300" />
                    </Button>
                  </Dropdown>
                </div>
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
          company: job.company,
        }}
        requiredTests={requiredTests}
        onClose={() => setModalVisible(false)}
        locale={locale}
      />
    </>
  );
};

export default JobCard;
