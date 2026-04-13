import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatCurrency, formatUUID } from "@/lib/utils";
import { deleteProduct, getAllProducts } from "@/lib/actions/productAction";
import AdminEditProductButton from "./AdminEditProductButton";
import DeleteButtonWithDialog from "./DeleteButtonWithDialog";

type ProductsArray = Awaited<ReturnType<typeof getAllProducts>>["data"];

type Props = {
  products: ProductsArray;
};

const AdminProductsTable = async ({ products }: Props) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>NAME</TableHead>
          <TableHead className="text-right">PRICE</TableHead>
          <TableHead>CATEGORY</TableHead>
          <TableHead>STOCK</TableHead>
          <TableHead>RATING</TableHead>
          <TableHead className="text-center w-25">ACTION</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {products.map((product) => (
          <TableRow key={product.id}>
            <TableCell>{formatUUID(product.id)}</TableCell>
            <TableCell>{product.name}</TableCell>
            <TableCell className="text-right">
              {formatCurrency(product.price)}
            </TableCell>
            <TableCell>{product.category}</TableCell>
            <TableCell>{product.stock}</TableCell>
            <TableCell>{product.rating}</TableCell>
            <TableCell>
              <div className="flex gap-2 items-center justify-center">
                <AdminEditProductButton
                  href={`/admin/products/${product.id}`}
                  text="Edit Product"
                />

                <DeleteButtonWithDialog
                  id={product.id}
                  action={deleteProduct}
                  text="Delete Product"
                />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
export default AdminProductsTable;
