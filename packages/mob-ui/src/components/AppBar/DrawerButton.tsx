import { DrawerActions, useNavigation } from '@react-navigation/native';
import { withTheme, Button, Icon } from '@rneui/themed';
import React from 'react';
// import { IconButton } from 'react-native-paper';

const DrawerButton = () => {
  const navigation = useNavigation();

  return <Icon name="home" size={30} onPress={() => navigation.dispatch(DrawerActions.openDrawer())} />;
  // return <Button icon="" onPress={() => navigation.dispatch(DrawerActions.openDrawer())} />;
  // return <IconButton icon="menu" onPress={() => navigation.dispatch(DrawerActions.openDrawer())} size={30} />;
};

export default withTheme(DrawerButton);
