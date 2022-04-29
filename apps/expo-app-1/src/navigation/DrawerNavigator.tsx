import React from 'react';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { theme } from '../constants';

import TodoNavigator from '../features/todos/navigation/TodoNavigator';

import { DrawerContent } from '../components/drawerContent';
import { INavItem, RootDrawerParamList } from '../components/types';

import Settings from '../screens/App/Settings';

import MapNavigator from './MapNavigator';

const Drawer = createDrawerNavigator<RootDrawerParamList>();

const baseNavList: INavItem[] = [
  {
    name: 'Todo',
    component: TodoNavigator,
    icon: 'check-box-outline',
    title: 'Todo',
  },
  {
    name: 'Map2',
    component: MapNavigator,
    icon: 'map',
    title: 'Map2',
  },
  {
    name: 'Map',
    component: MapNavigator,
    icon: 'map',
    title: 'Map',
  },
  {
    name: 'Settings',
    component: Settings,
    icon: 'account-settings',
    title: 'Settings',
  },
];

const DrawerNavigator = () => {
  const navList: INavItem[] = baseNavList;

  return (
    <Drawer.Navigator
      defaultStatus="closed"
      screenOptions={{
        headerShown: false,
        overlayColor: 'transparent',
        drawerStyle: {
          backgroundColor: theme.background,
        },
        drawerActiveTintColor: theme.active,
        drawerInactiveTintColor: theme.inactive,
        drawerLabelStyle: {
          marginLeft: -25,
          fontSize: 15,
        },
      }}
      drawerContent={(props) => <DrawerContent {...props} />}
    >
      {navList.map((item) => (
        <Drawer.Screen
          name={item.name}
          key={item.name}
          component={item.component}
          options={{
            title: item.title,
            drawerIcon: (pr) => <Icon name={item.icon} {...pr} />,
          }}
        />
      ))}
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
