import ProductCreateForm from "@/app/features/admin/ProductCreateForm";
import Heading from "@/components/Heading";
import { getProductById } from "@/lib/actions/productAction";
import { requireAdmin } from "@/lib/actions/userAction";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Update Product",
};

const AdminProductUpdatePage = async (props: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await props.params;

  await requireAdmin();

  const product = await getProductById(id);

  if (!product) return notFound();

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <Heading text="Update Product" />

      <ProductCreateForm
        type="Update"
        product={product}
        productId={product.id}
      />
    </div>
  );
};
export default AdminProductUpdatePage;
