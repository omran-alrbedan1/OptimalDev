"use client";
import { fetchMyApplications } from "@/lib/client-action";
import {
  Card,
  Skeleton,
  Tag,
  Divider,
  Button,
  Space,
  Typography,
  Pagination,
  Alert,
} from "antd";
import {
  CalendarOutlined,
  EnvironmentOutlined,
  DollarOutlined,
  ClockCircleOutlined,
  UserOutlined,
  FileTextOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import { images } from "@/constants/images";
import { usePagination } from "@/hooks/usePagination";

const { Text, Title } = Typography;

export const ApplicationsList = () => {
  const t = useTranslations("profilePage.ApplicationList");
  const router = useRouter();
  const locale = useLocale();
  const pathname = usePathname();
  const isArabic = pathname.includes("/ar");

  const {
    data: applications = [],
    meta: paginationMeta,
    isLoading,
    error,
    currentPage,
    goToPage,
  } =
    //@ts-ignore
    usePagination<Application>(fetchMyApplications);

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

  if (error) {
    return (
      <div className="text-center py-8">
        <Alert
          message={t("error.loading")}
          description={error.message}
          type="error"
          showIcon
        />
        <Button onClick={() => window.location.reload()} className="mt-4">
          {t("error.retry")}
        </Button>
      </div>
    );
  }

  if (!applications || applications.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full flex flex-col items-center justify-center p-6 min-h-[400px]"
      >
        <div className="max-w-md w-full text-center">
          <div className="flex justify-center mb-4">
            <Image
              src="/images/applications.png"
              alt="Applications"
              width={200}
              height={200}
              className="object-contain"
            />
          </div>
          <Title level={3} className="text-gray-800 dark:text-gray-200 mb-2">
            {t("noApplications.title")}
          </Title>
          <Text className="text-gray-500 mb-6 block">
            {t("noApplications.description")}
          </Text>
          <Button
            onClick={() => router.push("/career")}
            type="primary"
            size="large"
            className="bg-gradient-to-r from-primary/80 to-primary border-none hover:from-blue-600 hover:to-purple-700"
          >
            {t("noApplications.button")}
          </Button>
        </div>
      </motion.div>
    );
  }

  const formatSalary = (min: string, max: string) => {
    const minNum = parseFloat(min);
    const maxNum = parseFloat(max);
    return `$${minNum.toLocaleString(locale)} - $${maxNum.toLocaleString(
      locale
    )}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(locale, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="space-y-6 px-4 mt-4">
      <div className="flex justify-between items-center mb-6">
        <div>
          <Title level={4} className="mb-0">
            {t("header.title")}
          </Title>
        </div>
      </div>

      {applications.map((app, index) => {
        const job = app.job_opportunity;
        const company = job.company;

        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card
              className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-primary relative overflow-hidden group"
              bodyStyle={{ padding: "24px" }}
            >
              <div className="relative">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4">
                    <Image
                      src={company.logo ? `${company.logo}` : images.favicon}
                      height={64}
                      width={64}
                      alt="logo"
                      className="rounded-md object-cover"
                    />
                    <div className="flex-1">
                      <Title
                        level={5}
                        className="mb-1 text-gray-800 dark:text-gray-200"
                      >
                        {job.title}
                      </Title>
                      <Text className="text-gray-600 font-medium">
                        {company.name}
                      </Text>
                      <br />
                      <Text className="text-gray-500 text-sm">
                        <EnvironmentOutlined className="mr-1" />
                        {company.address}
                      </Text>
                    </div>
                  </div>
                </div>

                {/* Job Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-green-50 dark:bg-green-900/30 rounded-lg">
                      <DollarOutlined className="text-green-600" />
                    </div>
                    <div>
                      <Text className="text-xs text-gray-500 block">
                        {t("jobDetails.salary")}
                      </Text>
                      <Text className="font-medium text-sm">
                        {formatSalary(job.salary_min, job.salary_max)}
                      </Text>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                      <UserOutlined className="text-blue-600" />
                    </div>
                    <div>
                      <Text className="text-xs text-gray-500 block">
                        {t("jobDetails.experience")}
                      </Text>
                      <Text className="font-medium text-sm">
                        {job.years_experience} {t("jobDetails.years")}
                      </Text>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-purple-50 dark:bg-purple-900/30 rounded-lg">
                      <ClockCircleOutlined className="text-purple-600" />
                    </div>
                    <div>
                      <Text className="text-xs text-gray-500 block">
                        {t("jobDetails.contract")}
                      </Text>
                      <Text className="font-medium text-sm">
                        {job.contract_types?.[0]?.name || "N/A"}
                      </Text>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-orange-50 dark:bg-orange-900/30 rounded-lg">
                      <EnvironmentOutlined className="text-orange-600" />
                    </div>
                    <div>
                      <Text className="text-xs text-gray-500 block">
                        {t("jobDetails.workMode")}
                      </Text>
                      <Text className="font-medium text-sm">
                        {job.work_modes?.[0]?.name || "N/A"}
                      </Text>
                    </div>
                  </div>
                </div>

                {/* Skills */}
                {job.technical_skills && (
                  <div className="mb-4">
                    <Text className="text-xs text-gray-500 block mb-2">
                      {t("jobDetails.skills")}
                    </Text>
                    <div className="flex flex-wrap gap-1">
                      {job.technical_skills
                        .split(",")
                        .map((skill: string, idx: number) => (
                          <Tag
                            key={idx}
                            className="text-xs bg-gray-100 border-gray-200"
                          >
                            {skill.trim()}
                          </Tag>
                        ))}
                    </div>
                  </div>
                )}

                <Divider className="my-4" />

                {/* Footer */}
                <div className="flex justify-between items-center">
                  <Space>
                    <Text className="text-sm text-gray-500">
                      <CalendarOutlined className="mr-1" />
                      {t("jobDetails.appliedDate", {
                        date: formatDate(app?.applied_at || ""),
                      })}
                    </Text>
                  </Space>

                  <Space>
                    <Button
                      type="default"
                      size="small"
                      icon={<FileTextOutlined />}
                      onClick={() =>
                        router.push(`/profile/applications/${app.id}`)
                      }
                    >
                      {t("actions.details")}
                    </Button>
                    <Button
                      type="primary"
                      size="small"
                      icon={<EyeOutlined />}
                      onClick={() => router.push(`/career/${job.id}`)}
                      className="bg-gradient-to-r from-primary-color1/80 to-primary border-none"
                    >
                      {t("actions.viewJob")}
                    </Button>
                  </Space>
                </div>
              </div>
            </Card>
          </motion.div>
        );
      })}

      {applications.length > 0 && (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex justify-center mt-8 overflow-x-auto hide-scrollbar"
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
                    className="mx-1 border-none flex items-center"
                    disabled={currentPage === 1}
                  >
                    {isArabic ? (
                      <FiChevronRight className="mr-1" />
                    ) : (
                      <FiChevronLeft className="mr-1" />
                    )}
                    {t("pagination.previous")}
                  </Button>
                );
              }
              if (type === "next") {
                return (
                  <Button
                    className="mx-1 border-none flex items-center"
                    disabled={currentPage === paginationMeta.last_page}
                  >
                    {t("pagination.next")}
                    {isArabic ? (
                      <FiChevronLeft className="mr-1" />
                    ) : (
                      <FiChevronRight className="mr-1" />
                    )}
                  </Button>
                );
              }
              if (type === "page") {
                return (
                  <Button
                    type={current === currentPage ? "primary" : "default"}
                    className={`mx-1 border-none ${
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
