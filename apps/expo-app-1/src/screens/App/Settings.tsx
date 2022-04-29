import { StyleSheet, View } from 'react-native';
import { withTheme, Text } from '@rneui/themed';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Header } from '@lib/mob-ui';

const SettingsScreen = () => {
  return (
    <SafeAreaProvider>
      <Header title="Settings" />
      <View style={styles.container}>
        <Text>Settings</Text>
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

export default withTheme(SettingsScreen);
