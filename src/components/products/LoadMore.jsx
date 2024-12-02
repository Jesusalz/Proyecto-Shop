import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts, selectPagination, selectProductsLoading } from '@/store/productSlice';
import { Button } from '@/components/common';

const LoadMore = () => {
  const dispatch = useDispatch();
  const { currentPage, hasMore, itemsPerPage } = useSelector(selectPagination);
  const loading = useSelector(selectProductsLoading);

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      dispatch(fetchProducts({
        limit: 12,
        skip: currentPage * 12
      }));
    }
  };

  if (!hasMore) return null;

  return (
    <div className="flex justify-center mt-8">
      <Button 
        onClick={handleLoadMore}
        disabled={loading}
        className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded"
      >
        {loading ? 'Cargando...' : 'Cargar más productos'}
      </Button>
    </div>
  );
};

export default LoadMore;