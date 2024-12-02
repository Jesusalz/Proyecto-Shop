import Carousel from './Carousel';
import { ProductItem } from '@/components/products';

const SpecialOffersCarousel = ({ products }) => (
  <Carousel
    items={products}
    renderItem={(product, index) => <ProductItem key={index} product={product} />}
    itemsPerView={3}
    title="Ofertas especiales"
  />
);

export default SpecialOffersCarousel;
//Visita mi GitHub: https://github.com/Jesusalz
