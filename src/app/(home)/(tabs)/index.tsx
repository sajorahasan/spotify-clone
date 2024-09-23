import { StyleSheet, Text } from 'react-native';

import CustomSafeAreaView from '@/components/CustomSafeAreaView';
import { Colors } from '@/utils/Constants';

export default function Home() {
  return (
    <CustomSafeAreaView style={styles.container}>
      <Text style={styles.text}>Home</Text>
    </CustomSafeAreaView>
  );
}

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
