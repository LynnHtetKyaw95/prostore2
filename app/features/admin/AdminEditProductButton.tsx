"use client";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Edit2Icon } from "lucide-react";
import Link from "next/link";

interface AdminEditProductButtonProps {
  href: string;
  text: string;
}

const AdminEditProductButton = ({
  href,
  text,
}: AdminEditProductButtonProps) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button asChild variant={"outline"}>
          <Link href={href}>
            <Edit2Icon />
          </Link>
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>{text}</p>
      </TooltipContent>
    </Tooltip>
  );
};
export default AdminEditProductButton;
