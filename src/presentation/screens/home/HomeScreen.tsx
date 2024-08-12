import {useQuery} from '@tanstack/react-query';
import {Layout, Text} from '@ui-kitten/components';
import React from 'react';
import {getProductsByPage} from '../../../actions/products/getProductsByPage.';
import {useAuthStore} from '../../../store/auth/useAuthStore';

export const HomeScreen = () => {
  const {logOut} = useAuthStore();

  /* Nortal/Tradicional */
  const {isLoading, data: products = []} = useQuery({
    queryKey: ['products', 'infinite'],
    staleTime: 1000 * 60 * 60, // 1 hora
    queryFn: () => getProductsByPage(0),
  });

  return (
    <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>{JSON.stringify(products, null, 2)}</Text>
    </Layout>
  );
};
