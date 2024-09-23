import React from 'react';
import { View, SafeAreaView, StyleSheet, StyleProp, ViewStyle } from 'react-native';

import { Colors } from '@/utils/Constants';

interface CustomSafeAreaViewProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

const CustomSafeAreaView = ({ children, style }: CustomSafeAreaViewProps) => {
  return (
    <View style={[styles.container, style]}>
      <SafeAreaView />
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 2,
    paddingHorizontal: 5,
    backgroundColor: Colors.background,
  },
});

export default CustomSafeAreaView;
