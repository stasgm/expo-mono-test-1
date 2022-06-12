import { DrawerScreenProps } from '@react-navigation/drawer';
import { CompositeScreenProps } from '@react-navigation/native';

import SettingsContainer from '../../containers/app/SettingsContainer';

import { Layout } from '../../components/base';
import { DrawerParamList, RootStackScreenProps } from '../../utils';

type Props = CompositeScreenProps<RootStackScreenProps<'Drawer'>, DrawerScreenProps<DrawerParamList, never>>;

const Setting = ({ navigation }: Props) => {
  return (
    <Layout flex safe>
      <SettingsContainer onToggleDrawer={navigation.toggleDrawer} />
    </Layout>
  );
};

export default Setting;
