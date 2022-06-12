import AboutScreen from '../screens/AppStack/AboutScreen';
import HelpScreen from '../screens/AppStack/HelpScreen';
import HomeScreen from '../screens/AppStack/HomeScreen';
import SettingsScreen from '../screens/AppStack/SettingsScreen';
import StatsScreen from '../screens/AppStack/StatsScreen';
import SignUpScreen from '../screens/AuthStack/SignUpScreen';
import SignInScreen from '../screens/AuthStack/SignInScreen';
import { ScreenInfo } from '../utils';

const appScreens: ScreenInfo<'private'>[] = [
  { name: 'Home', screen: HomeScreen, options: { headerShown: false } },
  { name: 'About', screen: AboutScreen },
  { name: 'Help', screen: HelpScreen },
  { name: 'Settings', screen: SettingsScreen },
  { name: 'Stats', screen: StatsScreen },
];

const authScreens: ScreenInfo<'public'>[] = [
  { name: 'SignUp', screen: SignUpScreen },
  { name: 'SignIn', screen: SignInScreen },
];

export { appScreens, authScreens };
