import React from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import { Colors, Fonts } from '@/utils/Constants';

const fontSizeMap: Record<string, number> = {
  h1: 24,
  h2: 22,
  h3: 20,
  h4: 18,
  h5: 16,
  h6: 14,
  h7: 12,
};

interface CustomTextProps extends TextProps {
  variant?: keyof typeof fontSizeMap;
  fontFamily?: Fonts;
  fontSize?: number;
}

const CustomText = ({
  variant,
  fontFamily = Fonts.Regular,
  fontSize = 12,
  children,
  ...props
}: CustomTextProps) => {
  const computedFontSize = RFValue(variant ? fontSizeMap[variant] : fontSize);

  return (
    <Text style={[styles.text, { fontFamily, fontSize: computedFontSize }, props.style]}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    textAlign: 'left',
    color: Colors.text,
  },
});

export default CustomText;
