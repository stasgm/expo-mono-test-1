/* eslint-disable react-native/no-unused-styles */
// import * as React from 'react';
import { StyleSheet } from 'react-native';
import { DrawerContentComponentProps, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import Animated from 'react-native-reanimated';

export const DrawerContent = (props: DrawerContentComponentProps) => {
  // const progress = useDrawerProgress() as Animated.Adaptable<number>;
  // const status = useDrawerStatus();

  // const scale = Animated.interpolateNode(status === 'open' ? 1 : 0, {
  //   inputRange: [0, 1],
  //   outputRange: [1, 0.8],
  //   extrapolate: Animated.Extrapolate.CLAMP,
  // });

  // const translateX = Animated.interpolateNode(progress, {
  //   inputRange: [0, 0.5, 0.7, 0.8, 1],
  //   outputRange: [-100, -85, -70, -45, 0],
  //   extrapolate: Animated.Extrapolate.CLAMP,
  // });

  // const translateX = Animated.interpolateNode(status === 'open' ? 1 : 0, {
  //   inputRange: [0, 0.5, 0.7, 0.8, 1],
  //   outputRange: [-100, -85, -70, -45, 0],
  //   extrapolate: Animated.Extrapolate.CLAMP,
  // });

  return (
    <DrawerContentScrollView {...props}>
      <Animated.View
        style={[
          styles.drawerContent,
          // {
          //   transform: [{ translateX }],
          // },
        ]}
      >
        <DrawerItemList {...props} />
      </Animated.View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
    overflow: 'hidden',
  },
  userInfoSection: {
    paddingLeft: 20,
    paddingTop: 30,
    paddingBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  userProfile: {
    marginTop: 15,
    flexDirection: 'column',
  },
  profileInfo: {
    paddingLeft: 10,
    paddingTop: 0,
  },
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
    lineHeight: 20,
  },
  text: {
    padding: 2,
  },
  caption: {
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 14,
  },
  updateSection: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 6,
  },
  systemInfo: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  drawerSection: {
    marginTop: 0,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
