import {Button, Input, Layout, Text} from '@ui-kitten/components';
import React from 'react';
import {ScrollView, useWindowDimensions} from 'react-native';
import {MyIcon} from '../../components/ui/MyIcon';

export const LoginScreen = () => {
  const {height} = useWindowDimensions();
  return (
    <Layout style={{flex: 1}}>
      <ScrollView style={{marginHorizontal: 40}}>
        <Layout style={{paddingTop: height * 0.35}}>
          <Text category="h1">Ingresar</Text>
          <Text category="p2">Por favor, ingrese para continuar</Text>
        </Layout>
        {/* Inputs */}
        <Layout style={{marginTop: 20}}>
          <Input
            accessoryLeft={<MyIcon name="email-outline" />}
            placeholder="Correo electrónico"
            style={{marginBottom: 10}}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Input
            accessoryLeft={<MyIcon name="lock-outline" />}
            placeholder="Contraseña"
            style={{marginBottom: 20}}
            secureTextEntry
            autoCapitalize="none"
          />

          {/* Espacio */}
          <Layout style={{height: 30}} />

          {/* Boton */}
          <Layout>
            <Button
              accessoryRight={<MyIcon name="arrow-forward-outline" white />}
              onPress={() => console.log('Boton')} /* appearance="ghost" */
            >
              Ingresar
            </Button>
          </Layout>

          <Layout style={{height: 20}} />

          {/* Información para crear cuenta */}
          <Layout
            style={{
              alignItems: 'flex-end',
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <Text>¿No tienes cuenta?</Text>
            <Text status="primary" category="s1" onPress={() => {}}>
              {' '}
              Crea una
            </Text>
          </Layout>
        </Layout>
      </ScrollView>
    </Layout>
  );
};
