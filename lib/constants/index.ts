export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || "Prostore";
export const APP_DESCRIPTION =
  process.env.NEXT_PUBLIC_APP_DESCRIPTION ||
  "A modern E-commerce store built with Next.js";

export const SERVER_URL =
  process.env.NEXT_PUBLIC_SERVER_URL || "http://192.168.1.55:3000";

export const LATEST_PRODUCTS_LIMIT =
  Number(process.env.LATEST_PRODUCTS_LIMIT) || 4;

export const signInDefaultValues = {
  email: "",
  password: "",
};

export const signUpDefaultValues = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export const shippingAddressDefaultValues = {
  fullName: "",
  streetAddress: "",
  city: "",
  postalCode: "",
  country: "",
};

export const CHECK_OUT_STEPS = [
  "User Login",
  "Shipping Address",
  "Payment Method",
  "Place Order",
];

// export const PAYMENT_METHODS = ["PayPal", "Stripe", "CashOnDelivery"];

export const PAYMENT_METHODS = [
  { label: "PayPal", value: "paypal" },
  { label: "Stripe", value: "stripe" },
  { label: "Cash On Delivery", value: "cashOnDelivery" },
];

export const DEFAULT_PAYMENT_METHOD = "paypal";

export const PAGE_SIZE = Number(process.env.PAGE_SIZE) || 10;

export const productDefaultValues = {
  name: "",
  slug: "",
  category: "",
  images: [],
  brand: "",
  description: "",
  price: "0",
  stock: 0,
  rating: "0",
  numReviews: "0",
  isFeatured: false,
  banner: null,
};
