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

export const userSchema = Yup.object().shape({
  name: Yup.string()
    .required("User name is required")
    .min(2, "User name must be at least 2 characters"),
  label: Yup.string()
    .required("Label is required")
    .min(2, "Label must be at least 2 characters"),
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
  phoneNumber: Yup.string()
    .required("Phone number is required").max(15, "Phone number must be less than 15 digits").min(10, "Phone number must be greater than 10 digits"),
  description: Yup.string()
    .nullable()
    .max(255, "Description cannot exceed 255 characters"),
  method: Yup.string()
    .required("Method is required"),
  owners: Yup.string()
    .required("Owners field is required"),
  customerName: Yup.string()
    .required("Customer name is required"),
  role: Yup.string()
    .required("Role is required"),
});

export const editUserSchema = Yup.object().shape({
  name: Yup.string()
    .required("User name is required")
    .min(2, "Name must be at least 2 characters"),
  password: Yup.string()
    .required("Password is required")
    .min(12, "Password must be at least 12 characters long.")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter.")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter.")
    .matches(/[0-9]/, "Password must contain at least one number."),
  phone_number: Yup.string()
    .required("Phone number is required").max(15, "Phone number must be less than 15 digits").min(10, "Phone number must be greater than 10 digits"),
  customer_name: Yup.string()
    .required("Customer name is required"),
});

