"use client";
import { Button, Modal, Result } from "antd";
import { FiCheckCircle, FiAlertCircle, FiFileText } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

interface JobApplicationModalProps {
  visible: boolean;
  type: "success" | "error" | "tests";
  message: string;
  job: {
    id: number;
    title: string;
    company: string;
  };
  requiredTests?: Array<{
    id: number;
    name: string;
    description: string;
  }>;
  onClose: () => void;
  locale: string;
}

export const JobApplicationModal = ({
  visible,
  type,
  message,
  job,
  requiredTests = [],
  onClose,
  locale,
}: JobApplicationModalProps) => {
  const router = useRouter();
  const tt = useTranslations("applyingModal");

  const renderContent = () => {
    if (type === "success") {
      return (
        <Result
          icon={
            <div className="flex justify-center mb-2 sm:mb-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-green-100 rounded-full flex items-center justify-center">
                <FiCheckCircle className="text-green-500 text-3xl sm:text-4xl" />
              </div>
            </div>
          }
          title={
            <div className="text-center">
              <p className="text-base sm:text-lg text-gray-600 mb-2 sm:mb-4">
                {message}
              </p>
              <div className="flex flex-wrap justify-center items-center gap-1 text-xs sm:text-sm text-gray-500">
                <span>{locale === "ar" ? "التقديم ل" : "Application for"}</span>
                <span className="font-semibold text-blue-600">{job.title}</span>
                <span>{locale === "ar" ? "في" : "at"}</span>
                <span className="font-semibold text-blue-600">
                  {job.company}
                </span>
              </div>
            </div>
          }
          extra={
            <div className="flex flex-col gap-2 sm:gap-3 mt-4 sm:mt-6">
              {(message.includes("successfully") ||
                message.includes("بنجاح")) && (
                <Button
                  type="primary"
                  size="large"
                  className="w-full h-10 sm:h-12 text-sm sm:text-base"
                  onClick={() => {
                    onClose();
                    router.push(`/${locale}/profile`);
                  }}
                >
                  {tt("viewMyApplications")}
                </Button>
              )}
            </div>
          }
        />
      );
    }

    if (type === "tests") {
      return (
        <div className="text-center mb-4 sm:mb-6 px-2 sm:px-0">
          <div className="flex justify-center mb-2 sm:mb-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-blue-100 rounded-full flex items-center justify-center">
              <FiFileText className="text-blue-500 text-3xl sm:text-4xl" />
            </div>
          </div>

          <p className="text-base sm:text-lg text-gray-600 mb-2 sm:mb-4">
            {message}
          </p>
          <div className="flex flex-wrap justify-center items-center gap-1 text-xs sm:text-sm text-gray-500 mb-4 sm:mb-6">
            <span>{locale === "ar" ? "العمل" : "Job"}</span>
            <span className="font-semibold text-blue-600">{job.title}</span>
            <span>{locale === "ar" ? "في" : "at"}</span>
            <span className="font-semibold text-blue-600">{job.company}</span>
          </div>

          <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6 max-h-[40vh] overflow-y-auto">
            <h4 className="text-base sm:text-lg text-start font-semibold text-gray-700 mb-2 sm:mb-3">
              {locale === "ar" ? "الاختبارات المطلوبة" : "Required Tests:"}
            </h4>
            {requiredTests.map((test) => (
              <div
                key={test.id}
                className="border border-gray-200 rounded-lg p-3 sm:p-4 bg-gray-50"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 text-start">
                    <h5 className="font-semibold text-sm sm:text-base text-gray-800 mb-1">
                      {test.name}
                    </h5>
                    <p className="text-xs sm:text-sm text-gray-600 line-clamp-2">
                      {test.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-2 sm:gap-3">
            <Button
              type="primary"
              size="large"
              className="w-full h-10 sm:h-12 text-sm sm:text-lg font-medium"
              onClick={() => {
                onClose();
                if (requiredTests.length > 0) {
                  router.push(
                    `/${locale}/career/${job.id}/test/${requiredTests[0].id}`
                  );
                }
              }}
            >
              {tt("startTest")}
            </Button>
          </div>
        </div>
      );
    }

    return (
      <Result
        icon={
          <div className="flex justify-center mb-2 sm:mb-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-red-100 rounded-full flex items-center justify-center">
              <FiAlertCircle className="text-red-500 text-3xl sm:text-4xl" />
            </div>
          </div>
        }
        title={
          <div className="text-center">
            <p className="text-base sm:text-lg text-gray-600 mb-2 sm:mb-4">
              {message}
            </p>
            <div className="flex flex-wrap justify-center items-center gap-1 text-xs sm:text-sm text-gray-500">
              <span>{locale === "ar" ? "العمل" : "Job"}</span>
              <span className="font-semibold text-blue-600">{job.title}</span>
              <span>{locale === "ar" ? "في" : "at"}</span>
              <span className="font-semibold text-blue-600">{job.company}</span>
            </div>
          </div>
        }
        extra={
          <div className="flex flex-col gap-2 sm:gap-3 mt-4 sm:mt-6">
            {(message.includes("already applied") ||
              message.includes("لقد تقدمت بالفعل لهذه الوظيفة")) && (
              <Button
                type="primary"
                size="large"
                className="w-full h-10 sm:h-12 text-sm sm:text-base"
                onClick={() => {
                  onClose();
                  router.push(`/${locale}/profile`);
                }}
              >
                {tt("viewMyApplications")}
              </Button>
            )}
          </div>
        }
      />
    );
  };
  return (
    <Modal
      open={visible}
      onCancel={onClose}
      footer={null}
      centered
      width={type === "tests" ? 600 : 500}
      className={`${type}-modal`}
    >
      {renderContent()}
    </Modal>
  );
};
