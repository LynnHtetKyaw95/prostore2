import ProductCreateForm from "@/app/features/admin/ProductCreateForm";
import Heading from "@/components/Heading";
import { requireAdmin } from "@/lib/actions/userAction";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Product",
};

const CreateProductPage = async () => {
  await requireAdmin();

  return (
    <>
      <Heading text="Create Product" />

      <div className="my-8">
        <ProductCreateForm type="Create" />
      </div>
    </>
  );
};
export default CreateProductPage;
