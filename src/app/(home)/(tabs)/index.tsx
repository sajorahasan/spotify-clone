import { StyleSheet, Text } from 'react-native';

import CustomSafeAreaView from '@/components/CustomSafeAreaView';
import withPlayer from '@/components/player/Player';
import { Colors } from '@/utils/Constants';

const HomeScreen = () => {
  return (
    <CustomSafeAreaView>
      <Text style={styles.text}>Home</Text>
    </CustomSafeAreaView>
  );
};

export default withPlayer(HomeScreen);

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // padding: 200,
  },
  text: {
    fontSize: 24,
    color: Colors.text,
  },
});
