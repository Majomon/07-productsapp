import {Button, Icon, Layout, Text} from '@ui-kitten/components';
import React from 'react';

export const HomeScreen = () => {
  return (
    <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Home screen</Text>
      {/*     <Icon name='facebook'/> */}
      <Button accessoryLeft={<Icon name="facebook" />}>Cerrar sesion</Button>
    </Layout>
  );
};
