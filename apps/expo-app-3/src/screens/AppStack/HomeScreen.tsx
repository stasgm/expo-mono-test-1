import { DrawerScreenProps } from '@react-navigation/drawer';
import { CompositeScreenProps } from '@react-navigation/native';

import { Layout } from '../../components/base';
import HomeContainer from '../../containers/app/HomeContainer';
import { DrawerParamList, RootStackScreenProps } from '../../utils';

type Props = CompositeScreenProps<RootStackScreenProps<'Drawer'>, DrawerScreenProps<DrawerParamList, never>>;

const HomeScreen = ({ navigation }: Props) => {
  return (
    <Layout flex safe>
      <HomeContainer onToggleDrawer={navigation.toggleDrawer} />
    </Layout>
  );
};

export default HomeScreen;
