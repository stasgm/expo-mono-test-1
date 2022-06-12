import { DrawerNavigationOptions } from '@react-navigation/drawer';
import { NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackNavigationOptions, NativeStackScreenProps } from '@react-navigation/native-stack';

type ScreenType = 'public' | 'private';

export type ScreenInfo<T extends ScreenType> = {
  name: T extends 'private' ? keyof DrawerParamList : keyof AuthParamList;
  screen?: any;
  initialParams?: T extends 'private'
    ? Partial<DrawerParamList[keyof DrawerParamList]>
    : Partial<AuthParamList[keyof AuthParamList]>;
  options?: T extends 'private' ? DrawerNavigationOptions : NativeStackNavigationOptions;
};

export type DrawerParamList = {
  Home: undefined;
  About: undefined;
  Help: undefined;
  Feedback: undefined;
  Settings: undefined;
  Stats: undefined;
};

export type AuthParamList = {
  SignIn: undefined;
  SignUp: undefined;
};

export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthParamList>;
  Drawer: NavigatorScreenParams<DrawerParamList>;
};

export type RootStackScreenProps<S extends keyof RootStackParamList> = NativeStackScreenProps<RootStackParamList, S>;

export type RootStackNavigationProp<S extends keyof RootStackParamList> = RootStackScreenProps<S>['navigation'];

export type AuthStackScreenProps<S extends keyof AuthParamList> = NativeStackScreenProps<AuthParamList, S>;

export type AuthStackNavigationProp<S extends keyof AuthParamList> = AuthStackScreenProps<S>['navigation'];
