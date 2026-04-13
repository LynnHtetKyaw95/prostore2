"use client";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Trash2Icon } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "sonner";

interface DeleteButtonWithDialogProps {
  id: string;
  action: (id: string) => Promise<{ success: boolean; message: string }>;
}

const DeleteButtonWithDialog = ({
  id,
  action,
}: DeleteButtonWithDialogProps) => {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  function handleDeleteClick() {
    startTransition(async () => {
      const res = await action(id);

      if (!res.success) {
        toast.error(res.message);
      } else {
        setOpen(false);
        toast.success(res.message);
      }
    });
  }

  return (
    <Tooltip>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger asChild>
          <TooltipTrigger asChild>
            <Button variant="destructive" size="icon">
              <Trash2Icon className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
        </AlertDialogTrigger>

        <TooltipContent>
          <p>Delete Order</p>
        </TooltipContent>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you absolutely sure to delete?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>

            <Button
              variant="destructive"
              disabled={isPending}
              onClick={handleDeleteClick}
            >
              {isPending ? "Deleting..." : "Delete"}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Tooltip>
  );
};

export default DeleteButtonWithDialog;
