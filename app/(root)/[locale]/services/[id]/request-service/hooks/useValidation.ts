import { validateInputByRules } from "../utils/helper";

export const useValidation = (t: any) => {
  const getErrorMessage = (rules: string[]) => {
    const messages: Record<string, string> = {
      numeric: t("validationErrors.enterNumbersOnly"),
      alpha: t("validationErrors.enterLettersOnly"),
      alphanumeric: t("validationErrors.enterLettersNumbersOnly"),
      email: t("validationErrors.enterValidEmail"),
    };
    return rules.map((r) => messages[r]).filter(Boolean)[0] || "";
  };

  const isValid = (value: string, rules: string[]) =>
    validateInputByRules(value, rules);

  return { getErrorMessage, isValid };
};
