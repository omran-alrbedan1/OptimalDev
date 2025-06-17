"use client";
import { Tabs, Button, Empty } from "antd";
import type { TabsProps } from "antd";
import {
  MailOutlined,
  EnvironmentOutlined,
  FileTextOutlined,
  MessageOutlined,
  BookOutlined,
  SolutionOutlined,
} from "@ant-design/icons";
import Image from "next/image";
import { FaPhoneAlt } from "react-icons/fa";
import { images } from "@/constants/images";
import { Edit } from "lucide-react";
import { useRouter } from "next/navigation";

const ProfilePage = () => {
  const user = {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "0988638009",
    country: "United States",
    city: "New York",
    cvUrl: "/cv/john-doe-cv.pdf",
    image: images.profile,
  };
  const router = useRouter();

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: (
        <span>
          <SolutionOutlined className="mr-2" />
          Applications
        </span>
      ),
      children: (
        <div className="p-6  shadow-md flex justify-center">
          <Empty
            image={"/images/applications.png"}
            imageStyle={{ height: 300, margin: "auto" }}
            className="text-center"
            description={
              <>
                <h2 className="text-xl font-semibold mb-2">
                  No Applications Yet
                </h2>
                <p className="text-gray-500">
                  Start applying to see your applications here
                </p>
              </>
            }
          >
            <Button onClick={() => router.push("/career")} type="primary">
              Browse Jobs
            </Button>
          </Empty>
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <span>
          <BookOutlined className="mr-2" />
          Exams
        </span>
      ),
      children: (
        <div className="p-6  shadow-md flex justify-center">
          <Empty
            image={`/images/exams.png`}
            imageStyle={{ height: 300 }}
            description={
              <>
                <h2 className="text-xl font-semibold mb-2">
                  No Exams Scheduled
                </h2>
                <p className="text-gray-500">
                  Your upcoming exams will appear here
                </p>
              </>
            }
          />
        </div>
      ),
    },
    {
      key: "3",
      label: (
        <span>
          <MessageOutlined className="mr-2" />
          Messages
        </span>
      ),
      children: (
        <div className="p-6  shadow-md flex justify-center">
          <Empty
            image={`/images/messages.png`}
            imageStyle={{ height: 300 }}
            description={
              <>
                <h2 className="text-xl font-semibold mb-2">No Messages</h2>
                <p className="text-gray-500">Your messages will appear here</p>
              </>
            }
          ></Empty>
        </div>
      ),
    },
  ];

  return (
    <div className="container mx-auto mt-20 px-8 py-8">
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row gap-8 mb-8">
        {/* Profile Image */}
        <div className="w-full md:w-1/3 lg:w-1/4 flex justify-center">
          <div className="relative w-64 h-64 rounded-full overflow-hidden shadow-primary-color1 shadow-md">
            <Image
              src={user.image}
              alt={`${user.firstName} ${user.lastName}`}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Profile Info */}
        <div className="w-full md:w-2/3 lg:w-3/4 space-y-6">
          <div>
            <h1 className="text-4xl font-bold dark:text-gray-200">
              {user.firstName} {user.lastName}
            </h1>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <MailOutlined className="text-blue-500" />
              <span className="dark:text-gray-300">{user.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <EnvironmentOutlined className="text-blue-500" />
              <span className="dark:text-gray-300">
                {user.city}, {user.country}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <FaPhoneAlt className="text-blue-500" />
              <span className="dark:text-gray-300">{user.phone}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 pt-4">
            <Button type="default" icon={<FileTextOutlined />}>
              View CV
            </Button>
            <Button type="primary" icon={<Edit className="size-4" />}>
              Edit Profile
            </Button>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <Tabs
        defaultActiveKey="1"
        items={items}
        className="profile-tabs"
        tabBarStyle={{ marginBottom: 0 }}
      />
    </div>
  );
};

export default ProfilePage;
