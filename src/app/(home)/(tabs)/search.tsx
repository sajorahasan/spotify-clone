import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import CustomSafeAreaView from '@/components/CustomSafeAreaView';
import { Colors } from '@/utils/Constants';

const Search = () => {
  return (
    <CustomSafeAreaView style={styles.container}>
      <Text style={styles.text}>Search</Text>
    </CustomSafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
  },
});

export default Search;
