import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { EllipsisVertical, ShoppingCart } from "lucide-react";
import { DarkModeToggle } from "./DarkModeToggle";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import UserButton from "./UserButton";

const Menu = () => {
  return (
    <>
      <div className="flex justify-end gap-3">
        <nav className="md:flex hidden w-full max-w-xs gap-4">
          <DarkModeToggle />
          <Button variant="ghost" asChild>
            <Link href="/cart">
              <ShoppingCart /> Cart
            </Link>
          </Button>
          <UserButton />
        </nav>

        {/* Mobile Menu */}
        <nav className="md:hidden">
          <Sheet>
            <SheetTrigger className="align-middle">
              <EllipsisVertical />
            </SheetTrigger>
            <SheetContent className="flex flex-col gap-4 items-start p-4">
              <SheetTitle className="mt-8">Menu</SheetTitle>
              <DarkModeToggle />
              <Button variant="ghost" asChild>
                <Link href="/cart">
                  <ShoppingCart /> Cart
                </Link>
              </Button>
              <UserButton />
            </SheetContent>
            <SheetDescription></SheetDescription>
          </Sheet>
        </nav>
      </div>
    </>
  );
};

export default Menu;
