import { Tabs } from 'expo-router';

import BottomTabBar from '@/components/BottomTabBar';

export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) => <BottomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
      }}>
      <Tabs.Screen name="index" key="Home" options={{ title: 'Home' }} />
      <Tabs.Screen name="search" key="Search" options={{ title: 'Search' }} />
      <Tabs.Screen name="library" key="Library" options={{ title: 'Library' }} />
    </Tabs>
  );
}
