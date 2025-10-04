// components/StepIndicator.tsx
import { CheckCircle } from "lucide-react";
import { useTranslations } from "next-intl";

interface StepIndicatorProps {
  step: number;
  stepItems: Array<{
    id: number;
    key: string;
    title: string;
    description: string;
    icon: React.ComponentType<any>;
  }>;
}

const StepIndicator = ({ step, stepItems }: StepIndicatorProps) => {
  const t = useTranslations("serviceRequest");

  return (
    <div className="w-full lg:w-1/3">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 sticky top-6 transition-colors duration-300">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-6">
          {t("progressTitle")}
        </h3>
        <div className="relative">
          <div className="absolute left-7 top-0 h-full w-0.5 bg-gray-200 dark:bg-gray-600"></div>

          <div className="space-y-8">
            {stepItems.map((item, index) => {
              const StepIcon = item.icon;
              const isActive = step === index + 1;
              const isCompleted = step > index + 1;

              return (
                <div key={index} className="relative flex items-start">
                  <div
                    className={`flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full ${
                      isActive
                        ? "bg-primary text-white"
                        : isCompleted
                        ? "bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400"
                        : "bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500"
                    } relative z-10 mx-2 transition-colors duration-300`}
                  >
                    {isCompleted ? (
                      <CheckCircle className="h-5 w-5" />
                    ) : (
                      <StepIcon className="h-5 w-5" />
                    )}
                  </div>

                  <div className="ml-4">
                    <h4
                      className={`text-sm font-medium ${
                        isActive
                          ? "text-primary"
                          : isCompleted
                          ? "text-green-600 dark:text-green-400"
                          : "text-gray-500 dark:text-gray-400"
                      } transition-colors duration-300`}
                    >
                      <div dangerouslySetInnerHTML={{ __html: item.title }} />
                    </h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepIndicator;
