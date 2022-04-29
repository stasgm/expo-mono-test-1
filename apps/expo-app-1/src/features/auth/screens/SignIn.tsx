import React from 'react';
import { Text, SafeAreaView } from 'react-native';
// import { useNavigation } from '@react-navigation/native';

import { styles } from '../../../styles';
// import { AuthScreenNavigationProp } from '../navigation/types';

const SignIn = () => {
  // const navigation = useNavigation<AuthScreenNavigationProp>();

  return (
    <>
      <SafeAreaView style={styles.container}>
        <Text>Registration screen</Text>
      </SafeAreaView>
    </>
  );
};

export default SignIn;
