import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Header } from '@lib/mob-ui';

const MapViewScreen = () => {
  return (
    <SafeAreaProvider>
      <Header title="Home screen" />
      <View style={styles.container}>
        <Text>There will be a map</Text>
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

export default MapViewScreen;
