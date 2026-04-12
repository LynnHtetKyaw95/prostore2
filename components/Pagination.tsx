"use client";

import { usePathname, useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { Button } from "./ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface PaginationProps {
  page: number | string;
  totalPages: number;
  urlParaName?: string;
}

const Pagination = ({ page, totalPages, urlParaName }: PaginationProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  function handleClick(btnType: string) {
    const currentPage =
      btnType === "next" ? Number(page) + 1 : Number(page) - 1;

    const params = new URLSearchParams(searchParams);
    params.set("page", currentPage.toString());

    router.replace(`${pathname}?${params}`);
  }

  return (
    <div className="flex gap-8 items-center">
      <Button
        size={"lg"}
        variant={"outline"}
        className="w-28"
        disabled={Number(page) <= 1}
        onClick={() => handleClick("prev")}
      >
        <ArrowLeft /> Previous
      </Button>
      <span className="font-bold">{page}</span>
      <Button
        size={"lg"}
        variant={"outline"}
        className="w-28"
        disabled={Number(page) >= totalPages}
        onClick={() => handleClick("next")}
      >
        Next <ArrowRight />
      </Button>
    </div>
  );
};

export default Pagination;
