//@ts-nocheck
"use client";
import {
  Card,
  Skeleton,
  Tag,
  Button,
  Typography,
  Pagination,
  Alert,
  Modal,
  Badge,
  Tooltip,
  Grid,
} from "antd";
import {
  ClockCircleOutlined,
  FileTextOutlined,
  CheckCircleOutlined,
  RocketOutlined,
  CalendarOutlined,
  StarFilled,
  PlayCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { images } from "@/constants/images";
import { usePagination } from "@/hooks/usePagination";
import { fetchMyExams } from "@/lib/client-action";

const { Text, Title } = Typography;
const { useBreakpoint } = Grid;

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 },
};

export const ExamsList = () => {
  const t = useTranslations("profilePage.ExamsList");
  const screens = useBreakpoint();
  const pathname = usePathname();
  const isArabic = pathname.includes("/ar");

  const [modalVisible, setModalVisible] = useState(false);
  const [currentTest, setCurrentTest] = useState<Test | null>(null);

  const {
    data: exams = [],
    meta: paginationMeta,
    isLoading,
    error,
    currentPage,
    goToPage,
    //@ts-ignore
  } = usePagination<MyExamItem>(fetchMyExams);

  const hasTests = exams.some((exam) => exam.tests?.length > 0);

  if (isLoading) {
    return (
      <div className="space-y-6 mt-8">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="mb-4 shadow-sm">
            <div className="flex gap-4">
              <Skeleton.Avatar size={64} shape="square" />
              <div className="flex-1">
                <Skeleton active paragraph={{ rows: 3 }} />
              </div>
            </div>
          </Card>
        ))}
      </div>
    );
  }

  if (!exams || exams.length === 0 || !hasTests) {
    return (
      <motion.div
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.8 }}
        className="w-full flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 min-h-[300px] sm:min-h-[400px] md:min-h-[500px]"
      >
        <div className="max-w-xs sm:max-w-sm md:max-w-md w-full text-center">
          <motion.div
            transition={{
              duration: 2.5,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/50 rounded-full blur-xl md:blur-2xl opacity-20 animate-pulse"></div>
            <Image
              src={images.exams}
              alt="No exams"
              width={180}
              height={180}
              className="object-contain mx-auto relative z-10"
              priority
            />
          </motion.div>
          <Title
            level={2}
            className="mt-4 md:mt-6 lg:mt-8 mb-2 md:mb-3 lg:mb-4 bg-gradient-to-r from-gray-800 to-gray-700 bg-clip-text text-transparent text-xl sm:text-2xl lg:text-3xl font-bold"
          >
            {t("noExams.title")}
          </Title>
          <Text
            type="secondary"
            className="text-sm sm:text-base lg:text-lg leading-relaxed"
          >
            {t("noExams.description")}
          </Text>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="px-2 sm:px-4 md:px-6 mt-4 md:mt-6 lg:mt-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex justify-between items-center mb-4 md:mb-6 lg:mb-8"
      >
        <div>
          <Title
            level={3}
            className="mb-0 sm:mb-1 font-bold text-gray-800 text-lg sm:text-xl md:text-2xl"
          >
            {t("header.title")}
          </Title>
        </div>
      </motion.div>

      <AnimatePresence mode="wait">
        <motion.div
          className="grid gap-4 sm:gap-5 md:gap-6 lg:gap-8"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
        >
          {exams
            .filter((exam) => exam.tests?.length > 0)
            .map((exam, index) => (
              <ExamCard
                key={index}
                exam={exam}
                index={index}
                t={t}
                setCurrentTest={setCurrentTest}
                setModalVisible={setModalVisible}
              />
            ))}
        </motion.div>
      </AnimatePresence>

      <PendingTestModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        jobOpportunity={
          currentTest
            ? exams.find((e) => e.tests.some((t) => t.id === currentTest.id))
                ?.job_opportunity
            : null
        }
        t={t}
        test={currentTest}
      />

      {hasTests && (
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex justify-center mt-6 md:mt-8 overflow-x-auto hide-scrollbar"
        >
          <Pagination
            current={currentPage}
            total={paginationMeta.total}
            pageSize={paginationMeta.per_page}
            onChange={(page) => {
              goToPage(page);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            showSizeChanger={false}
            className="[&_.ant-pagination-item-active]:bg-primary-color1 [&_.ant-pagination-item-active]:border-none [&_.ant-pagination-item-active]:text-white"
            itemRender={(current, type, originalElement) => {
              if (type === "prev") {
                return (
                  <Button
                    className="mx-1 border-none flex items-center text-xs sm:text-sm"
                    disabled={currentPage === 1}
                  >
                    {isArabic ? (
                      <FiChevronRight className="mr-0 sm:mr-1" />
                    ) : (
                      <FiChevronLeft className="mr-0 sm:mr-1" />
                    )}
                    {screens.xs ? "" : t("pagination.previous")}
                  </Button>
                );
              }
              if (type === "next") {
                return (
                  <Button
                    className="mx-1 border-none flex items-center text-xs sm:text-sm"
                    disabled={currentPage === paginationMeta.last_page}
                  >
                    {screens.xs ? "" : t("pagination.next")}
                    {isArabic ? (
                      <FiChevronLeft className="mr-0 sm:mr-1" />
                    ) : (
                      <FiChevronRight className="mr-0 sm:mr-1" />
                    )}
                  </Button>
                );
              }
              if (type === "page") {
                return (
                  <Button
                    type={current === currentPage ? "primary" : "default"}
                    className={`mx-1 border-none text-xs sm:text-sm ${
                      current === currentPage
                        ? "!bg-primary-color1 !text-white"
                        : ""
                    }`}
                  >
                    {current}
                  </Button>
                );
              }
              return originalElement;
            }}
          />
        </motion.div>
      )}
    </div>
  );
};

const ExamCard = ({
  exam,
  index,
  t,
  setCurrentTest,
  setModalVisible,
}: {
  exam: MyExamItem;
  index: number;
  t: any;
  setCurrentTest: (test: Test) => void;
  setModalVisible: (visible: boolean) => void;
}) => {
  const screens = useBreakpoint();
  const job = exam.job_opportunity;
  const application = exam.application;
  const appliedDate = new Date(application.applied_at!).toLocaleDateString();
  const isEligible = application.status === "eligible";

  return (
    <motion.div
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: screens.xs ? 0 : -4 }}
      className="group relative"
    >
      <Card
        className="hover:shadow-sm md:hover:shadow-md border dark:border-gray-700 transition-all duration-300 rounded-xl md:rounded-2xl overflow-hidden bg-white dark:bg-gray-800 relative p-0 shadow-xs md:shadow-sm dark:shadow-none"
        bodyStyle={{ padding: 0 }}
      >
        <div className="p-4 md:p-6">
          <div className="flex flex-col sm:flex-row items-start gap-4 md:gap-6">
            {/* Company Logo */}
            <div className="relative w-20 h-20 mx-auto sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-lg md:rounded-xl overflow-hidden bg-white dark:bg-gray-700 border border-gray-100 dark:border-gray-600 flex-shrink-0 shadow-sm md:shadow-md group-hover:shadow-md md:group-hover:shadow-lg transition-all duration-300 flex items-center justify-center">
              <Image
                src={job.image || images.favicon}
                width={64}
                height={64}
                alt="logo"
                className="object-contain p-1 md:p-2"
              />
            </div>

            <div className="flex-1 text-center min-w-0">
              {/* Header with title and status */}
              <div className="flex flex-col gap-1">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4">
                  <div>
                    <Title
                      level={4}
                      className="!m-0 !text-base sm:!text-lg md:!text-xl font-bold text-gray-800 dark:text-gray-100 group-hover:text-[#22ace3] dark:group-hover:text-[#4fc3f7] transition-colors"
                    >
                      {job.title}
                    </Title>
                  </div>
                  <div className="flex flex-col  items-start sm:items-end justify-center">
                    <Tag
                      color={isEligible ? "blue" : "orange"}
                      className={`!text-2xs sm:!text-xs !py-0.5 sm:!py-1 !px-2 sm:!px-3 !rounded-full !m-0 ${
                        isEligible
                          ? "!bg-[#e6f7ff] dark:!bg-[#003a6c] !text-[#22ace3] dark:!text-[#4fc3f7] !border-[#bae7ff] dark:!border-[#005a9e]"
                          : "!bg-amber-50 dark:!bg-amber-900/30 !text-amber-700 dark:!text-amber-300 !border-amber-100 dark:!border-amber-800"
                      } shadow-xs sm:shadow-sm transition-all flex items-center gap-1`}
                      icon={
                        isEligible ? (
                          <CheckCircleOutlined className="text-2xs sm:text-xs" />
                        ) : (
                          <ClockCircleOutlined className="text-2xs sm:text-xs" />
                        )
                      }
                    >
                      {isEligible
                        ? t("status.eligible")
                        : t("status.notEligible")}
                    </Tag>
                    <div className="flex items-center gap-1 text-2xs sm:text-xs text-gray-500 dark:text-gray-400 mt-1 sm:mt-2">
                      <CalendarOutlined className="opacity-70" />
                      <span>
                        {t("actions.appliedOn")} {appliedDate}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Job Description */}
              <div className="mt-2 md:mt-4 relative">
                <Text className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm transition-all duration-300 line-clamp-2 sm:line-clamp-3 pr-2 sm:pr-4">
                  {job.description || t("noDescription")}
                </Text>
              </div>

              {/* Tests Section */}
              <div className="mt-4 sm:mt-6 space-y-2 sm:space-y-3 md:space-y-4">
                {exam.tests.map((test, testIndex) => (
                  <TestItem
                    key={testIndex}
                    test={test}
                    t={t}
                    exam={exam}
                    setCurrentTest={setCurrentTest}
                    setModalVisible={setModalVisible}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

const TestItem = ({
  test,
  t,
  exam,
  setCurrentTest,
  setModalVisible,
}: {
  test: Test;
  t: any;
  exam: MyExamItem;
  setCurrentTest: (test: Test) => void;
  setModalVisible: (visible: boolean) => void;
}) => {
  const screens = useBreakpoint();
  const router = useRouter();
  const isPending = test.application_status === "pending";
  const isFailed = test.application_status === "failed";
  const isInterview = test.type === "interview";

  return (
    <motion.div
      className="group/test"
      whileHover={{ scale: screens.xs ? 1 : 1.01 }}
      transition={{ duration: 0.2 }}
    >
      <div
        className={`p-3 sm:p-4 md:p-5 rounded-lg sm:rounded-xl border ${
          isPending
            ? "bg-gradient-to-r from-amber-50 to-amber-100 dark:from-amber-900/30 dark:to-amber-900/20 border-amber-200 dark:border-amber-700"
            : isFailed
            ? "bg-gradient-to-r from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-900/10 border-red-200 dark:border-red-700"
            : "bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 hover:border-[#bae7ff] dark:hover:border-[#005a9e]"
        } transition-all duration-200 shadow-xs sm:shadow-sm hover:shadow-sm sm:hover:shadow-md dark:shadow-none relative overflow-hidden`}
      >
        {/* Decorative corner - hidden on mobile */}
        {!screens.xs && (
          <div
            className={`absolute top-0 right-0 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 ${
              isPending
                ? "bg-amber-100 dark:bg-amber-800/30"
                : isFailed
                ? "bg-red-100 dark:bg-red-800/30"
                : "bg-[#e6f7ff] dark:bg-[#003a6c]/50"
            } opacity-20 dark:opacity-30 transform rotate-45 translate-x-6 sm:translate-x-7 md:translate-x-8 -translate-y-6 sm:-translate-y-7 md:-translate-y-8`}
          />
        )}

        <div className="flex flex-col xs:flex-row xs:items-start justify-between gap-3 sm:gap-4 relative z-10">
          <div className="flex items-start gap-3 sm:gap-4 min-w-0">
            {/* Test Icon */}
            <div
              className={`p-2 sm:p-3 rounded-md sm:rounded-lg ${
                isInterview
                  ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300"
                  : isFailed
                  ? "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-300"
                  : "bg-[#e6f7ff] dark:bg-[#003a6c]/30 text-[#22ace3] dark:text-[#4fc3f7]"
              } flex-shrink-0 shadow-inner`}
            >
              {isInterview ? (
                <ClockCircleOutlined className="text-sm sm:text-lg" />
              ) : isFailed ? (
                <CloseCircleOutlined className="text-sm sm:text-lg" />
              ) : (
                <FileTextOutlined className="text-sm sm:text-lg" />
              )}
            </div>

            <div className="min-w-0">
              {/* Test Title */}
              <div className="flex items-center gap-2">
                <Text
                  strong
                  className={`!text-sm sm:!text-base font-semibold ${
                    isFailed
                      ? "text-red-800 dark:text-red-300"
                      : "text-gray-800 dark:text-gray-100"
                  }`}
                >
                  {test.name}
                </Text>
                {test.retryable && (
                  <Tooltip title={t("test.retryable")}>
                    <Badge
                      count={
                        <StarFilled className="text-2xs sm:text-xs text-amber-500 dark:text-amber-400" />
                      }
                      className="!bg-transparent !shadow-none"
                    />
                  </Tooltip>
                )}
              </div>

              {/* Test Description */}
              {test.description && (
                <div className="mt-0.5 sm:mt-1">
                  <Text
                    className={`text-xs sm:text-sm ${
                      isFailed
                        ? "text-red-600 dark:text-red-400"
                        : "text-gray-600 dark:text-gray-300"
                    }`}
                  >
                    {test.description}
                  </Text>
                </div>
              )}

              {/* Test Metadata */}
              <div className="mt-2 sm:mt-3 flex flex-wrap gap-1 sm:gap-2">
                {isPending && (
                  <Tag className="!text-2xs sm:!text-xs !py-0.5 sm:!py-1 !px-2 sm:!px-3 !rounded-full !bg-amber-100 dark:!bg-amber-900/30 !text-amber-800 dark:!text-amber-300 !border-amber-200 dark:!border-amber-700 shadow-xs sm:shadow-sm flex items-center gap-1">
                    <ClockCircleOutlined className="text-2xs sm:text-xs" />
                    {t("status.pending")}
                  </Tag>
                )}

                {isFailed && (
                  <Tag className="!text-2xs sm:!text-xs !py-0.5 sm:!py-1 !px-2 sm:!px-3 !rounded-full !bg-red-100 dark:!bg-red-900/30 !text-red-800 dark:!text-red-300 !border-red-200 dark:!border-red-700 shadow-xs sm:shadow-sm flex items-center gap-1">
                    <CloseCircleOutlined className="text-2xs sm:text-xs" />
                    {t("status.failed")}
                  </Tag>
                )}
              </div>
            </div>
          </div>

          {/* Action Button */}
          <Button
            type={isPending ? "default" : isFailed ? "default" : "primary"}
            icon={
              isPending ? (
                <ClockCircleOutlined className="text-sm sm:text-base" />
              ) : isFailed ? (
                <CloseCircleOutlined className="text-sm sm:text-base" />
              ) : (
                <PlayCircleOutlined className="text-sm sm:text-base" />
              )
            }
            onClick={() => {
              if (isPending) {
                setCurrentTest(test);
                setModalVisible(true);
              } else if (isFailed) {
                setCurrentTest(test);
                setModalVisible(true);
              } else {
                router.push(
                  `/profile/exams/${exam.job_opportunity.id}/${test.id}`
                );
              }
            }}
            className={`!h-9 sm:!h-10 md:!h-11 !px-3 sm:!px-4 md:!px-5 !rounded-md sm:!rounded-lg !flex items-center gap-1 sm:gap-2 ${
              isPending
                ? "!bg-amber-100 dark:!bg-amber-900/30 !text-amber-800 dark:!text-amber-300 !border-amber-200 dark:!border-amber-700 hover:!bg-amber-200 dark:hover:!bg-amber-800/40"
                : isFailed
                ? "!bg-red-100 dark:!bg-red-900/30 !text-red-800 dark:!text-red-300 !border-red-200 dark:!border-red-700 hover:!bg-red-200 dark:hover:!bg-red-800/40"
                : "!bg-[#22ace3] dark:!bg-[#0077c2] !border-[#22ace3] dark:!border-[#0077c2] hover:!bg-[#1e9fd6] dark:hover:!bg-[#006bb3]"
            } shadow-xs sm:shadow-sm hover:shadow-sm sm:hover:shadow-md dark:shadow-none transition-all min-w-[80px] sm:min-w-[100px] md:min-w-[120px] justify-center !text-xs sm:!text-sm`}
          >
            {isPending
              ? t("actions.pending")
              : isFailed
              ? t("actions.retry")
              : t("actions.start")}
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

const PendingTestModal = ({
  visible,
  onClose,
  t,
  test,
  jobOpportunity,
}: {
  visible: boolean;
  onClose: () => void;
  t: any;
  test: Test | null;
  jobOpportunity?: Job | null;
}) => {
  const screens = useBreakpoint();
  const isFailed = test?.application_status === "failed";
  const router = useRouter();

  const handleRetry = () => {
    if (test?.retryable && jobOpportunity?.id && test?.id) {
      router.push(`/profile/exams/${jobOpportunity.id}/${test.id}`);
    }
  };

  return (
    <Modal
      title={
        <div className="flex items-center gap-2 sm:gap-3">
          <div
            className={`p-1 sm:p-2 rounded-full ${
              isFailed ? "bg-red-100" : "bg-primary-50"
            }`}
          >
            {isFailed ? (
              <CloseCircleOutlined className="text-red-600 text-lg sm:text-xl" />
            ) : (
              <ClockCircleOutlined className="text-primary text-lg sm:text-xl" />
            )}
          </div>
          <span className="font-semibold text-gray-800 dark:text-white text-base sm:text-lg">
            {isFailed ? t("testFailed") : t("testNotAvailable")}
          </span>
        </div>
      }
      open={visible}
      onOk={onClose}
      onCancel={onClose}
      footer={[
        <Button
          key="ok"
          type={isFailed ? "default" : "primary"}
          onClick={onClose}
          className={`h-9 sm:h-10 md:h-11 px-4 sm:px-5 md:px-6 rounded-lg ${
            isFailed
              ? "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 border-red-200 dark:border-red-700 hover:bg-red-200 dark:hover:bg-red-800/40"
              : "bg-primary hover:bg-primary-600 border-0 shadow-sm hover:shadow-md"
          } transition-all duration-300 font-medium`}
          size={screens.xs ? "middle" : "large"}
        >
          {t("actions.understand")}
        </Button>,
        isFailed && test?.retryable && (
          <Button
            key="retry"
            type="primary"
            onClick={handleRetry}
            className="h-9 sm:h-10 md:h-11 px-4 sm:px-5 md:px-6 rounded-lg bg-primary hover:bg-primary-600 border-0 shadow-sm hover:shadow-md transition-all duration-300 font-medium ml-2"
            size={screens.xs ? "middle" : "large"}
          >
            {t("actions.retryNow")}
          </Button>
        ),
      ]}
      centered
      className="rounded-xl sm:rounded-2xl md:rounded-3xl"
      width={screens.xs ? "90%" : screens.sm ? 500 : 550}
    >
      <div className="py-4 sm:py-5 md:py-6 px-1 sm:px-2">
        <div className="flex items-center justify-center mb-4 sm:mb-5 md:mb-6">
          <div
            className={`p-3 sm:p-4 rounded-full ${
              isFailed ? "bg-red-100" : "bg-primary-50"
            }`}
          >
            {isFailed ? (
              <CloseCircleOutlined className="text-red-600 text-4xl sm:text-5xl" />
            ) : (
              <ClockCircleOutlined className="text-primary text-4xl sm:text-5xl" />
            )}
          </div>
        </div>

        <p className="text-gray-700 dark:text-white text-center text-base sm:text-lg leading-relaxed mb-3 sm:mb-4">
          {isFailed ? t("testFailedMessage") : t("testPendingMessage")}
        </p>

        {test && (
          <div
            className={`rounded-lg sm:rounded-xl p-3 sm:p-4 mt-4 sm:mt-5 md:mt-6 border ${
              isFailed
                ? "bg-red-50 dark:bg-red-900/20 border-red-100 dark:border-red-700"
                : "bg-primary-50 border-primary-100"
            }`}
          >
            <div className="flex items-start gap-2 sm:gap-3">
              <div
                className={`p-1 sm:p-2 rounded-md sm:rounded-lg ${
                  isFailed
                    ? "bg-red-200/30 dark:bg-red-800/30 text-red-600"
                    : "bg-primary/20 dark:bg-primary/60 text-primary"
                } flex-shrink-0`}
              >
                {test.type === "interview" ? (
                  <ClockCircleOutlined className="text-sm sm:text-lg" />
                ) : (
                  <FileTextOutlined className="text-sm sm:text-lg" />
                )}
              </div>
              <div>
                <Text
                  strong
                  className={`block text-sm sm:text-base ${
                    isFailed
                      ? "text-red-800 dark:text-red-300"
                      : "text-primary-800 dark:text-primary-200"
                  }`}
                >
                  {test.name}
                </Text>
                <Text
                  type={isFailed ? "danger" : "secondary"}
                  className="text-xs sm:text-sm mb-1 sm:mb-2"
                >
                  {test.description || t("noDescription")}
                </Text>
              </div>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};
