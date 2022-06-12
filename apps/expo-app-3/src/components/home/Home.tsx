import { StyleSheet } from 'react-native';

import { IconsOutlined, Spacings } from '../../utils';
import { Button, HeaderButton, Text, View } from '../base';
import { setLogout } from '../../store/ducks/user';
import { useReduxDispatch } from '../../store';

type Props = {
  onToggleDrawer: () => void;
};

const Home = ({ onToggleDrawer }: Props) => {
  const renderWelcome = () => (
    <Text italic center style={styles.welcome} category="h6" status="primary">
      Welcome !
    </Text>
  );

  const dispatch = useReduxDispatch();

  const handleLogout = async () => {
    dispatch(setLogout());
  };

  return (
    <View flex>
      <View row>
        <HeaderButton icon={IconsOutlined.menu} onPress={onToggleDrawer} />
      </View>
      <View flex center style={styles.container}>
        <Text h1 center style={styles.title}>
          Hello
        </Text>
        <View style={styles.stats}>{renderWelcome()}</View>
        <View row center>
          <Button label="Logout" icon={{ name: IconsOutlined.logOut, onRight: true }} onPress={handleLogout} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { paddingBottom: Spacings.s4, paddingHorizontal: Spacings.s10 },
  title: { paddingBottom: Spacings.s8 },
  stats: { paddingBottom: Spacings.s6 },
  welcome: { paddingBottom: Spacings.s4 },
});

export default Home;
