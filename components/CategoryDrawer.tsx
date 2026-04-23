import { getAllCategories } from "@/lib/actions/productAction";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";
import { Button } from "./ui/button";
import { MenuIcon } from "lucide-react";
import Link from "next/link";

const CategoryDrawer = async () => {
  const categories = await getAllCategories();

  return (
    <Drawer direction="left">
      <DrawerTrigger asChild>
        <Button variant={"outline"}>
          <MenuIcon />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="flex flex-col gap-4 items-start p-4">
        <DrawerHeader>
          <DrawerTitle>Select a category</DrawerTitle>
          <div className="space-y-2 mt-4">
            {categories.map((cat) => (
              <Button
                variant={"ghost"}
                className="w-full justify-start"
                key={cat.category}
                asChild
              >
                <DrawerClose asChild>
                  <Link href={`/search?category=${cat.category}`}>
                    {cat.category} ({cat._count})
                  </Link>
                </DrawerClose>
              </Button>
            ))}
          </div>
        </DrawerHeader>
      </DrawerContent>
    </Drawer>
  );
};
export default CategoryDrawer;
