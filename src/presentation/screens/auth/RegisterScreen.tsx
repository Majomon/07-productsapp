import {Button, Input, Layout, Text} from '@ui-kitten/components';
import React, {useState} from 'react';
import {ScrollView, useWindowDimensions} from 'react-native';
import {MyIcon} from '../../components/ui/MyIcon';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '../../navigation/StackNavigator';
import {authRegister} from '../../../actions/auth/auth';

/* Para poder navegar */
interface Props extends StackScreenProps<RootStackParams, 'RegisterScreen'> {}

export const RegisterScreen = ({navigation}: Props) => {
  const {height} = useWindowDimensions();
  const [form, setForm] = useState({
    email: '',
    password: '',
    fullName: '',
  });

  const registerForm = async () => {
    const resp = await authRegister(form.email, form.password, form.fullName);
    return resp;
  };

  return (
    <Layout style={{flex: 1}}>
      <ScrollView style={{marginHorizontal: 40}}>
        <Layout style={{paddingTop: height * 0.3}}>
          <Text category="h1">Crear cuenta</Text>
          <Text category="p2">Por favor, crea una cuenta para continuar</Text>
        </Layout>
        {/* Inputs */}
        <Layout style={{marginTop: 20}}>
          <Input
            placeholder="Nombre completo"
            accessoryLeft={<MyIcon name="person-outline" />}
            style={{marginBottom: 10}}
            value={form.fullName}
            onChangeText={value => setForm({...form, fullName: value})}
          />

          <Input
            placeholder="Correo electrónico"
            accessoryLeft={<MyIcon name="email-outline" />}
            style={{marginBottom: 10}}
            keyboardType="email-address"
            autoCapitalize="none"
            value={form.email}
            onChangeText={value => setForm({...form, email: value})}
          />

          <Input
            accessoryLeft={<MyIcon name="lock-outline" />}
            placeholder="Contraseña"
            style={{marginBottom: 20}}
            secureTextEntry
            autoCapitalize="none"
            value={form.password}
            onChangeText={value => setForm({...form, password: value})}
          />

          {/* Espacio */}
          <Layout style={{height: 30}} />

          {/* Boton */}
          <Layout>
            <Button
              accessoryRight={<MyIcon name="arrow-forward-outline" white />}
              onPress={registerForm} /* appearance="ghost" */
            >
              Crear
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
            <Text>Ya tienes una cuenta?</Text>
            <Text
              status="primary"
              category="s1"
              onPress={() => navigation.goBack()}>
              {' '}
              Ingresar
            </Text>
          </Layout>
        </Layout>
      </ScrollView>
    </Layout>
  );
};
