"use client";
import { useFetch } from "@/hooks/useFetch";
import { fetchMyApplications } from "@/lib/client-action";
import {
  Card,
  Skeleton,
  Tag,
  Divider,
  Button,
  Avatar,
  Space,
  Typography,
} from "antd";
import {
  CalendarOutlined,
  EnvironmentOutlined,
  DollarOutlined,
  ClockCircleOutlined,
  BankOutlined,
  UserOutlined,
  FileTextOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import { images } from "@/constants/images";

const { Text, Title } = Typography;

export const ApplicationsList = () => {
  const t = useTranslations();
  const router = useRouter();
  const locale = useLocale();
  const { data: applications, isLoading } =
    useFetch<Application[]>(fetchMyApplications);

  console.log(applications);

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
            {t("profilePage.noApplications.title")}
          </Title>
          <Text className="text-gray-500 mb-6 block">
            {t("profilePage.noApplications.description")}
          </Text>
          <Button
            onClick={() => router.push("/career")}
            type="primary"
            size="large"
            className="bg-gradient-to-r from-blue-500 to-purple-600 border-none hover:from-blue-600 hover:to-purple-700"
          >
            {t("profilePage.noApplications.button")}
          </Button>
        </div>
      </motion.div>
    );
  }

  const getStatusConfig = (status: string) => {
    const configs = {
      applied: { color: "blue", text: "Applied", icon: "📝" },
      pending: { color: "orange", text: "Under Review", icon: "⏳" },
      reviewed: { color: "cyan", text: "Reviewed", icon: "👀" },
      shortlisted: { color: "purple", text: "Shortlisted", icon: "⭐" },
      approved: { color: "green", text: "Approved", icon: "✅" },
      rejected: { color: "red", text: "Rejected", icon: "❌" },
      withdrawn: { color: "gray", text: "Withdrawn", icon: "🚫" },
    };
    return (
      configs[status.toLowerCase()] || {
        color: "default",
        text: status,
        icon: "📄",
      }
    );
  };

  const formatSalary = (min: string, max: string) => {
    const minNum = parseFloat(min);
    const maxNum = parseFloat(max);
    return `$${minNum.toLocaleString()} - $${maxNum.toLocaleString()}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(locale, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getDaysUntilExpiry = (expiryDate: string) => {
    const expiry = new Date(expiryDate);
    const today = new Date();
    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="space-y-6 px-4 mt-4">
      <div className="flex justify-between items-center mb-6">
        <div>
          <Title level={4} className="mb-0">
            My Applications
          </Title>
          <Text className="text-gray-500">
            {applications.length} application
            {applications.length !== 1 ? "s" : ""} found
          </Text>
        </div>
      </div>

      {applications.map((app, index) => {
        const statusConfig = getStatusConfig(app.status);
        const job = app.job_opportunity;
        const company = job.company;
        const daysUntilExpiry = getDaysUntilExpiry(job.expires_at);
        const isExpiringSoon = daysUntilExpiry <= 7 && daysUntilExpiry > 0;
        const isExpired = daysUntilExpiry <= 0;

        return (
          <motion.div
            key={app.id}
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

                  <div className="flex flex-col items-end gap-2">
                    <Tag
                      color={statusConfig.color}
                      className="mb-0 px-3 py-1 rounded-full font-medium"
                    >
                      {statusConfig.icon} {statusConfig.text}
                    </Tag>
                    {isExpiringSoon && (
                      <Tag color="orange" className="text-xs">
                        ⚠️ Expires in {daysUntilExpiry} days
                      </Tag>
                    )}
                    {isExpired && (
                      <Tag color="red" className="text-xs">
                        ❌ Expired
                      </Tag>
                    )}
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
                        Salary
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
                        Experience
                      </Text>
                      <Text className="font-medium text-sm">
                        {job.years_experience} years
                      </Text>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-purple-50 dark:bg-purple-900/30 rounded-lg">
                      <ClockCircleOutlined className="text-purple-600" />
                    </div>
                    <div>
                      <Text className="text-xs text-gray-500 block">
                        Contract
                      </Text>
                      <Text className="font-medium text-sm">
                        {job.contract_types_items?.[0]
                          ? job.contract_types_items[0].name
                          : "N/A"}
                      </Text>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-orange-50 dark:bg-orange-900/30 rounded-lg">
                      <EnvironmentOutlined className="text-orange-600" />
                    </div>
                    <div>
                      <Text className="text-xs text-gray-500 block">
                        Work Mode
                      </Text>
                      <Text className="font-medium text-sm">
                        {job.work_modes_items?.[0]
                          ? job.work_modes_items[0].name
                          : "N/A"}
                      </Text>
                    </div>
                  </div>
                </div>

                {/* Skills */}
                {job.technical_skills && (
                  <div className="mb-4">
                    <Text className="text-xs text-gray-500 block mb-2">
                      Required Skills
                    </Text>
                    <div className="flex flex-wrap gap-1">
                      {job.technical_skills?.split(",").map((skill, idx) => (
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
                      Applied: {formatDate(app.applied_at)}
                    </Text>
                    {app.final_score && (
                      <Tag color="gold" className="ml-2">
                        Score: {app.final_score}%
                      </Tag>
                    )}
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
                      Details
                    </Button>
                    <Button
                      type="primary"
                      size="small"
                      icon={<EyeOutlined />}
                      onClick={() => router.push(`/career/${job.id}`)}
                      className="bg-gradient-to-r from-primary-color1/80 to-primary border-none"
                    >
                      View Job
                    </Button>
                  </Space>
                </div>
              </div>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
};
