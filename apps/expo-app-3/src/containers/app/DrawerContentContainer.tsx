import { DrawerContentComponentProps, useDrawerProgress } from '@react-navigation/drawer';
import { memo } from 'react';
import { StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';

import { DrawerContent } from '../../components/app/DrawerContent';
import { Layout } from '../../components/base';

type Props = DrawerContentComponentProps;

const DrawerContentContainer = (props: Props) => {
  const { navigation } = props;

  const progress = useDrawerProgress() as Animated.Node<number>;

  const translateX = Animated.interpolateNode(progress, {
    inputRange: [0, 0.5, 0.7, 0.8, 1],
    outputRange: [-100, -85, -70, -45, 0],
  });

  return (
    <Layout flex safe>
      <Animated.View style={[styles.drawerContent, { transform: [{ translateX }] }]}>
        <DrawerContent
          onGoToScreen={(screen) => navigation.navigate(screen)}
          onToggleDrawer={navigation.toggleDrawer}
        />
      </Animated.View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
    marginHorizontal: 5,
  },
});

export default memo(DrawerContentContainer);
