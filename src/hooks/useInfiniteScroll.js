import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, selectProductsLoading } from '@/store/productSlice';

export const useInfiniteScroll = () => {
  const dispatch = useDispatch();
  const loading = useSelector(selectProductsLoading);
  const page = useSelector(state => state.products.pagination.currentPage);

  const handleScroll = useCallback(() => {
    if (loading) return;
    
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;

    if (scrollTop + clientHeight >= scrollHeight - 100) {
      dispatch(fetchProducts({ limit: 12, skip: page * 12 }));
    }
  }, [loading, page, dispatch]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return { loading };
};
