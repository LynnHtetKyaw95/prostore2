"use client";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { InfoIcon } from "lucide-react";
import Link from "next/link";

interface DetailsButtonProps {
  href: string;
  text: string;
}

const DetailsButton = ({ href, text }: DetailsButtonProps) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button asChild variant={"outline"}>
          <Link href={href}>
            <InfoIcon />
          </Link>
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>{text}</p>
      </TooltipContent>
    </Tooltip>
  );
};
export default DetailsButton;
