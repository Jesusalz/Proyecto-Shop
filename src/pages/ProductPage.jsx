            import { useEffect } from 'react';
            import { useDispatch, useSelector } from 'react-redux';
            import { useLocation } from 'react-router-dom';
            import { 
              fetchProducts, 
              fetchProductsByCategory, 
              selectFilteredProducts, 
              selectProductsLoading,
              selectPagination 
            } from '@/store/productSlice';
            import { ProductList, LoadMore, FilterBar } from '@/components/products';
            import { Sidebar } from '@/components/layout';

            const ProductPage = () => {
              const dispatch = useDispatch();
              const location = useLocation();
              const products = useSelector(selectFilteredProducts);
              const loading = useSelector(selectProductsLoading);
              const { currentPage } = useSelector(selectPagination);
              const currentCategory = new URLSearchParams(location.search).get('category');

              useEffect(() => {
                if (currentCategory) {
                  dispatch(fetchProductsByCategory(currentCategory));
                } else {
                  // Only fetch if we're on the first page
                  if (currentPage === 0) {
                    dispatch(fetchProducts({ limit: 12, skip: 0 }));
                  }
                }
              }, [dispatch, currentCategory, currentPage]);

              return (
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                  <div className="flex gap-8">
                    <Sidebar />
                    <div className="flex-1">
                      <FilterBar />
                      {currentCategory && (
                        <h1 className="text-2xl font-bold mb-6 capitalize">
                          {currentCategory}
                        </h1>
                      )}
                      <ProductList products={products} />
                      {!currentCategory && <LoadMore />}
                    </div>
                  </div>
                </div>
              );
            };

            export default ProductPage;
            //Visita mi GitHub: https://github.com/Jesusalz