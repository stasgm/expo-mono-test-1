import { StyleSheet } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { AuthStackScreenProps, IconsOutlined, Spacings } from '../../utils';

import { Layout, Text, Button, View, TextField } from '../../components/base';

const SignUpScreen = () => {
  const navigation = useNavigation<AuthStackScreenProps<never>['navigation']>();
  return (
    <Layout flex safe>
      <View flex center style={styles.container}>
        <Text h1 center style={styles.title}>
          Sign up
        </Text>
        <View style={styles.fields}>
          <View center>
            <TextField>username</TextField>
            <TextField>pasword</TextField>
          </View>
        </View>
        <View>
          <View center row spread>
            <Button
              label="Login"
              icon={{ name: IconsOutlined.shield, onRight: false }}
              onPress={() => navigation.navigate('SignIn')}
            />
            <Button label="Register" icon={{ name: IconsOutlined.person, onRight: false }} />
          </View>
        </View>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: { paddingBottom: Spacings.s4, paddingHorizontal: Spacings.s10 },
  title: { paddingBottom: Spacings.s8 },
  fields: { paddingBottom: Spacings.s8 },
});

export default SignUpScreen;
