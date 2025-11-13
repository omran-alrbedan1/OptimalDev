import { Button } from "antd";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

const SuccessScreen = () => {
  const router = useRouter();
  const t = useTranslations("serviceRequest");
  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-sky-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          duration: 0.6,
          ease: [0.25, 0.46, 0.45, 0.94],
          staggerChildren: 0.1,
        }}
        className="relative mt-12 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl p-10 max-w-lg w-full shadow-2xl border border-white/20 dark:border-gray-700/20 text-center overflow-hidden"
      >
        <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-cyan-200 to-blue-300 dark:from-cyan-600 dark:to-blue-700 rounded-full opacity-20 blur-xl"></div>
        <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-tr from-sky-200 to-cyan-300 dark:from-sky-600 dark:to-cyan-700 rounded-full opacity-15 blur-2xl"></div>

        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            delay: 0.2,
            duration: 0.8,
            type: "spring",
            stiffness: 200,
            damping: 15,
          }}
          className="relative w-24 h-24 bg-gradient-to-br from-[#22ace3] to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, duration: 0.3 }}
          >
            <CheckCircle className="h-12 w-12 text-white drop-shadow-sm" />
          </motion.div>

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1.2, opacity: 0 }}
            transition={{
              delay: 0.8,
              duration: 1.5,
              repeat: Infinity,
              repeatDelay: 2,
            }}
            className="absolute inset-0 rounded-full border-4 border-[#22ace3]"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 dark:from-gray-200 dark:to-gray-400 bg-clip-text text-transparent mb-4 leading-tight">
            {t("success.title")}
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="text-gray-600 dark:text-gray-300 mb-8 text-lg leading-relaxed"
          >
            {t("success.message")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.4 }}
            className="bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 rounded-2xl p-4 mb-8 border border-cyan-200 dark:border-cyan-700"
          >
            <p className="text-sm text-[#22ace3] font-medium">
              ✨ {t("success.responseTime")}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.4 }}
          >
            <Button
              className="group relative w-full bg-gradient-to-r from-[#22ace3] to-cyan-500 hover:from-[#1a9bc7] hover:to-cyan-600 text-white font-semibold py-4 px-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-0 overflow-hidden"
              onClick={() => router.push("/home")}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {t("success.returnHome")}
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                >
                  →
                </motion.span>
              </span>

              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SuccessScreen;
