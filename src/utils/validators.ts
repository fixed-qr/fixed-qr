import { User } from "@/types/user";

/*
Validate provide user.
*/
export const validateUser = (user: User) => {
  const errors: Partial<User> = {};

  if (!user.name.trim()) {
    errors.name = "Name is required";
  } else if (/^[A-Za-z]+( [A-Za-z]+)*$/.test(user.name)) {
    errors.name = "Only letters and single space allowed";
  }

  if (!user.password.trim()) {
    errors.password = "Password is required";
  } else if (!/(?=.*[A-Za-z])(?=.*\d).{6,}/.test(user.password)) {
    errors.password = "Min 6 chars, include letters & numbers";
  }

  return errors;
};

/*
Validate provided upi.
*/
export const validateUpi = (upi: string) => {
  if (!upi.trim()) return "UPI ID is required";

  const upiRegex = /^[\w.-]{2,}@[a-zA-Z]{2,}$/;

  if (!upiRegex.test(upi)) {
    return "Invalid UPI ID";
  }

  return "";
};
