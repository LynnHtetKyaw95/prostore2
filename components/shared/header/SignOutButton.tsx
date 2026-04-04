"use client";

import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

export function SignOutButton() {
  return (
    <form
      action={async () => {
        await signOut({ callbackUrl: "/" });
      }}
      className="w-full"
    >
      <Button className="w-full py-2 px-0 justify-start" variant={"ghost"}>
        Sign Out
      </Button>
    </form>
  );
}