import { Skeleton } from "antd";
import React from "react";

const LoadingScreen = () => (
  <div className="bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-6">
    <div className="w-full max-w-7xl">
      <div className="text-center mb-12">
        <Skeleton.Input
          active
          size="large"
          className="w-64 h-12 mx-auto mb-4"
        />
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Steps Sidebar Skeleton */}
        <div className="w-full lg:w-1/3">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 sticky top-6">
            <Skeleton
              active
              title={{ width: "60%" }}
              paragraph={false}
              className="mb-6"
            />
            <div className="space-y-8">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="flex items-start">
                  <Skeleton.Avatar active size="large" className="mr-4" />
                  <div className="flex-1">
                    <Skeleton
                      active
                      title={{ width: "70%" }}
                      paragraph={{ rows: 1, width: "100%" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Form Skeleton */}
        <div className="w-full lg:w-2/3">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
            <div className="text-center mb-8">
              <Skeleton
                active
                title={{ width: "50%" }}
                paragraph={{ rows: 1, width: "70%" }}
                className="mx-auto"
              />
            </div>

            <div className="space-y-6">
              {[1, 2, 3].map((item) => (
                <div key={item} className="space-y-3">
                  <Skeleton active title={{ width: "40%" }} paragraph={false} />
                  <Skeleton.Input active size="large" className="w-full" />
                </div>
              ))}
            </div>

            <div className="flex justify-between mt-8 pt-6 border-t border-gray-100 dark:border-gray-700">
              <Skeleton.Button active size="large" />
              <Skeleton.Button active size="large" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
export default LoadingScreen;
