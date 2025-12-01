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
    .required("Password is required")
    .min(12, "Password must be at least 12 characters long.")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter.")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter.")
    .matches(/[0-9]/, "Password must contain at least one number."),
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
  companyMail: Yup.string()
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Invalid email address"
    )
    .required("Company mail is required"),
  phone: Yup.string()
    .required("Phone number is required")
    .max(15, "Phone number must be less than 15 digits")
    .min(10, "Phone number must be greater than 10 digits"),
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
  // password: Yup.string()
  //   .required("Password is required")
  //   .min(12, "Password must be at least 12 characters long.")
  //   .matches(/[A-Z]/, "Password must contain at least one uppercase letter.")
  //   .matches(/[a-z]/, "Password must contain at least one lowercase letter.")
  //   .matches(/[0-9]/, "Password must contain at least one number."),
  phoneNumber: Yup.string()
    .required("Phone number is required")
    .max(15, "Phone number must be less than 15 digits")
    .min(10, "Phone number must be greater than 10 digits"),
  description: Yup.string()
    .nullable()
    .max(255, "Description cannot exceed 255 characters"),
  // method: Yup.string()
  //   .required("Method is required"),
  // owners: Yup.string()
  //   .required("Owners field is required"),
  customerName: Yup.string().required("Customer name is required"),
  role: Yup.string().required("Role is required"),
});

export const editUserSchema = Yup.object().shape({
  name: Yup.string()
    .required("User name is required")
    .min(2, "Name must be at least 2 characters"),
  phone_number: Yup.string()
    .required("Phone number is required")
    .max(15, "Phone number must be less than 15 digits")
    .min(10, "Phone number must be greater than 10 digits"),
  customer_name: Yup.string().required("Customer name is required"),
});

export const deviceSchema = Yup.object().shape({
  name: Yup.string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters"),

  device_uuid: Yup.string().required("Device Id is required"),

  // label: Yup.string()
  //   .required("Label is required"),

  // deviceProfile: Yup.string()
  //   .required("Device profile is required"),

  // description: Yup.string()
  //   .required("Description is required"),

  // owners: Yup.string()
  //   .required("Owner is required"),

  groups: Yup.string().required("Please select a group"),

  // accessToken: Yup.string()
  //   .required("Access token is required"),

  // x509: Yup.string()
  //   .required("X.509 certificate is required"),

  // clientId: Yup.string()
  //   .required("MQTTS Client ID is required"),

  // user: Yup.string()
  //   .required("MQTTS User is required"),

  // userName: Yup.string()
  //   .required("MQTTS Username is required"),

  password: Yup.string().required("MQTTS Password is required"),
});

export const verifyEmailSchema = Yup.object({
  email: Yup.string()
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Invalid email address"
    )
    .required("Email is required"),
});

export const passwordScehma2 = Yup.object({
  oldPassword: Yup.string()
    .required("Password is required")
    .min(12, "Password must be at least 12 characters long.")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter.")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter.")
    .matches(/[0-9]/, "Password must contain at least one number."),
  newPassword: Yup.string()
    .required("Password is required")
    .min(12, "Password must be at least 12 characters long.")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter.")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter.")
    .matches(/[0-9]/, "Password must contain at least one number."),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
    .required("Please confirm your password"),
});

export const editDeviceSchema = Yup.object({
  deviceName: Yup.string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters"),

  deviceId: Yup.string().required("Device Id is required"),

  groups: Yup.string().required("Please select a group"),
});

export const mqttSettingsSchema = Yup.object().shape({
  broker_ip: Yup.string().required("Broker IP is required"),

  broker_pass: Yup.string().required("Broker Password is required"),

  broker_port: Yup.string().required("Broker Port is required"),

  broker_user: Yup.string().required("Broker Username is required"),

  data_interval: Yup.number()
    .typeError("Data Interval must be a number")
    .required("Data Interval is required")
    .min(1, "Data Interval must be at least 1"),

  mqtt_topic: Yup.string().required("MQTT Topic is required"),
});

export const sftpSettingsSchema = Yup.object().shape({
  server_ip: Yup.string().required("Server IP is required"),

  server_port: Yup.number()
    .typeError("Server Port must be a number")
    .required("Server Port is required"),

  username: Yup.string().required("Username is required"),

  password: Yup.string().required("Password is required"),

  data_interval: Yup.number()
    .typeError("Data Interval must be a number")
    .required("Data Interval is required")
    .min(1, "Data Interval must be at least 1"),
});

export const ntpSettingsSchema = Yup.object().shape({
  server_1: Yup.string().required("Server 1 is required"),
  server_2: Yup.string().required("Server 2 is required"),
  server_3: Yup.string().required("Server 3 is required"),
});
