import {useInfiniteQuery} from '@tanstack/react-query';
import React from 'react';
import {getProductsByPage} from '../../../actions/products/getProductsByPage.';
import {ProductList} from '../../components/products/ProductList';
import {FullScreenLoader} from '../../components/ui/FullScreenLoader';
import {MainLayout} from '../../layouts/MainLayout';
import {FAB} from '../../components/ui/FAB';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParams} from '../../navigation/StackNavigator';

export const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParams>>();
  /*   const {logOut} = useAuthStore();
   */
  /* Nortal/Tradicional */
  /*   const {isLoading, data: products = []} = useQuery({
    queryKey: ['products', 'infinite'],
    staleTime: 1000 * 60 * 60, // 1 hora
    queryFn: () => getProductsByPage(0),
  }); */

  /* Scroll infinito */
  const {isLoading, data, fetchNextPage} = useInfiniteQuery({
    queryKey: ['products', 'infinite'],
    staleTime: 1000 * 60 * 60, // 1 hora
    initialPageParam: 0,
    queryFn: async params => await getProductsByPage(params.pageParam),

    getNextPageParam: (lastPage, allPages) => allPages.length,
  });

  return (
    <>
      <MainLayout
        title="TesloShop - Products"
        subTitle="Aplicación administrativa">
        {isLoading ? (
          <FullScreenLoader />
        ) : (
          <ProductList
            products={data?.pages.flat() ?? []}
            fetchNextPage={fetchNextPage}
          />
        )}
      </MainLayout>
      <FAB
        style={{position: 'absolute', bottom: 30, right: 20}}
        iconName="plus-outline"
        onPress={() => navigation.navigate('ProductScreen', {productId: 'new'})}
      />
    </>
  );
};
