export const validateInputByRules = (value: string, rules: string[]) => {
  if (!value) return false;
  for (const r of rules) {
    switch (r) {
      case "numeric":
        if (!/^[0-9]+$/.test(value)) return false;
        break;
      case "alpha":
        if (!/^[A-Za-z]+$/.test(value)) return false;
        break;
      case "alphanumeric":
        if (!/^[A-Za-z0-9]+$/.test(value)) return false;
        break;
      case "email":
        if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(value)) return false;
        break;
    }
  }
  return true;
};
