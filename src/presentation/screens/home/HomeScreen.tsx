import {Button, Icon, Layout, Text} from '@ui-kitten/components';
import React from 'react';
import {useAuthStore} from '../../../store/auth/useAuthStore';

export const HomeScreen = () => {
  const {logOut} = useAuthStore();
  return (
    <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Home screen</Text>
      {/*     <Icon name='facebook'/> */}
      <Button accessoryLeft={<Icon name="log-out-outline" />} onPress={logOut}>
        Cerrar sesion
      </Button>
    </Layout>
  );
};
