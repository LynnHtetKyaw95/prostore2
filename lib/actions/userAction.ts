"use server";

import {
  paymentMethodSchema,
  shippingAddressSchema,
  signInFormSchema,
  signUpFormSchema,
} from "../zodValidator";
import { auth, signIn, signOut } from "@/auth";
import { prisma } from "@/db/prisma";
import { hashSync } from "bcrypt-ts-edge";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { formatErrors } from "../utils";
import {
  PaymentMethod,
  ShippingAddress,
  SignInInput,
  SignUpInput,
} from "@/types";

// Sign in the user with credentials
export async function signInWithCredentials(data: SignInInput) {
  try {
    const user = signInFormSchema.parse(data);

    await signIn("credentials", {
      ...user,
      redirect: false,
      callbackUrl: data.callbackUrl,
    });

    return { success: true, message: "Signed in successfully" };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }

    return { success: false, message: formatErrors(error) };
  }
}

// Sign user out
export async function signOutUser() {
  await signOut();
}

// Sign user up
export async function signUpUser(data: SignUpInput) {
  try {
    const user = signUpFormSchema.parse(data);

    const plainPassword = user.password;

    user.password = hashSync(user.password, 10);

    await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
      },
    });

    await signIn("credentials", {
      email: user.email,
      password: plainPassword,
      redirect: false,
    });

    return { success: true, message: "User registerd successfully" };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }

    return { success: false, message: formatErrors(error) };
  }
}

// Get user
export async function getUser() {
  const session = await auth();

  return session?.user?.id ? (session.user.id as string) : undefined;
}

// Get user id
export async function getUserById(userId: string) {
  const user = await prisma.user.findFirst({
    where: { id: userId },
  });

  if (!user) {
    throw new Error("User not found");
  }

  return user;
}

// Update the user's address
export async function updateUserAddress(data: ShippingAddress) {
  try {
    const user = await getUser();

    if (!user) {
      throw new Error("User not found");
    }

    const address = shippingAddressSchema.parse(data);

    await prisma.user.update({
      where: { id: user },
      data: { address },
    });

    return { success: true, message: "User updated successfully" };
  } catch (error) {
    return { success: false, message: formatErrors(error) };
  }
}

// Update user's payment method
export async function updateUserPaymentMethod(data: PaymentMethod) {
  try {
    const userId = await getUser();
    const currentUser = await prisma.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (!currentUser) {
      throw new Error("User not found");
    }

    const paymentMethod = paymentMethodSchema.parse(data);

    await prisma.user.update({
      where: { id: currentUser.id },
      data: { paymentMethod: paymentMethod.type },
    });

    return {
      success: true,
      message: "User updated successfully",
    };
  } catch (error) {
    return { success: false, message: formatErrors(error) };
  }
}
