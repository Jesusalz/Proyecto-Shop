import Carousel from './Carousel';
import { ProductItem } from '@/components/products';

const BestSellersCarousel = ({ products }) => (
  <Carousel
    items={products}
    renderItem={(product, index) => <ProductItem key={index} product={product} />}
    itemsPerView={4}
    title="Más vendidos"
  />
);

export default BestSellersCarousel;
// Desarrollado por Jesús - Visita mi GitHub: https://github.com/Jesusalz