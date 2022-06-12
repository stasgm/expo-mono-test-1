import { ReactElement } from 'react';
import { StyleProp, ViewStyle, StyleSheet } from 'react-native';
import { Divider, Drawer, DrawerGroup, DrawerItem, MenuItemProps } from '@ui-kitten/components';

import { IconsOutlined, IconType, openTwitter, DrawerParamList } from '../../utils';
import { Icon, Layout, Text, View } from '../base';

type Props = {
  onGoToScreen: (name: keyof DrawerParamList) => void;
  onToggleDrawer: () => void;
  style?: StyleProp<ViewStyle>;
};

const UPDATES = 'Updates';

type MenuItem = {
  icon: IconType;
  title?: string;
  dest: keyof DrawerParamList | typeof UPDATES;
  rightIcon?: IconType;
};

const items: MenuItem[] = [
  { icon: IconsOutlined.home, dest: 'Home' },
  { icon: IconsOutlined.barChart, dest: 'Stats' },
  { icon: IconsOutlined.book, dest: 'Help' },
  { icon: IconsOutlined.settings, dest: 'Settings' },
  { icon: IconsOutlined.info, dest: 'About' },
  { icon: IconsOutlined.twitter, dest: UPDATES },
];

const more: MenuItem[] = [];

const user = {
  firstName: 'Stanislau',
  lastName: 'Shliakhtsich',
  name: 'Stas',
};

const company = {
  name: 'Another good company',
};

const appliction = {
  name: 'App for testing features',
  version: '0.01',
};

export function DrawerContent({ onGoToScreen, onToggleDrawer, style }: Props) {
  const onPressItem = (dest: MenuItem['dest']) => {
    switch (dest) {
      case UPDATES:
        openTwitter();
        break;
      default:
        onToggleDrawer();
        onGoToScreen(dest);
        break;
    }
  };

  const Header = () => {
    return (
      <View>
        <View style={styles.profileContainer}>
          <Text right category="h6">{`${user.firstName} ${user.lastName}`}</Text>
          <Text right hint>{`${company.name}`}</Text>
        </View>
        <Divider />
      </View>
    );
  };

  const Footer = () => {
    return (
      <Layout style={styles.footer}>
        <Text category="c2">{appliction.name}</Text>
        <Text category="c1" hint right>{`Version: ${appliction.version}`}</Text>
      </Layout>
    );
  };

  const renderItem = ({ icon, dest, title = dest, rightIcon }: MenuItem): ReactElement<MenuItemProps> => (
    <DrawerItem
      key={icon}
      accessoryLeft={(props) => <Icon name={icon} {...props} />}
      title={title}
      onPress={() => onPressItem(dest)}
      accessoryRight={rightIcon ? (props) => <Icon name={rightIcon} {...props} /> : undefined}
    />
  );

  const drawerItems = [
    ...items.map(renderItem),
    ...(more.length
      ? [
          <DrawerGroup key="more" title="More" accessoryLeft={(props) => <Icon name={IconsOutlined.menu} {...props} />}>
            {more.map(renderItem)}
          </DrawerGroup>,
        ]
      : []),
  ];

  return (
    <Drawer style={style} footer={Footer} header={Header}>
      {drawerItems}
    </Drawer>
  );
}

const styles = StyleSheet.create({
  profileContainer: {
    flexDirection: 'column',
    padding: 10,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
});
