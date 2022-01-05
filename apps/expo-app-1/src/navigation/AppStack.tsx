import { createStackNavigator } from '@react-navigation/stack';

import { HomeScreen } from '../screens/App/Home';

import { AppStackParamList } from './types';

const Stack = createStackNavigator<AppStackParamList>();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
      <Stack.Screen key="Home" name="Home" component={HomeScreen} options={{ title: 'Home' }} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
