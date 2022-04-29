import React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';

import { createTheme, Provider as UIProvider } from '@lib/mob-ui';

import Notification from './src/components/Notification';
import { RootNavigator } from './src/navigation';
import store from './src/store';

import { theme as defaultTheme } from './src/constants';

const theme = createTheme({
  Header: {
    backgroundColor: defaultTheme.background,
  },
  lightColors: {
    primary: defaultTheme.background,
    background: defaultTheme.background,
    disabled: defaultTheme.disabled,
    secondary: defaultTheme.secondary,
    black: defaultTheme.border,
  },
  mode: 'light',
});

export default () => {
  return (
    <Provider store={store}>
      <UIProvider theme={theme}>
        <NavigationContainer>
          <RootNavigator />
          <Notification />
        </NavigationContainer>
      </UIProvider>
    </Provider>
  );
};
