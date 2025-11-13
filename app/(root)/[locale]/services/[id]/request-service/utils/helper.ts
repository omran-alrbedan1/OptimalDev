export const validateInputByRules = (
  value: string,
  validationRules: string[] | null
): boolean => {
  if (!validationRules || validationRules.length === 0) return true;

  for (const rule of validationRules) {
    switch (rule) {
      case "numeric":
        if (!/^\d+$/.test(value)) return false;
        break;
      case "alpha":
        if (!/[a-zA-Z\s]+$/.test(value)) return false;
        break;
      case "alphanumeric":
        if (!/^[a-zA-Z0-9\s]+$/.test(value)) return false;
        break;
      case "email":
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return false;
        break;
      default:
        break;
    }
  }

  return true;
};
