import { Redirect, Stack } from 'expo-router';

import { SharedStateProvider } from '@/context/SharedContext';

export default function HomeLayout() {
  const isAuthenticated = true;

  if (!isAuthenticated) {
    return <Redirect href="/(auth)/splash" />;
  }

  return (
    <SharedStateProvider>
      <Stack screenOptions={{ headerShown: false }} initialRouteName="(tabs)">
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </SharedStateProvider>
  );
}
