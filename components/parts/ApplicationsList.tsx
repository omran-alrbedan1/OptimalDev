"use client";
import { fetchMyApplications } from "@/lib/client-action";
import { Skeleton, Button, Typography, Pagination, Alert } from "antd";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import { usePagination } from "@/hooks/usePagination";
import { ApplicationCard } from "./ApplicationCard";

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
          <Skeleton key={i} active paragraph={{ rows: 3 }} />
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

      {applications.map((app, index) => (
        <ApplicationCard
          key={app.id}
          application={app}
          index={index}
          t={t}
          formatSalary={formatSalary}
          formatDate={formatDate}
          isArabic={isArabic}
        />
      ))}

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
