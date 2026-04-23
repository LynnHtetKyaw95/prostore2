"use server";

import {
  paymentMethodSchema,
  shippingAddressSchema,
  signInFormSchema,
  signUpFormSchema,
  updateUserSchema,
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
import { PAGE_SIZE } from "../constants";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import z from "zod";

// Sign in the user with credentials
export async function signInWithCredentials(data: SignInInput) {
  try {
    const user = signInFormSchema.parse(data);

    const res = await signIn("credentials", {
      ...user,
      redirect: false,
      callbackUrl: data.callbackUrl,
    });

    if (res?.error) {
      return {
        success: false,
        message: "Invalid email or password",
      };
    }

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

    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }
}

// Get user
export async function getUser() {
  const session = await auth();

  if (!session) {
    throw new Error("User is not authenticated");
  }

  if (!session?.user?.id) {
    throw new Error("User not found");
  }

  return session.user.id;
}

// Get admin
export async function requireAdmin() {
  const session = await auth();

  if (session?.user?.role !== "admin") {
    redirect("/unauthorized");
  }

  return session;
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

// Get user's orders
export async function getUserOrders({
  limit = PAGE_SIZE,
  page,
}: {
  limit?: number;
  page: number;
}) {
  const userId = await getUser();

  const data = await prisma.order.findMany({
    where: { userId: userId },
    orderBy: { createdAt: "desc" },
    take: limit,
    skip: (page - 1) * limit,
  });

  const dataCount = await prisma.order.count({
    where: { userId: userId },
  });

  return { data, totalPages: Math.ceil(dataCount / limit) };
}

// Update the user profile
export async function updateProfile(user: { name: string; email: string }) {
  try {
    const userId = await getUser();

    const currentUser = await prisma.user.findFirst({
      where: { id: userId },
    });

    if (!currentUser) {
      throw new Error("User not found");
    }

    await prisma.user.update({
      where: { id: currentUser.id },
      data: { name: user.name },
    });

    return { success: true, message: "User updated successfully" };
  } catch (error) {
    return { success: false, message: formatErrors(error) };
  }
}

// Get all users
export async function getAllUsers({
  limit = PAGE_SIZE,
  page,
}: {
  limit?: number;
  page: number;
}) {
  const data = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    take: limit,
    skip: (page - 1) * limit,
  });

  const dataCount = await prisma.user.count();

  return { data, totalPages: Math.ceil(dataCount / limit) };
}

// Delete User
export async function deleteUser(userId: string) {
  try {
    await prisma.user.delete({
      where: { id: userId },
    });

    revalidatePath("/admin/users");

    return { success: true, message: "User deleted successfully" };
  } catch (error) {
    return { success: false, message: formatErrors(error) };
  }
}

// Update User
export async function updateUser(user: z.infer<typeof updateUserSchema>) {
  try {
    await prisma.user.update({
      where: { id: user.id },
      data: {
        name: user.name,
        role: user.role,
      },
    });

    revalidatePath(`/admin/users`);

    return { success: true, message: "User updated successfully" };
  } catch (error) {
    return { success: false, message: formatErrors(error) };
  }
}
