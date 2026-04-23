import { getFeaturedProducts } from "@/lib/actions/productAction";
import ProductCarouselItem from "./ProductCarouselItem";
// import Autoplay from "embla-carousel-autoplay";

const ProductCarousel = async () => {
  const data = await getFeaturedProducts();

  if (!data.length) {
    return;
  }

  return <>{data.length > 0 && <ProductCarouselItem data={data} />}</>;
};
export default ProductCarousel;
