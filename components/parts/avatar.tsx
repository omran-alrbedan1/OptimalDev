// utils/avatarHelpers.ts
import Image from "next/image";

export const getUserInitials = (user: any): string => {
  if (!user) return "U";

  const { first_name, last_name } = user;

  if (first_name && last_name) {
    return `${first_name.charAt(0)}${last_name.charAt(0)}`.toUpperCase();
  } else if (first_name) {
    return first_name.charAt(0).toUpperCase();
  } else if (last_name) {
    return last_name.charAt(0).toUpperCase();
  } else if (user.email) {
    return user.email.charAt(0).toUpperCase();
  }

  return "U";
};

export const getUserAvatar = (user: any, size: "sm" | "md" = "md") => {
  const sizeClasses = {
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm",
  };

  if (user?.profile_image) {
    return (
      <Image
        src={user.profile_image}
        className={`rounded-full object-cover ${sizeClasses[size]}`}
        alt="User profile"
        width={size === "sm" ? 32 : 40}
        height={size === "sm" ? 32 : 40}
      />
    );
  }

  const initials = getUserInitials(user);

  return (
    <div
      className={`rounded-full bg-primary flex items-center justify-center text-white font-semibold ${sizeClasses[size]}`}
    >
      {initials}
    </div>
  );
};
