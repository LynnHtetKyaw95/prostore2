import AdminProductsTable from "@/app/features/admin/AdminProductsTable";
import Heading from "@/components/Heading";
import Pagination from "@/components/Pagination";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getAllProducts } from "@/lib/actions/productAction";
import { X } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Products",
};

const AdminProductsPage = async (props: {
  searchParams: Promise<{ page: string; query: string; category: string }>;
}) => {
  const searchParams = await props.searchParams;

  const page = Number(searchParams.page) || 1;
  const searchText = searchParams.query || "";
  const category = searchParams.category || "";

  const { data, totalPages } = await getAllProducts({
    query: searchText,
    page,
    category,
  });

  return (
    <div className="space-y-2">
      <div className="flex-between">
        <div className="flex items-center gap-4">
          <Heading text="Products" />
          {searchText && (
            <div className="flex items-center gap-4">
              Filtered by <Badge>{searchText}</Badge>
              <Link href="/admin/products">
                <X className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>
        <Button asChild variant={"default"}>
          <Link href="/admin/products/create">Create Product</Link>
        </Button>
      </div>

      <div className="overflow-x-auto">
        <AdminProductsTable products={data} />
      </div>

      <div className="flex justify-end mt-16">
        {totalPages > 1 && (
          <Pagination page={Number(page) || 1} totalPages={totalPages} />
        )}
      </div>
    </div>
  );
};

export default AdminProductsPage;
