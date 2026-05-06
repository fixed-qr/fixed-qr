export const validateUpi = (upi: string) => {
  if (!upi.trim()) return "UPI ID is required";

  const upiRegex = /^[\w.-]{2,}@[a-zA-Z]{2,}$/;

  if (!upiRegex.test(upi)) {
    return "Invalid UPI ID";
  }

  return "";
};
