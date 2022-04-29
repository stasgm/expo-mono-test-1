import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp';

import { AuthStackParamList } from './types';

const Stack = createStackNavigator<AuthStackParamList>();

const TodoNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Singin">
      <Stack.Screen key="Signup" name="Signup" component={SignUp} />
      <Stack.Screen key="Singin" name="Singin" component={SignIn} />
    </Stack.Navigator>
  );
};

export default TodoNavigator;
