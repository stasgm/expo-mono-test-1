import React, { useCallback, useEffect, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import 'react-native-gesture-handler';
import 'react-native-reanimated';
import { LogBox } from 'react-native';
import { Provider } from 'react-redux';
import { StatusBar } from 'expo-status-bar';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { RobotoMono_400Regular } from '@expo-google-fonts/roboto-mono';
import * as eva from '@eva-design/eva';
import { CustomSchemaType } from '@eva-design/dss';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';

import { PersistGate } from 'redux-persist/integration/react';

import store, { persistor } from './src/store';

import mapping from './src/components/base/mapping.json';

import theme from './assets/theme.json';
import Navigation from './src/navigation';
import { useIsDark } from './src/utils/hooks';
import AlertProvider from './src/utils/providers/AlertProvider';
import PromptProvider from './src/utils/providers/PromptProvider';
import ToastProvider from './src/utils/providers/ToastProvider';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);

const customMapping = mapping as unknown as CustomSchemaType;

function App() {
  const isDark = useIsDark();
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        // Pre-load fonts, make any API calls you need to do here
        await Font.loadAsync({ RobotoMono_400Regular });
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <IconRegistry icons={EvaIconsPack} />
        <StatusBar style={isDark ? 'light' : 'dark'} />
        <ApplicationProvider
          {...eva}
          theme={{ ...(isDark ? eva.dark : eva.light), ...theme }}
          customMapping={customMapping}
        >
          <SafeAreaProvider onLayout={onLayoutRootView}>
            <AlertProvider>
              <PromptProvider>
                <ToastProvider>
                  <Navigation />
                </ToastProvider>
              </PromptProvider>
            </AlertProvider>
          </SafeAreaProvider>
        </ApplicationProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
