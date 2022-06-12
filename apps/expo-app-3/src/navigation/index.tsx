import { DarkTheme, DefaultTheme, NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useReduxDevToolsExtension } from '@react-navigation/devtools';

import { RootStackParamList } from '../utils';
import { useIsDark } from '../utils/hooks';

import { useReduxSelector } from '../store';

import { selectLogin } from '../store/ducks/user';

import AuthNavigator from './AuthNavigator';
import DrawerNavigator from './DrawerNavigator';

const Stack = createNativeStackNavigator<RootStackParamList>();

const Navigation = () => {
  const isDark = useIsDark();

  // const screens = Authentication.isAuthenticated ? (
  //   <Stack.Screen key="Drawer" name="Drawer" component={DrawerNavigator} options={{ headerShown: false }} />
  // ) : (
  //   <Stack.Screen key="Auth" name="Auth" component={AuthNavigator} options={{ headerShown: false }} />
  // );
  const isLoggedIn = useReduxSelector(selectLogin);
  const navigationRef = useNavigationContainerRef();

  useReduxDevToolsExtension(navigationRef);

  return (
    <NavigationContainer theme={isDark ? DarkTheme : DefaultTheme} ref={navigationRef}>
      <Stack.Navigator>
        {isLoggedIn ? (
          <Stack.Screen key="Drawer" name="Drawer" component={DrawerNavigator} options={{ headerShown: false }} />
        ) : (
          <Stack.Screen key="Auth" name="Auth" component={AuthNavigator} options={{ headerShown: false }} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
