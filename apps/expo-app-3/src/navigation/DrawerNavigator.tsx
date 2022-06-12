import { createDrawerNavigator } from '@react-navigation/drawer';
import { useLinkTo } from '@react-navigation/native';
import { parse, useURL } from 'expo-linking';
import { useEffect } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import DrawerContentContainer from '../containers/app/DrawerContentContainer';
import { DrawerParamList } from '../utils';
import { useBackgroundColor } from '../utils/hooks';

import TopNavigation from './TopNavigation';
import { appScreens } from './screens';

const Drawer = createDrawerNavigator<DrawerParamList>();

const AppNavigator = () => {
  const backgroundColor = useBackgroundColor();
  const topInsets = useSafeAreaInsets().top;

  const appUrl = useURL();
  const linkTo = useLinkTo();
  useEffect(() => {
    if (!appUrl) {
      return;
    }

    const { path } = parse(appUrl);
    if (path) {
      linkTo('/' + path);
    }
  }, [appUrl, linkTo]);

  return (
    <Drawer.Navigator
      drawerContent={(props) => <DrawerContentContainer {...props} />}
      screenOptions={{
        drawerStyle: { backgroundColor },
        header: TopNavigation(topInsets),
        headerShown: false,
      }}
      initialRouteName="Home"
      useLegacyImplementation
    >
      {appScreens.map(({ name, screen, options }) => (
        <Drawer.Screen key={name} name={name} component={screen} options={options} />
      ))}
    </Drawer.Navigator>
  );
};

export default AppNavigator;
