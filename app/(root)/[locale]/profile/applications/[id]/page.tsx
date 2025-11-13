"use client";
import {
  Calendar,
  MapPin,
  Users,
  Clock,
  CheckCircle,
  BookOpen,
  Code,
  Briefcase,
  Star,
  Eye,
  FileText,
  Award,
  Target,
  TrendingUp,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  MessageSquare,
} from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { formatDate } from "@/lib/utils";
import { BiDollar } from "react-icons/bi";
import { useFetchWithId } from "@/hooks/useFetch";
import { fetchApplicationDetails } from "@/lib/client-action";
import Loader from "@/components/Loader";
import { useParams } from "next/navigation";
import Image from "next/image";
import { images } from "@/constants/images";
import {
  containerVariants,
  fadeIn,
  itemVariants,
  slideUp,
} from "@/lib/animation";
import { useTranslations } from "next-intl";

const ApplicationDetailsPage = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [expandedTests, setExpandedTests] = useState<Record<number, boolean>>(
    {}
  );
  const { id } = useParams();
  const t = useTranslations("ApplicationDetailsPage");

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const { data: applicationData, isLoading } = useFetchWithId<Application>(
    fetchApplicationDetails,
    Number(id)
  );

  if (!isMounted) return null;
  if (isLoading) {
    return <Loader />;
  }

  const toggleTestExpansion = (testId: number) => {
    setExpandedTests((prev) => ({
      ...prev,
      [testId]: !prev[testId],
    }));
  };

  const parseAnswer = (answer: string) => {
    try {
      return JSON.parse(answer);
    } catch {
      return answer;
    }
  };

  const formatAnswer = (answer: string) => {
    const parsed = parseAnswer(answer);

    if (Array.isArray(parsed)) {
      if (parsed.length === 1 && typeof parsed[0] === "string") {
        return parsed[0];
      }
      return parsed.join(", ");
    }

    return parsed.toString();
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "passed":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "failed":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400";
    }
  };

  const getScoreColor = (score: string) => {
    const numScore = parseFloat(score);
    if (numScore >= 80) return "text-green-600 dark:text-green-400";
    if (numScore >= 60) return "text-yellow-600 dark:text-yellow-400";
    return "text-red-600 dark:text-red-400";
  };

  //@ts-ignore
  const { job_opportunity: job, status, applied_at, tests } = applicationData;

  return (
    <motion.div initial="hidden" animate="visible" variants={containerVariants}>
      <div className="min-h-screen mt-20 bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 md:py-8">
          {/* Header Section */}
          <motion.div
            variants={slideUp}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6 mb-6 md:mb-8"
          >
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              <div className="flex flex-col sm:flex-row sm:items-start space-y-4 sm:space-y-0 sm:space-x-4">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 10 }}
                  className="w-12 h-12 mx-auto text-start sm:mx-4 bg-gradient-to-br from-primary to-blue-500 rounded-lg flex items-center justify-center shadow-md"
                >
                  <Image
                    src={job.image ? `${job.image}` : images.favicon}
                    height={64}
                    width={64}
                    alt="logo"
                    className="rounded-md h-full w-full object-cover"
                  />
                </motion.div>
                <div className="">
                  <motion.h1
                    variants={itemVariants}
                    className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2"
                  >
                    {job.title}
                  </motion.h1>
                  <motion.p
                    variants={itemVariants}
                    className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-4 max-w-2xl"
                  >
                    {job.description}
                  </motion.p>
                  <motion.div
                    variants={itemVariants}
                    className="flex flex-wrap justify-center sm:justify-start gap-x-4 gap-y-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400"
                  >
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mx-2" />
                      <span>{t("header.remote")}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Briefcase className="w-3 h-3 sm:w-4 sm:h-4 mx-2" />
                      <span>{job.contract_types[0]?.name}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="w-3 h-3 sm:w-4 sm:h-4 mx-2" />
                      <span>{job.experience_levels[0]?.name}</span>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 mb-6 md:mb-8"
          >
            {[
              {
                icon: <Calendar className="w-4 h-4 text-primary" />,
                bg: "bg-primary/10 dark:bg-primary/20",
                title: t("quickStats.applied"),
                value: formatDate(applied_at),
              },
              {
                icon: (
                  <Clock className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                ),
                bg: "bg-orange-100 dark:bg-orange-900/30",
                title: t("quickStats.deadline"),
                value: formatDate(job.expires_at),
              },
              {
                icon: (
                  <Eye className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                ),
                bg: "bg-purple-100 dark:bg-purple-900/30",
                title: t("quickStats.status"),
                value: status,
              },
              {
                icon: (
                  <Star className="w-4 h-4 text-green-600 dark:text-green-400" />
                ),
                bg: "bg-green-100 dark:bg-green-900/30",
                title: t("quickStats.experience"),
                value: `${job.years_experience} ${t("quickStats.years")}`,
              },
              {
                icon: (
                  <BiDollar className="w-4 h-4 text-green-600 dark:text-green-400" />
                ),
                bg: "bg-green-100 dark:bg-green-900/30",
                title: t("quickStats.salary"),
                value: `${job.salary_min} - ${job.salary_max}`,
              },
            ].map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="bg-white dark:bg-gray-800 flex-1 rounded-lg p-3 sm:p-4 border border-gray-200 dark:border-gray-700 shadow-sm"
              >
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div
                    className={`w-7 h-7 sm:w-8 mx-3 sm:h-8 ${stat.bg} rounded-lg flex items-center justify-center`}
                  >
                    {stat.icon}
                  </div>
                  <div>
                    <div className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white">
                      {stat.title}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                      {stat.value}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Main Content Grid */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          >
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Job Details */}
              <motion.div
                variants={slideUp}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6"
              >
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  {t("jobDetails.title")}
                </h2>

                <div className="space-y-6">
                  <motion.div variants={itemVariants}>
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2 flex items-center space-x-2">
                      <Users className="w-4 h-4 text-primary mx-2" />
                      <span>{t("jobDetails.responsibilities")}</span>
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                      {job.duties_responsibilities}
                    </p>
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3 flex items-center space-x-2">
                      <Code className="w-4 h-4 text-primary mx-2" />
                      <span>{t("jobDetails.technicalSkills")}</span>
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {job.technical_skills
                        .split(", ")
                        .map((skill: string, index: number) => (
                          <motion.span
                            key={index}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-primary text-white px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-xs font-medium"
                          >
                            {skill}
                          </motion.span>
                        ))}
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              {/* Application Timeline */}
              <motion.div
                variants={slideUp}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6"
              >
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  {t("applicationProgress.title")}
                </h2>
                <div className="space-y-4">
                  {[
                    {
                      icon: <CheckCircle className="w-4 h-4 text-white" />,
                      bg: "bg-primary",
                      title: t("applicationProgress.submitted.title"),
                      date: formatDate(applied_at),
                      description: t(
                        "applicationProgress.submitted.description"
                      ),
                      active: true,
                    },
                    {
                      icon: (
                        <Eye className="w-4 h-4 text-gray-400 dark:text-gray-300" />
                      ),
                      bg: "bg-gray-200 dark:bg-gray-600",
                      title: t("applicationProgress.review.title"),
                      date: t("applicationProgress.pending"),
                      description: t("applicationProgress.review.description"),
                      active: false,
                    },
                    {
                      icon: (
                        <Users className="w-4 h-4 text-gray-400 dark:text-gray-300" />
                      ),
                      bg: "bg-gray-200 dark:bg-gray-600",
                      title: t("applicationProgress.interview.title"),
                      date: t("applicationProgress.pending"),
                      description: t(
                        "applicationProgress.interview.description"
                      ),
                      active: false,
                    },
                  ].map((step, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      className="flex items-start space-x-3 sm:space-x-4"
                    >
                      <div
                        className={`w-7 h-7 sm:w-8 sm:h-8 mx-2 ${step.bg} rounded-full flex items-center justify-center mt-0.5`}
                      >
                        {step.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                          <h4
                            className={`text-sm font-medium ${
                              step.active
                                ? "text-gray-900 dark:text-white"
                                : "text-gray-500 dark:text-gray-400"
                            }`}
                          >
                            {step.title}
                          </h4>
                          <span
                            className={`text-xs ${
                              step.active
                                ? "text-gray-500 dark:text-gray-400"
                                : "text-gray-400 dark:text-gray-500"
                            }`}
                          >
                            {step.date}
                          </span>
                        </div>
                        <p
                          className={`text-xs ${
                            step.active
                              ? "text-gray-600 dark:text-gray-300"
                              : "text-gray-500 dark:text-gray-400"
                          } mt-1`}
                        >
                          {step.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Application Info */}
              <motion.div
                variants={fadeIn}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6"
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  {t("applicationInfo.title")}
                </h3>
                <div className="space-y-3 sm:space-y-4">
                  {[
                    {
                      label: t("applicationInfo.appId"),
                      value: `#${applicationData?.id}`,
                    },
                    { label: t("applicationInfo.jobId"), value: `#${job.id}` },
                    {
                      label: t("applicationInfo.education"),
                      value: job.education_levels[0]?.name,
                    },
                    {
                      label: t("applicationInfo.workMode"),
                      value: job.work_modes[0]?.name,
                    },
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-600"
                    >
                      <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                        {item.label}
                      </span>
                      <span className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white">
                        {item.value}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Status Card */}
              <motion.div
                variants={slideUp}
                initial="hidden"
                animate="visible"
                whileHover={{ scale: 1.02 }}
                className="bg-gradient-to-r from-primary to-blue-500 rounded-xl p-4 sm:p-6 text-white"
              >
                <div className="flex items-center space-x-3 mb-3">
                  <motion.div
                    animate={{
                      rotate: [0, 20, -20, 0],
                      transition: {
                        duration: 1,
                        repeat: Infinity,
                        repeatDelay: 3,
                      },
                    }}
                    className="w-7 h-7 sm:w-8 mx-2 sm:h-8 bg-white/20 rounded-lg flex items-center justify-center"
                  >
                    <CheckCircle className="w-4 h-4" />
                  </motion.div>
                  <h3 className="font-semibold text-sm sm:text-base">
                    {t("statusCard.title")}
                  </h3>
                </div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="bg-white/10 rounded-lg p-3 sm:p-4"
                >
                  <p className="font-semibold text-base sm:text-lg capitalize mb-1 sm:mb-2">
                    {status}
                  </p>
                  <p className="text-xs sm:text-sm text-white/90">
                    {t("statusCard.message")}
                  </p>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
          {/* Test Results Section - Simplified Version */}
          {tests && tests.length > 0 && (
            <motion.div
              variants={slideUp}
              className="bg-white mt-4 dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6"
            >
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
                <FileText className="w-5 h-5 text-primary mx-2" />
                <span>{t("testResults.title")}</span>
              </h2>

              <div className="space-y-4">
                {tests.map((test: TestResult) => (
                  <div
                    key={test.id}
                    className="border border-gray-200 dark:border-gray-600 rounded-lg p-3 sm:p-4"
                  >
                    {/* Test Header */}
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 dark:text-white mb-1">
                          {test.interview.name}
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mb-2">
                          {test.interview.description}
                        </p>
                        <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                          <span className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                            {test.interview.type}
                          </span>
                          {test.submitted_at && (
                            <span>
                              {t("testResults.submittedAt")}:{" "}
                              {formatDate(test.submitted_at)}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Test Status and Score */}
                      <div className="flex flex-row sm:flex-col items-start sm:items-end justify-between sm:justify-start gap-2">
                        <span
                          className={`px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs font-medium ${getStatusColor(
                            test.status
                          )}`}
                        >
                          {test.status.toUpperCase()}
                        </span>
                        {test.result_score && (
                          <div className="flex items-center space-x-2">
                            <Award
                              className={`w-3 h-3 mx-2 sm:w-4 sm:h-4 ${getScoreColor(
                                test.result_score
                              )}`}
                            />
                            <span
                              className={`font-bold text-base sm:text-lg ${getScoreColor(
                                test.result_score
                              )}`}
                            >
                              {test.result_score}%
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Performance Summary - Simplified */}
                    {test.result_score && test.details && (
                      <div className="mt-4 grid grid-cols-3 gap-2 sm:gap-4 text-center">
                        <div className="bg-gray-50 dark:bg-gray-700 rounded p-2 sm:p-3">
                          <div className="text-sm sm:text-lg font-bold text-green-600">
                            {
                              test.details.filter(
                                (d) => d.question_status === "correct"
                              ).length
                            }
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            {t("testResults.correct")}
                          </div>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-700 rounded p-2 sm:p-3">
                          <div className="text-sm sm:text-lg font-bold text-red-600">
                            {
                              test.details.filter(
                                (d) => d.question_status !== "correct"
                              ).length
                            }
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            {t("testResults.incorrect")}
                          </div>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-700 rounded p-2 sm:p-3">
                          <div
                            className={`text-sm sm:text-lg font-bold ${getScoreColor(
                              test.result_score
                            )}`}
                          >
                            {test.result_score}%
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            {t("testResults.score")}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ApplicationDetailsPage;
