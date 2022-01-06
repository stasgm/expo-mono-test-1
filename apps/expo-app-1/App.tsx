import { NavigationContainer } from '@react-navigation/native';
import { Provider } from "react-redux";
import Toast from 'react-native-toast-message';

// import Notification from './src/components/Notification';
import store from "./src/store";
import DrawerNavigator from './src/components/DrawerNavigator';

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        {/* <Notification /> */}
        <DrawerNavigator />
        <Toast />
      </NavigationContainer>
    </Provider>
  );
}
