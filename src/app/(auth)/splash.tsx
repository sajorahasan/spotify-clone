import React, { FC, useEffect } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';

import { Colors } from '@/utils/Constants';
import { screenHeight, screenWidth } from '@/utils/Scaling';

const SplashScreen: FC = () => {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.replace('/moodscan');
    }, 2000);
  }, []);

  return (
    <View style={styles.container}>
      <Image source={require('@/assets/images/logo.png')} style={styles.logo} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
  },
  logo: {
    width: screenHeight * 0.4,
    height: screenWidth * 0.4,
    resizeMode: 'contain',
  },
});

export default SplashScreen;
