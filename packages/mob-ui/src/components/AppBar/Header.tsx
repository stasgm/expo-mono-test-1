import React, { useCallback } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { Header as HeaderRNE } from '@rneui/themed';

import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';

interface actionButton {
  icon: keyof typeof Icon.glyphMap;
  action: () => void;
  size?: number;
}

interface IHeaderProps {
  leftAction?: actionButton;
  rightAction?: actionButton;
  title: string;
}

const Header = ({ title, leftAction, rightAction }: IHeaderProps) => {
  const navigation = useNavigation();
  const toggleDrawer = useCallback(() => navigation.dispatch(DrawerActions.openDrawer()), [navigation]);

  return (
    <HeaderRNE
      leftComponent={
        <TouchableOpacity style={{ paddingRight: 20 }} onPress={leftAction ? leftAction.action : toggleDrawer}>
          <Icon name={leftAction ? leftAction.icon : 'menu'} color="white" size={30} />
        </TouchableOpacity>
      }
      rightComponent={
        rightAction && (
          <TouchableOpacity style={{ paddingLeft: 20 }} onPress={rightAction.action}>
            <Icon name={rightAction.icon} color="white" size={30} />
          </TouchableOpacity>
        )
      }
      centerComponent={{ text: title, style: styles.heading }}
    />
  );
};

const styles = StyleSheet.create({
  heading: {
    color: 'white',
    fontSize: 20,
  },
});

export default Header;
