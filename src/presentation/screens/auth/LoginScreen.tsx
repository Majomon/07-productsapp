import { StackScreenProps } from '@react-navigation/stack';
import { Button, Input, Layout, Text } from '@ui-kitten/components';
import React, { useState } from 'react';
import { Alert, ScrollView, useWindowDimensions } from 'react-native';
import { useAuthStore } from '../../../store/auth/useAuthStore';
import { MyIcon } from '../../components/ui/MyIcon';
import { RootStackParams } from '../../navigation/StackNavigator';

/* Para poder navegar */
interface Props extends StackScreenProps<RootStackParams, 'LoginScreen'> {}

export const LoginScreen = ({navigation}: Props) => {
  const {login} = useAuthStore();
  const [isPosting, setIsPosting] = useState(false);

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const {height} = useWindowDimensions();

  const onLogin = async () => {
    if (form.email.length === 0 || form.password.length === 0) {
      return;
    }
    setIsPosting(true);

    const wasSuccessFull = await login(form.email, form.password);
    setIsPosting(false);

    if (wasSuccessFull) return;

    Alert.alert('Error', 'Usuario o contraseña incorrecta');
  };

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
            placeholder="Correo electrónico"
            keyboardType="email-address"
            autoCapitalize="none"
            value={form.email}
            onChangeText={value => setForm({...form, email: value})}
            accessoryLeft={<MyIcon name="email-outline" />}
            style={{marginBottom: 10}}
          />

          <Input
            placeholder="Contraseña"
            autoCapitalize="none"
            value={form.password}
            onChangeText={value => setForm({...form, password: value})}
            accessoryLeft={<MyIcon name="lock-outline" />}
            style={{marginBottom: 20}}
            secureTextEntry
          />

          {/* Espacio */}
          <Layout style={{height: 30}} />

          {/* Boton */}
          <Layout>
            <Button
              disabled={isPosting}
              accessoryRight={<MyIcon name="arrow-forward-outline" white />}
              onPress={onLogin}
              /* appearance="ghost" */
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
            <Text
              status="primary"
              category="s1"
              onPress={() => navigation.navigate('RegisterScreen')}>
              {' '}
              Crea una
            </Text>
          </Layout>
        </Layout>
      </ScrollView>
    </Layout>
  );
};
