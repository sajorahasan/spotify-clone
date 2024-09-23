import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import CustomText from '@/components/CustomText';
import { Colors, Fonts } from '@/utils/Constants';
import { fontR } from '@/utils/Scaling';

interface TabIconProps {
  label: string;
  focused: boolean;
}

const iconMap: { [key: string]: { focused: any; unfocused: any } } = {
  home: {
    focused: require('@/assets/icons/home_focused.png'),
    unfocused: require('@/assets/icons/home.png'),
  },
  library: {
    focused: require('@/assets/icons/library_focused.png'),
    unfocused: require('@/assets/icons/library.png'),
  },
  search: {
    focused: require('@/assets/icons/search_focused.png'),
    unfocused: require('@/assets/icons/search.png'),
  },
};

const TabIcon = React.memo(({ label, focused }: TabIconProps) => {
  return (
    <View style={styles.tab}>
      <Image
        source={focused ? iconMap[label].focused : iconMap[label].unfocused}
        style={styles.icon}
      />
      <CustomText
        fontFamily={Fonts.Bold}
        style={[styles.text, { color: focused ? Colors.text : Colors.inactive }]}>
        {label}
      </CustomText>
    </View>
  );
});

const styles = StyleSheet.create({
  tab: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: RFValue(18),
    height: RFValue(18),
  },
  text: {
    textTransform: 'capitalize',
    color: Colors.text,
    textAlign: 'center',
    marginTop: 4,
    fontSize: fontR(9.5),
  },
});

export default TabIcon;
