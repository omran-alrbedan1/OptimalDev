"use client";
import { MessageOutlined, LockOutlined } from "@ant-design/icons";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { User } from "lucide-react";
import { fetchConversations } from "@/lib/client-action";

const MessageLists = () => {
  const t = useTranslations("chat");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);

  const [shouldRefreshMessages, setShouldRefreshMessages] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadMessages = async () => {
      setIsLoadingMessages(true);
      try {
        const conversations = await fetchConversations();
        if (conversations?.messages) {
          setMessages(conversations.messages);
        }
      } catch (error) {
        console.error("Failed to load messages:", error);
      } finally {
        setIsLoadingMessages(false);
      }
    };

    loadMessages();
  }, [shouldRefreshMessages]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="mt-10 flex flex-col lg:flex-row gap-6 min-h-[500px]">
      <div className="hidden lg:flex lg:w-2/5 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-900/20 dark:via-indigo-900/20 dark:to-purple-900/20 rounded-[5px] p-8 items-center justify-center relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-primary/10 dark:bg-blue-800/20 rounded-full blur-xl"></div>

        <div className="text-center relative z-10">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative mb-8"
          >
            <div className="w-48 h-48 mx-auto bg-gradient-to-br from-blue-50 to-blue-200 dark:from-[#1976d2] dark:to-[#0d47a1] rounded-full flex items-center justify-center shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10 dark:opacity-5"></div>
              <MessageOutlined className="text-6xl text-primary-color1  transform transition-transform hover:scale-110" />
            </div>

            <motion.div
              animate={{
                y: [-5, 5, -5],
                rotate: [0, 10, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -top-4 -right-4 w-12 h-12 bg-primary rounded-full blur-[1px]"
            ></motion.div>

            <motion.div
              animate={{
                y: [5, -5, 5],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }}
              className="absolute -bottom-2 -left-6 w-8 h-8 bg-green-400/60 rounded-full"
            ></motion.div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-gray-600 dark:text-gray-300 leading-relaxed max-w-xs text-lg font-light"
          >
            {t("adminDescription") ||
              "Stay connected with our admin team through secure and beautiful message interface."}
          </motion.p>
        </div>
      </div>
      <div className="flex-1 lg:w-3/5">
        <div className="bg-white dark:bg-gray-800 rounded-[5px] border border-gray-200 dark:border-gray-700 overflow-hidden shadow-2xl h-[600px] flex flex-col transform transition-all hover:shadow-xl">
          <div
            className={`${
              useLocale() === "ar" ? "bg-gradient-to-l" : "bg-gradient-to-r"
            } from-[#22ace3] to-[#1e88e5] dark:from-[#1976d2] dark:to-[#0d47a1] p-4 text-white relative overflow-hidden`}
          >
            <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10"></div>
            <div className="flex items-center gap-x-3 relative z-10">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm shadow-md">
                <User className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-lg flex items-center">
                  {t("adminSupport")}
                </h3>
              </div>
            </div>

            <div className="absolute top-0 right-0 w-16 h-16 bg-white/10 rounded-bl-full"></div>
          </div>

          <div className="flex-1 overflow-y-auto p-6 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 relative">
            <div className="absolute inset-0 bg-[url('/subtle-pattern.svg')] opacity-10 dark:opacity-5"></div>

            {isLoadingMessages ? (
              <div className="flex justify-center items-center h-full relative z-10">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#22ace3] border-t-transparent mx-auto mb-4"></div>
                  <p className="text-gray-500 dark:text-gray-400">
                    {t("loadingMessages") || "Loading your messages..."}
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-6 relative z-10">
                {messages
                  .filter(
                    (message) => message.sender_type === "App\\Models\\Admin"
                  )
                  .map((message, index, filteredMessages) => {
                    const showDate =
                      index === 0 ||
                      formatDate(filteredMessages[index - 1].created_at) !==
                        formatDate(message.created_at);

                    return (
                      <div key={message.id}>
                        {showDate && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex justify-center my-6"
                          >
                            <div className="bg-gradient-to-r from-[#e6f7ff] to-[#b3e5fc] dark:from-[#0d47a1] dark:to-[#1976d2] px-4 py-2 rounded-full shadow-sm border border-white/50 dark:border-gray-700/50">
                              <span className="text-sm font-medium text-[#22ace3] dark:text-[#4fc3f7]">
                                {formatDate(message.created_at)}
                              </span>
                            </div>
                          </motion.div>
                        )}
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          className="flex items-start gap-x-4"
                        >
                          <div className="flex-shrink-0 relative">
                            <div className="w-12 h-12 bg-gradient-to-br from-[#22ace3] to-[#1e88e5] rounded-full flex items-center justify-center shadow-lg">
                              <User className="w-6 h-6 text-white" />
                            </div>
                          </div>

                          <div className="flex-1 max-w-[80%]">
                            <div className="flex items-center gap-x-2 mb-2">
                              <span className="font-semibold text-[#22ace3] dark:text-[#4fc3f7] text-sm">
                                {t("adminSupport")}
                              </span>
                              <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                              <span
                                className="text-xs  text-gray-500 dark:text-gray-400"
                                dir={useLocale() === "ar" ? "ltr" : "ltr"}
                              >
                                {formatTime(message.created_at)}
                              </span>
                            </div>

                            <div className="relative">
                              <div
                                className={`absolute ${
                                  useLocale() === "ar" ? "-right-2" : "-left-2"
                                } top-4 w-4 h-4 bg-white dark:bg-gray-700 transform rotate-45 border-l border-t border-gray-50 dark:border-gray-600`}
                              ></div>
                              <div
                                className={`bg-white dark:bg-gray-700 rounded-2xl ${
                                  useLocale() === "ar"
                                    ? "rounded-tr-none"
                                    : "rounded-tl-none"
                                } p-4 shadow-sm border border-gray-100 dark:border-gray-600`}
                              >
                                <p className="text-gray-800 dark:text-gray-200 leading-relaxed">
                                  {message.message}
                                </p>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      </div>
                    );
                  })}

                {messages.filter((m) => m.sender_type === "App\\Models\\Admin")
                  .length === 0 &&
                  !isLoadingMessages && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                      className="text-center py-12"
                    >
                      <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-full flex items-center justify-center shadow-inner">
                        <MessageOutlined className="text-3xl text-gray-400" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-300 mb-3">
                        {t("noMessages") || "No Messages Yet"}
                      </h3>
                      <p className="text-gray-500 dark:text-gray-400 max-w-sm mx-auto leading-relaxed">
                        {t("noMessagesDescription") ||
                          "When our admin team sends you important updates, they'll appear in this beautifully designed space."}
                      </p>
                    </motion.div>
                  )}

                <div ref={messagesEndRef} />
              </div>
            )}
          </div>

          <div className="bg-gray-50 dark:bg-gray-800 p-4 border-t border-gray-200 dark:border-gray-600 relative">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#22ace3] via-[#1e88e5] to-[#1976d2]"></div>
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-500 dark:text-gray-300">
              <MessageOutlined className="w-4 h-4 text-[#22ace3]" />
              <span>{t("readOnly") || "Secure messages from admin team"}</span>
              <LockOutlined className="w-3 h-3 ml-2 text-[#4caf50]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageLists;
