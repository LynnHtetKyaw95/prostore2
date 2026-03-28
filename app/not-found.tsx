"use client";

import { Button } from "@/components/ui/button";
import { APP_NAME } from "@/lib/constants";
import Image from "next/image";
import Link from "next/link";

const NotFound = () => {
  return (
    <div className="flex-center flex-col min-h-screen">
      <Image
        priority={true}
        src="/images/logo.svg"
        width={48}
        height={48}
        alt={`${APP_NAME} logo`}
      />

      <div className="p-6 rounded-lg shadow-md w-1/3 text-center">
        <h1 className="text-3xl font-bold mb-4">Not Found</h1>
        <p className="text-destructive">Could not find requested resource</p>
        <Button asChild variant={"outline"} className="mt-4 ml-2">
          <Link href="/">Back to home</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
