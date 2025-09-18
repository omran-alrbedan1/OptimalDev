"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFetch } from "@/hooks/useFetch";
import {
  fetchCities,
  fetchCountries,
  fetchProfileInfo,
  updateProfile,
} from "@/lib/client-action";
import { editProfileSchema } from "@/lib/validation/userValidation";
import {
  CameraOutlined,
  CheckOutlined,
  EditOutlined,
  EyeOutlined,
  FileAddOutlined,
  FilePdfOutlined,
  GlobalOutlined,
  LoadingOutlined,
  MailOutlined,
  PhoneOutlined,
  SyncOutlined,
  UploadOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { zodResolver } from "@hookform/resolvers/zod";
import type { UploadProps } from "antd";
import { Avatar, Card, message, Upload } from "antd";
import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { toast } from "sonner";
import * as z from "zod";

type EditProfileValues = z.infer<ReturnType<typeof editProfileSchema>>;

const EditProfilePage = () => {
  const t = useTranslations("editProfile");
  const locale = useLocale();
  const isRTL = locale === "ar";
  const { theme, setTheme } = useTheme();
  const [loading, setLoading] = useState(false);
  const [countries, setCountries] = useState<Country[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [imageLoading, setImageLoading] = useState(true);
  const router = useRouter();

  const { data: profileData, isLoading: profileLoading } =
    useFetch<User>(fetchProfileInfo);
  console.log(profileData);
  const form = useForm<EditProfileValues>({
    resolver: zodResolver(editProfileSchema(t)),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      country_id: "",
      city_id: "",
    },
  });

  useEffect(() => {
    if (profileData) {
      form.reset({
        first_name: profileData.first_name,
        last_name: profileData.last_name,
        email: profileData.email,
        phone: profileData.phone,
        country_id: profileData.country_id?.toString() || "",
        city_id: profileData.city_id?.toString() || "",
      });
      getCountries();
    }
  }, [profileData]);

  useEffect(() => {
    if (profileData?.country_id) {
      getCities(profileData?.country_id);
    }
  }, [profileData?.country_id]);

  const getCountries = async () => {
    try {
      const response = await fetchCountries();
      //@ts-ignore
      console.log(response);
      setCountries(response);
    } catch (error) {
      console.log(error);
      message.error(t("messages.countriesError"));
    }
  };

  const getCities = async (countryId: number) => {
    try {
      const response = await fetchCities(countryId);
      //@ts-ignore
      setCities(response);
    } catch (error) {
      message.error(t("messages.citiesError"));
    }
  };

  const handleProfileImageUpload: UploadProps["onChange"] = (info) => {
    if (info.file.originFileObj) {
      setProfileImageFile(info.file.originFileObj);
      message.success(`${info.file.name} ${t("messages.fileSelected")}`);
    }
  };

  const handleCvUpload: UploadProps["onChange"] = (info) => {
    if (info.file.originFileObj) {
      setCvFile(info.file.originFileObj);
      message.success(`${info.file.name} ${t("messages.fileSelected")}`);
    }
  };

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value ? Number(e.target.value) : undefined;
    form.setValue("country_id", value?.toString() || "");
    form.resetField("city_id");
    if (value) {
      getCities(value);
    }
  };

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value ? Number(e.target.value) : undefined;
    form.setValue("city_id", value?.toString() || "");
  };
  // في الجزء العلوي من الملف، أضف هذا التحقق
  const isServer = typeof window === "undefined";

  // ثم في دالة onSubmit، غلّف الجزء المتعلق بـ File بشرط
  const onSubmit = async (values: EditProfileValues) => {
    setLoading(true);
    try {
      const updateData = {
        ...values,
        country_id: values.country_id ? Number(values.country_id) : undefined,
        city_id: values.city_id ? Number(values.city_id) : undefined,
      };

      // فقط على العميل (المتصفح) أضف ملفات الصور والسيرة الذاتية
      if (!isServer) {
        Object.assign(updateData, {
          profile_image:
            profileImageFile || profileData?.profile_image || undefined,
          cv: cvFile || undefined,
        });
      }

      await updateProfile(updateData);
      toast.success(t("toast.success"));
      router.push("/profile");
    } catch (error) {
      console.error("Update error:", error);
      toast.error(t("toast.error"));
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen  relative overflow-hidden">
      <div className="relative mt-8 z-10 max-w-7xl mx-auto px-4 sm:px-6   py-8 lg:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className=" rounded-3xl  shadow-md border border-white/20 dark:border-slate-700/50 overflow-hidden"
          >
            <Card className="p-4">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8"
                >
                  <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 lg:gap-12">
                    <motion.div
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6, duration: 0.6 }}
                      className="xl:col-span-1"
                    >
                      <div className="  dark:from-slate-800 dark:to-slate-700 rounded-2xl p-3 border border-slate-200 shadow-sm dark:border-slate-600/50 ">
                        <div className="text-center flex flex-col">
                          <div className="relative inline-block  mb-6">
                            <motion.div
                              whileHover={{ scale: 1.05 }}
                              transition={{ type: "spring", stiffness: 300 }}
                              className="relative group"
                            >
                              <Avatar
                                size={140}
                                src={
                                  profileImageFile
                                    ? URL.createObjectURL(profileImageFile)
                                    : profileData?.profile_image || undefined
                                }
                                icon={<UserOutlined className="text-4xl" />}
                                className="relative border-4 border-white dark:border-slate-700 shadow-2xl"
                              />
                              <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                <div className="bg-white/90 dark:bg-slate-800/90 p-3 rounded-full shadow-lg">
                                  <CameraOutlined className="text-xl text-slate-700 dark:text-slate-300" />
                                </div>
                              </div>
                            </motion.div>
                          </div>

                          <Upload
                            name="profile_image"
                            beforeUpload={(file) => {
                              setProfileImageFile(file);
                              return false;
                            }}
                            onChange={handleProfileImageUpload}
                            showUploadList={false}
                            accept="image/*"
                            className="w-full"
                          >
                            <motion.div
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <Button
                                type="button"
                                className="w-full bg-gradient-to-r from-[#22ace3] to-[#1d9bd1] hover:from-[#1d9bd1] hover:to-[#188cb8] text-white font-semibold py-3 px-4 rounded-[4px] shadow-lg hover:shadow-xl transition-all duration-300 border-0"
                              >
                                <UploadOutlined className="mr-2 text-base" />
                                {t("photoSection.changePhoto")}
                              </Button>
                            </motion.div>
                          </Upload>
                        </div>
                      </div>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8, duration: 0.6 }}
                        className="mt-6 dark:from-slate-800 dark:to-cyan-900/20 rounded-2xl p-6 border border-slate-200 dark:border-slate-600/50 shadow-sm"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-x-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-[#22ace3] to-[#1d9bd1] rounded-[4px] flex items-center justify-center mr-3 shadow-lg">
                              <FilePdfOutlined className="text-white text-lg" />
                            </div>
                            <div>
                              <h3 className="font-bold text-slate-800 dark:text-slate-200 text-base">
                                {t("photoSection.cvSection.title")}
                              </h3>
                              <p className="text-xs text-slate-500 dark:text-slate-400">
                                PDF, DOC, DOCX
                              </p>
                            </div>
                          </div>

                          {(cvFile || profileData?.cv_path) && (
                            <motion.a
                              whileHover={{ scale: 1.05 }}
                              href={
                                cvFile
                                  ? URL.createObjectURL(cvFile)
                                  : profileData?.cv_path || "#"
                              }
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center text-[#22ace3] dark:text-[#22ace3] hover:text-[#1d9bd1] dark:hover:text-[#1d9bd1] font-medium text-sm"
                            >
                              <EyeOutlined className="mr-1" />
                              {t("actions.view")}
                            </motion.a>
                          )}
                        </div>

                        <div
                          className={`border-2 border-dashed rounded-[4px] p-6 mb-4 text-center transition-all duration-300 ${
                            cvFile || profileData?.cv_path
                              ? "border-primary/50 dark:border-[#22ace3]/50 bg-[#22ace3]/10 dark:bg-[#22ace3]/20"
                              : "border-slate-300 dark:border-slate-600 bg-slate-50/50 dark:bg-slate-800/50"
                          }`}
                        >
                          {cvFile || profileData?.cv_path ? (
                            <div className="text-[#22ace3] dark:text-[#22ace3]">
                              <div className="relative inline-block mb-2">
                                <FilePdfOutlined className="text-3xl" />
                                <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#22ace3] rounded-full flex items-center justify-center">
                                  <CheckOutlined className="text-white text-xs" />
                                </div>
                              </div>
                              <p className="font-medium text-sm">
                                {t("photoSection.cvSection.cvUploaded")}
                              </p>
                            </div>
                          ) : (
                            <div className="text-slate-400 dark:text-slate-500">
                              <FileAddOutlined className="text-3xl mb-2" />
                              <p className="text-sm">
                                {t("photoSection.cvSection.uploadNewCV")}
                              </p>
                            </div>
                          )}
                        </div>

                        <Upload
                          name="cv"
                          beforeUpload={(file) => {
                            setCvFile(file);
                            return false;
                          }}
                          onChange={handleCvUpload}
                          showUploadList={false}
                          accept=".pdf,.doc,.docx"
                          className="w-full"
                        >
                          <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <Button
                              type="button"
                              variant={
                                cvFile || profileData?.cv_path
                                  ? "outline"
                                  : "default"
                              }
                              className={`w-full font-semibold py-3 px-4 rounded-[4px] shadow-lg hover:shadow-xl transition-all duration-300 ${
                                cvFile || profileData?.cv_path
                                  ? "border-2 border-[#22ace3] text-[#22ace3] hover:bg-[#22ace3]/10 dark:border-[#22ace3] dark:text-[#22ace3] dark:hover:bg-[#22ace3]/20"
                                  : "bg-gradient-to-r from-[#22ace3] to-[#1d9bd1] hover:from-[#1d9bd1] hover:to-[#188cb8] text-white border-0"
                              }`}
                            >
                              {cvFile || profileData?.cv_path ? (
                                <>
                                  <SyncOutlined className="mr-2" />
                                  {t("photoSection.cvSection.changeCV")}
                                </>
                              ) : (
                                <>
                                  <UploadOutlined className="mr-2" />
                                  {t("photoSection.cvSection.uploadNewCV")}
                                </>
                              )}
                            </Button>
                          </motion.div>
                        </Upload>
                      </motion.div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6, duration: 0.6 }}
                      className="xl:col-span-2"
                    >
                      <div className="dark:from-slate-800 dark:to-primary-color1/20 rounded-2xl p-8 border border-slate-200/50 dark:border-slate-600/50">
                        <div className="flex items-center mb-8 gap-x-3">
                          <div className="w-12 h-12 bg-primary-color1 rounded-[4px] flex items-center justify-center mr-4 shadow-lg">
                            <UserOutlined className="text-white text-xl" />
                          </div>
                          <div>
                            <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200">
                              {t("title")}
                            </h3>
                            <p className="text-slate-500 dark:text-slate-400">
                              {t("subtitle")}
                            </p>
                          </div>
                        </div>

                        <div className="space-y-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                              control={form.control}
                              name="first_name"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-slate-700 dark:text-slate-300 font-semibold flex items-center text-sm gap-x-1">
                                    <EditOutlined className="mr-2 text-primary-color1" />
                                    {t("form.firstName.label")}
                                  </FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder={t(
                                        "form.firstName.placeholder"
                                      )}
                                      {...field}
                                      className="h-12 bg-white/50 dark:bg-slate-700/50 border-slate-300 border dark:border-slate-600 rounded-[4px] shadow-sm focus:ring-2 focus:ring-primary-color1 focus:border-primary-color1 transition-all duration-200"
                                    />
                                  </FormControl>
                                  <FormMessage className="text-red-500" />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="last_name"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-slate-700 dark:text-slate-300 font-semibold flex items-center text-sm gap-x-1">
                                    <EditOutlined className="mr-2 text-primary-color1" />
                                    {t("form.lastName.label")}
                                  </FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder={t(
                                        "form.lastName.placeholder"
                                      )}
                                      {...field}
                                      className="h-12 bg-white/50 dark:bg-slate-700/50 border-slate-300 border dark:border-slate-600 rounded-[4px] shadow-sm focus:ring-2 focus:ring-primary-color1 focus:border-primary-color1 transition-all duration-200"
                                    />
                                  </FormControl>
                                  <FormMessage className="text-red-500" />
                                </FormItem>
                              )}
                            />
                          </div>

                          <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-slate-700 dark:text-slate-300 font-semibold flex items-center text-sm gap-x-1">
                                  <MailOutlined className="mr-2 text-primary-color1" />
                                  {t("form.email.label")}
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder={t("form.email.placeholder")}
                                    {...field}
                                    className="h-12 bg-white/50 dark:bg-slate-700/50 border-slate-300 border dark:border-slate-600 rounded-[4px] shadow-sm focus:ring-2 focus:ring-primary-color1 focus:border-primary-color1 transition-all duration-200"
                                  />
                                </FormControl>
                                <FormMessage className="text-red-500" />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-slate-700 dark:text-slate-300 font-semibold flex items-center text-sm gap-x-1">
                                  <PhoneOutlined className="mr-2 text-primary-color1" />
                                  {t("form.phone.label")}
                                </FormLabel>
                                <FormControl>
                                  <div className="relative">
                                    <PhoneInput
                                      country={"jo"}
                                      value={field.value}
                                      onChange={(phone) =>
                                        field.onChange(phone)
                                      }
                                      containerClass="w-full"
                                      buttonClass=" !h-12 !border-slate-300 dark:!border-slate-600 !bg-white/50 dark:!bg-slate-700/50  !rounded-l-[1px] rtl:!rounded-r-[1px] rtl:!rounded-l-none rtl:!pr-2 dark:hover:bg-gray-900"
                                      dropdownClass="!bg-white dark:!bg-slate-800 !border-slate-300 dark:!border-slate-600 !shadow-xl  !rounded-lg"
                                      inputClass="!h-12  !w-full  rtl:pr-16 !rounded-[4px] !border-slate-300 dark:!border-slate-600 !bg-white/50 dark:!bg-slate-700/50 !shadow-sm focus:!ring-2 focus:!ring-primary-color1 focus:!border-primary-color1 !transition-all !duration-200"
                                      inputStyle={{
                                        direction:
                                          useLocale() === "ar" ? "ltr" : "ltr",
                                        textAlign:
                                          useLocale() === "ar"
                                            ? "right"
                                            : "left",
                                      }}
                                      buttonStyle={{
                                        direction:
                                          useLocale() === "ar" ? "ltr" : "ltr",
                                      }}
                                      placeholder={
                                        useLocale() === "ar"
                                          ? "رقم الهاتف"
                                          : "Phone Number"
                                      }
                                      containerStyle={{
                                        direction:
                                          useLocale() === "ar" ? "rtl" : "ltr",
                                      }}
                                    />
                                  </div>
                                </FormControl>
                                <FormMessage className="text-red-500" />
                              </FormItem>
                            )}
                          />

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                              control={form.control}
                              name="country_id"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-slate-700 mt-1 dark:text-slate-300 font-semibold flex items-center text-sm gap-x-1">
                                    <GlobalOutlined className="mr-2 text-primary-color1" />
                                    {t("form.country.label")}
                                  </FormLabel>
                                  <FormControl>
                                    <select
                                      value={field.value}
                                      onChange={handleCountryChange}
                                      className="h-12 w-full bg-white/50 dark:bg-slate-700/50 border border-slate-300 dark:border-slate-600 rounded-[4px] shadow-sm focus:ring-2 focus:ring-primary-color1 focus:border-primary-color1 transition-all duration-200 px-4 focus-within:border-none focus-within:outline-none"
                                    >
                                      <option value="">
                                        {t("form.country.select")}
                                      </option>
                                      {countries.map((country) => (
                                        <option
                                          key={country.id}
                                          value={country.id}
                                        >
                                          {country.name}
                                        </option>
                                      ))}
                                    </select>
                                  </FormControl>
                                  <FormMessage className="text-red-500" />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="city_id"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-slate-700 dark:text-slate-300 font-semibold text-sm gap-x-1">
                                    {t("form.city.label")}
                                  </FormLabel>
                                  <FormControl>
                                    <select
                                      value={field.value}
                                      onChange={handleCityChange}
                                      disabled={!form.watch("country_id")}
                                      className="h-12 w-full bg-white/50 dark:bg-slate-700/50 border border-slate-300 dark:border-slate-600 rounded-[4px] shadow-sm focus:ring-2 focus:ring-primary-color1 focus:border-primary-color1 transition-all duration-200 px-4 focus-within:border-none focus-within:outline-none"
                                    >
                                      <option value="">
                                        {t("form.city.select")}
                                      </option>
                                      {cities.map((city) => (
                                        <option key={city.id} value={city.id}>
                                          {city.name}
                                        </option>
                                      ))}
                                    </select>
                                  </FormControl>
                                  <FormMessage className="text-red-500" />
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>
                      </div>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1, duration: 0.6 }}
                        className="flex justify-center pt-8 md:pt-2 "
                      >
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="  ml-auto w-fit"
                        >
                          <Button
                            type="submit"
                            disabled={loading}
                            className=" bg-gradient-to-r from-primary-color1 via-primary-color1/90 to-primary-color1/80 hover:from-primary-color1 hover:via-primary-color1 hover:to-primary-color1 text-white rounded-[4px] shadow-xl hover:shadow-2xl transition-all duration-300 border-0 relative overflow-hidden group"
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                            {loading ? (
                              <>
                                <LoadingOutlined className="mr-3 text-md animate-spin" />
                                {t("form.updating")}
                              </>
                            ) : (
                              <>
                                <CheckOutlined className="mr-3 text-xl" />
                                {t("form.updateButton")}
                              </>
                            )}
                          </Button>
                        </motion.div>
                      </motion.div>
                    </motion.div>
                  </div>
                </form>
              </Form>
            </Card>
          </motion.div>
        </motion.div>
      </div>
      {theme === "dark" && (
        <style>{`
            select option:checked {
              background-color: rgb(71 85 105);
              color: rgb(226 232 240);
            }
            .react-tel-input .flag-dropdown {
              background-color: transparent;
            }
            .react-tel-input .country-list {
              background-color: rgb(30 41 59);
              color: rgb(226 232 240); 
            }
            .react-tel-input .country-list .country:hover {
              background-color: rgb(51 65 85); 
            }
            .react-tel-input .country-list .country.highlight {
              background-color: rgb(51 65 85); 
            }
            select option {
              background-color: rgb(30 41 59);
              color: rgb(226 232 240); 
            }
            select:focus option:checked {
              background-color: rgb(51 65 85); 
            } 
            .react-tel-input .flag-dropdown {
              background-color: transparent;
              border-right: 1px solid rgb(203 213 225);
            }
            .dark .react-tel-input .flag-dropdown {
              border-right-color: rgb(71 85 105);
            }
            .react-tel-input .flag-dropdown:hover,
            .react-tel-input .flag-dropdown:focus-within {
              background-color: rgba(0, 0, 0, 0.05); 
            }
            .dark .react-tel-input .flag-dropdown:hover,
            .dark .react-tel-input .flag-dropdown:focus-within {
              background-color: rgba(255, 255, 255, 0.05); 
            }
            .react-tel-input .selected-flag {
              background-color: transparent !important;
            }
            .react-tel-input .selected-flag:hover {
              background-color: transparent !important;
            }
            .react-tel-input .selected-flag .arrow {
              border-top-color: rgb(100 116 139); 
            }
            .dark .react-tel-input .selected-flag .arrow {
              border-top-color: rgb(203 213 225);
            }
            .react-tel-input .selected-flag .arrow.up {
              border-bottom-color: rgb(100 116 139); 
            }
            .dark .react-tel-input .selected-flag .arrow.up {
              border-bottom-color: rgb(203 213 225);
            }
        `}</style>
      )}
    </div>
  );
};

export default EditProfilePage;
