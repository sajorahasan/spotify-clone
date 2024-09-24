import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import ScalePress from '@/components/ScalePress';
import { useSharedState } from '@/context/SharedContext';

const AirPlayer = () => {
  const { expandPlayer } = useSharedState();
  return (
    <View style={styles.container}>
      <ScalePress onPress={expandPlayer}>
        <Text style={styles.text}>AirPlayer</Text>
      </ScalePress>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 120,
    paddingTop: 4,
    paddingHorizontal: 5,
    overflow: 'hidden',
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: 'red',
  },
  text: {
    color: 'white',
  },
});

export default AirPlayer;
