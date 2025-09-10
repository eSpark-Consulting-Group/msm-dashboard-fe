import * as Yup from "yup";

export const loginSchema = Yup.object({
  email: Yup.string()
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Invalid email address"
    )
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(12, "Password must be at least 12 characters long.")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter.")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter.")
    .matches(/[0-9]/, "Password must contain at least one number."),
});

export const loginValidationSchema = Yup.object({
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
});

export const generalScehma = Yup.object({
  username: Yup.string().required("Username is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});

export const passwordScehma = Yup.object({
  password: Yup.string()
    .min(5, "Password must be at least 5 characters")
    .required("Password is required"),
  conPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Please confirm your password"),
});

export const profileSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  dob: Yup.date()
    .nullable()
    .required("Date of Birth is required")
    .max(new Date(), "DOB cannot be in the future"),
  companyName: Yup.string().required("Company name is required"),
  companyMail: Yup.string().matches(
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    "Invalid email address"
  ).required("Company mail is required"),
  phone: Yup.string()
    .required("Phone number is required").max(15, "Phone number must be less than 15 digits").min(10, "Phone number must be greater than 10 digits"),
});
