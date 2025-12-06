import { Card, Tag, Divider, Button, Space, Typography } from "antd";
import {
  CalendarOutlined,
  EnvironmentOutlined,
  DollarOutlined,
  ClockCircleOutlined,
  UserOutlined,
  FileTextOutlined,
  EyeOutlined,
  FieldTimeOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  ClockCircleOutlined as ClockIcon,
} from "@ant-design/icons";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { images } from "@/constants/images";

const { Text, Title } = Typography;

interface ApplicationCardProps {
  application: any;
  index: number;
  t: any;
  formatSalary: (min: string, max: string) => string;
  formatDate: (dateString: string) => string;
  isArabic: boolean;
}

// Status styling with icons and proper backend status mapping
const getStatusConfig = (status: string) => {
  const configs = {
    eligible: {
      style: "bg-green-100 text-green-800 border-green-200",
      icon: <CheckCircleOutlined className="mr-1" />,
      text: "Eligible",
    },
    not_eligible: {
      style: "bg-red-100 text-red-800 border-red-200",
      icon: <CloseCircleOutlined className="mr-1" />,
      text: "Not Eligible",
    },
    applied: {
      style: "bg-blue-100 text-blue-800 border-blue-200",
      icon: <ClockIcon className="mr-1" />,
      text: "Applied",
    },
    incomplete: {
      style: "bg-yellow-100 text-yellow-800 border-yellow-200",
      icon: <ExclamationCircleOutlined className="mr-1" />,
      text: "Incomplete",
    },
    rejected: {
      style: "bg-red-100 text-red-800 border-red-200",
      icon: <CloseCircleOutlined className="mr-1" />,
      text: "Rejected",
    },
    default: {
      style: "bg-gray-100 text-gray-800 border-gray-200",
      icon: <ClockIcon className="mr-1" />,
      text: status || "Pending",
    },
  };

  return configs[status as keyof typeof configs] || configs.default;
};

export const ApplicationCard = ({
  application,
  index,
  t,
  formatSalary,
  formatDate,
  isArabic,
}: ApplicationCardProps) => {
  const router = useRouter();
  const job = application.job_opportunity;
  const company = job.company;

  const statusConfig = getStatusConfig(application.status);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card
        className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-primary relative overflow-hidden group"
        bodyStyle={{ padding: "24px" }}
      >
        {/* Status Badge - Top Right Corner */}
        <div
          className={`absolute top-4 ltr:right-4 rtl:left-2 px-3 py-1 rounded-full text-sm font-medium border flex items-center ${statusConfig.style}`}
        >
          {statusConfig.icon}
          {statusConfig.text}
        </div>

        <div className="relative">
          {/* Header */}
          <div className="flex items-start gap-4 mb-4">
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
              <Text className="text-gray-600 font-medium">{company.name}</Text>
              <br />
              <Text className="text-gray-500 text-sm">
                <EnvironmentOutlined className="mr-1" />
                {company.address}
              </Text>
            </div>
          </div>

          {/* Job Details - Now 5 items */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
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

            {/* Deadline Section - Added as 5th item */}
            <div className="flex items-center gap-2">
              <div className="p-2 bg-red-50 dark:bg-red-900/30 rounded-lg">
                <FieldTimeOutlined className="text-red-600" />
              </div>
              <div>
                <Text className="text-xs text-gray-500 block">
                  {t("jobDetails.deadline", { defaultValue: "Deadline" })}
                </Text>
                <Text className="font-medium text-sm">
                  {formatDate(job.expires_at)}
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
                  date: formatDate(application?.applied_at || ""),
                })}
              </Text>
            </Space>

            <Space>
              <Button
                type="default"
                size="small"
                icon={<FileTextOutlined />}
                onClick={() =>
                  router.push(`/profile/applications/${application.id}`)
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
};
