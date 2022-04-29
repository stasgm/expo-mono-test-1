import { DrawerActions, getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Button } from 'react-native';

import DrawerNavigator from './DrawerNavigator';

import { RootStackParamList } from './types';

const RootStack = createStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  const isAuthenticated = false;

  const handleSignOut = () => {
    console.log('Logout');
  };

  return (
    <RootStack.Navigator>
      {isAuthenticated ? (
        <RootStack.Screen
          name="Drawer"
          component={DrawerNavigator}
          options={({ route, navigation }) => ({
            headerTitle: getFocusedRouteNameFromRoute(route),
            headerLeft: () => <Button onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())} title="Menu" />,
            headerRight: () => <Button onPress={handleSignOut} title="Sign Out" />,
          })}
        />
      ) : (
        <RootStack.Screen name="Drawer" component={DrawerNavigator} />
      )}
    </RootStack.Navigator>
  );
};

export default RootNavigator;
