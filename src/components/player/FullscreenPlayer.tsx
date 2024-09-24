import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { Colors } from '@/utils/Constants';
import { screenHeight, screenWidth } from '@/utils/Scaling';

const FullscreenPlayer = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>FullscreenPlayer</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: screenWidth,
    height: screenHeight,
    // backgroundColor: Colors.background,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#fce',
  },
  text: {
    color: 'white',
    fontSize: 20,
  },
});

export default FullscreenPlayer;
