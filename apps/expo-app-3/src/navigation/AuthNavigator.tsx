import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AuthParamList } from '../utils';

import { authScreens } from './screens';

const Stack = createNativeStackNavigator<AuthParamList>();

const AuthNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="SignIn"
    >
      {authScreens.map(({ name, screen, options }) => (
        <Stack.Screen key={name} name={name} component={screen} options={options} />
      ))}
    </Stack.Navigator>
  );
};

export default AuthNavigator;
