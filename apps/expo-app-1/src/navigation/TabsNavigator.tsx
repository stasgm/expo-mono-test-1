import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';

import HomeScreen from '../screens/App/Home';
import SettingsScreen from '../screens/App/Settings';

import DrawerNavigator from './DrawerNavigator';

import { TabsStackParamList } from './types';

const Tab = createBottomTabNavigator<TabsStackParamList>();

const TabsNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Features"
        component={DrawerNavigator}
        options={{
          tabBarIcon: ({ color, size }) => <Icon name="apps" color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Icon name="home" color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Icon name="cog" color={color} size={size} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default TabsNavigator;
