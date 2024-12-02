// Para mostrar todos los productos
import { useProducts } from '@/hooks/useProducts';
import { ProductList } from '@/components/products';
import { LoadingSpinner } from '@/components/common';

const ProductsListPage = () => {
  const { products, loading, error } = useProducts();

  if (loading) return <LoadingSpinner />;
  
  if (error) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-red-600">{error}</h2>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Nuestros Productos</h1>
      <ProductList products={products?.products || []} />
    </div>
  );
};

export default ProductsListPage;
