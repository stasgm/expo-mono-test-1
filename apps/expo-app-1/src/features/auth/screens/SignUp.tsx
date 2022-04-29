import React from 'react';
import { Text, SafeAreaView } from 'react-native';
// import { useNavigation } from '@react-navigation/native';

import { styles } from '../../../styles';
// import { AuthScreenNavigationProp } from '../navigation/types';

const SignUp = () => {
  // const navigation = useNavigation<AuthScreenNavigationProp>();

  return (
    <>
      <SafeAreaView style={styles.container}>
        <Text>Login screen</Text>
      </SafeAreaView>
    </>
  );
};

export default SignUp;
