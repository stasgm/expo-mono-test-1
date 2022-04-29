import { StyleSheet, View } from 'react-native';
import { Button, withTheme, Text } from '@rneui/themed';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Header } from '@lib/mob-ui';

const HomeScreen = () => {
  return (
    <SafeAreaProvider>
      <Header title="Home screen" />
      <View style={styles.container}>
        <Text>greeting</Text>
        <Button title={'Click me'} />
      </View>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default withTheme(HomeScreen);
