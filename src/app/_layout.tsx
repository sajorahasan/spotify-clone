import { Slot } from 'expo-router';
import { useCallback, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

function RootProviders({ children }: { children: React.ReactNode }) {
  return <GestureHandlerRootView style={styles.container}>{children}</GestureHandlerRootView>;
}

function RootLayoutNav() {
  // const [loaded] = useFonts({
  //   'WorkSans-Regular': require('../../assets/fonts/WorkSans-Regular.ttf'),
  //   'WorkSans-SemiBold': require('../../assets/fonts/WorkSans-SemiBold.ttf'),
  //   'Overpass-SemiBold': require('../../assets/fonts/Overpass-SemiBold.ttf'),
  // });

  // const hideSplash = useCallback(async () => {
  //   await SplashScreen.hideAsync();
  // }, []);

  // useEffect(() => {
  //   if (loaded) {
  //     setTimeout(() => hideSplash(), 1500);
  //   }
  // }, [hideSplash, loaded]);

  return (
    <RootProviders>
      <Slot />
    </RootProviders>
  );
}

export default function RootLayout() {
  return <RootLayoutNav />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
