import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn, formatCurrency } from "@/lib/utils";
import { Cart } from "@/types";
import Image from "next/image";
import Link from "next/link";
import RemoveItemButton from "./RemoveItemButton";
import AddItemButton from "./AddItemButton";
import SubtotalCard from "./SubtotalCard";
import Heading from "@/components/Heading";

interface CartTableProps {
  cart: Cart;
}

const CartTable = ({ cart }: CartTableProps) => {
  return (
    <>
      <Heading text="Shopping Cart" />

      {!cart || cart.items.length === 0 ? (
        <div>
          <p>
            Cart is empty <Link href={"/"}>Go Shopping</Link>
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-4 md:gap-10">
          <div className="overflow-x-auto md:col-span-3">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Item</TableHead>
                  <TableHead className="text-center">Quantity</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {cart.items.map((item) => (
                  <TableRow key={item.slug}>
                    <TableCell>
                      <Link
                        href={`/product/${item.slug}`}
                        className="flex items-center"
                      >
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={50}
                          height={50}
                        />
                        <span className="px-4">{item.name}</span>
                      </Link>
                    </TableCell>
                    <TableCell className="flex-center gap-4">
                      <RemoveItemButton item={item} />
                      <span>{item.qty}</span>
                      <AddItemButton item={item} />
                    </TableCell>
                    <TableCell className="text-right">
                      {formatCurrency(item.price)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <SubtotalCard cart={cart} />
        </div>
      )}
    </>
  );
};
export default CartTable;
