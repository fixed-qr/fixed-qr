/*
Validate provided upiId.
*/
export const validateUpiId = (upiId: string) => {
  if (!upiId.trim()) return "UPI ID is required";

  const upiRegex = /^[\w.-]{2,}@[a-zA-Z]{2,}$/;

  if (!upiRegex.test(upiId)) {
    return "Invalid UPI ID";
  }

  return "";
};
