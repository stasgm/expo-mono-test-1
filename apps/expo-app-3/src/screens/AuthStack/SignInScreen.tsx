import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Layout, Text, Button, View, TextField } from '../../components/base';
import { attemptLogin } from '../../store/ducks/user';
import { useReduxDispatch } from '../../store';
import { AuthStackScreenProps, IconsOutlined, Spacings } from '../../utils';

const SignInScreen = () => {
  const navigation = useNavigation<AuthStackScreenProps<never>['navigation']>();
  const dispatch = useReduxDispatch();

  const [email, setEmail] = useState('bobette@bob.test');
  const [password, setPassword] = useState('test123');

  const handleLogin = async () => {
    dispatch(attemptLogin(email, password));
  };

  return (
    <Layout flex safe>
      <View flex center style={styles.container}>
        <Text h1 center style={styles.title}>
          Sign in
        </Text>
        <View style={styles.fieldsContainer}>
          <TextField label="Username:" value={email} onChangeText={setEmail} />
          <TextField label="Password:" value={password} onChangeText={setPassword} />
        </View>
        <View>
          <View center row spread>
            <Button label="Login" icon={{ name: IconsOutlined.shield, onRight: false }} onPress={handleLogin} />
            <Button
              label="Register"
              icon={{ name: IconsOutlined.person, onRight: false }}
              onPress={() => navigation.navigate('SignUp')}
            />
          </View>
        </View>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: { paddingBottom: Spacings.s4, paddingHorizontal: Spacings.s10 },
  title: { paddingBottom: Spacings.s8 },
  fieldsContainer: { paddingBottom: Spacings.s8, alignContent: 'center' },
});

export default SignInScreen;
