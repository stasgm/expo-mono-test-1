import { StackNavigationProp } from '@react-navigation/stack';

export type AuthStackParamList = {
  Singin: undefined;
  Signup: undefined;
};

export type AuthScreenNavigationProp = StackNavigationProp<AuthStackParamList>;
