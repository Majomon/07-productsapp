import { StackScreenProps } from '@react-navigation/stack';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  Button,
  ButtonGroup,
  Input,
  Layout,
  useTheme,
} from '@ui-kitten/components';
import { Formik } from 'formik';
import { useRef } from 'react';
import { ScrollView } from 'react-native';
import { getProductById, updateCreateProduct } from '../../../actions/products';
import { genders, sizes } from '../../../config/constants/constants';
import { Product } from '../../../domain/entities/product';
import { ProductImages } from '../../components/products/ProductImages';
import { MyIcon } from '../../components/ui/MyIcon';
import { MainLayout } from '../../layouts/MainLayout';
import { RootStackParams } from '../../navigation/StackNavigator';

interface Props extends StackScreenProps<RootStackParams, 'ProductScreen'> {}

export const ProductScreen = ({route}: Props) => {
  const productIdRef = useRef(route.params.productId);
  const theme = useTheme();
  const queryClient = useQueryClient();

  const {data: product} = useQuery({
    queryKey: ['product', productIdRef.current],
    queryFn: () => getProductById(productIdRef.current),
  });

  const mutation = useMutation({
    mutationFn: (data: Product) =>
      updateCreateProduct({...data, id: productIdRef.current}),
    onSuccess(data: Product) {
      console.log('Success');
      productIdRef.current = data.id; // creación

      /* Para revalidar, al destruirlas cuando vuelva a ingresar al producto volvera hacer el fetch/peticion */
      queryClient.invalidateQueries({queryKey: ['products', 'infinite']});
      queryClient.invalidateQueries({queryKey: ['product', data.id]});
    },
  });

  if (!product) {
    return <MainLayout title="Cargando..." />;
  }

  return (
    <Formik
      initialValues={product}
      onSubmit={values => mutation.mutate(values)}>
      {({handleChange, handleSubmit, values, errors, setFieldValue}) => (
        <MainLayout title={values.title} subTitle={`Precio: ${values.price}`}>
          <ScrollView style={{flex: 1}}>
            {/* Imagenes del producto */}
            <Layout
              style={{
                marginVertical: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <ProductImages images={values.images} />
            </Layout>

            {/* Formulario */}
            <Layout style={{marginHorizontal: 10}}>
              <Input
                label="Título"
                style={{marginVertical: 5}}
                value={values.title}
                onChangeText={handleChange('title')}
              />
              <Input
                label="Slug"
                style={{marginVertical: 5}}
                value={values.slug}
                onChangeText={handleChange('slug')}
              />
              <Input
                label="Descripción"
                multiline
                numberOfLines={5}
                style={{marginVertical: 5}}
                value={values.description}
                onChangeText={handleChange('description')}
              />
            </Layout>

            {/* Precio e inventario */}
            <Layout
              style={{
                marginHorizontal: 15,
                marginVertical: 5,
                flexDirection: 'row',
                gap: 10,
              }}>
              <Input
                label="Precio"
                value={values.price.toString()}
                onChangeText={handleChange('price')}
                style={{flex: 1}}
                keyboardType="numeric"
              />

              <Input
                label="Inventario"
                value={values.stock.toString()}
                onChangeText={handleChange('stock')}
                style={{flex: 1}}
                keyboardType="numeric"
              />
            </Layout>

            {/* Selectores */}
            <ButtonGroup
              style={{
                margin: 2,
                marginTop: 20,
                marginHorizontal: 15,
              }}
              size="small"
              appearance="outline">
              {sizes.map(size => (
                <Button
                  onPress={() =>
                    setFieldValue(
                      'sizes',
                      values.sizes.includes(size)
                        ? values.sizes.filter(s => s !== size)
                        : [...values.sizes, size],
                    )
                  }
                  key={size}
                  style={{
                    flex: 1,
                    backgroundColor: values.sizes.includes(size)
                      ? theme['color-primary-200']
                      : undefined,
                  }}>
                  {size}
                </Button>
              ))}
            </ButtonGroup>

            <ButtonGroup
              style={{
                margin: 2,
                marginTop: 20,
                marginHorizontal: 15,
              }}
              size="small"
              appearance="outline">
              {genders.map(gender => (
                <Button
                  onPress={() => setFieldValue('gender', gender)}
                  key={gender}
                  style={{
                    flex: 1,
                    backgroundColor: values.gender.startsWith(gender)
                      ? theme['color-primary-200']
                      : undefined,
                  }}>
                  {gender}
                </Button>
              ))}
            </ButtonGroup>

            {/* Botòn de guardar */}
            <Button
              accessoryLeft={<MyIcon name="save-outline" white />}
              onPress={() => handleSubmit()}
              disabled={mutation.isPending}
              style={{margin: 15}}>
              Guardar
            </Button>

            {/* <Text>{JSON.stringify(values, null, 2)}</Text> */}
            <Layout style={{height: 250}} />
          </ScrollView>
        </MainLayout>
      )}
    </Formik>
  );
};
