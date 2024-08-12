import {useQuery} from '@tanstack/react-query';
import React from 'react';
import {getProductsByPage} from '../../../actions/products/getProductsByPage.';
import {ProductList} from '../../components/products/ProductList';
import {FullScreenLoader} from '../../components/ui/FullScreenLoader';
import {MainLayout} from '../../layouts/MainLayout';

export const HomeScreen = () => {
  /*   const {logOut} = useAuthStore();
   */
  /* Nortal/Tradicional */
  const {isLoading, data: products = []} = useQuery({
    queryKey: ['products', 'infinite'],
    staleTime: 1000 * 60 * 60, // 1 hora
    queryFn: () => getProductsByPage(0),
  });

  return (
    <MainLayout
      title="TesloShop - Products"
      subTitle="Aplicación administrativa">
      {isLoading ? <FullScreenLoader /> : <ProductList products={products} />}
    </MainLayout>
  );
};
