import { ReactNode } from 'react';
import { TouchableOpacity, TouchableOpacityProps, Animated } from 'react-native';
// import { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

interface ScalePressProps extends TouchableOpacityProps {
  children: ReactNode;
}

const ScalePress: React.FC<ScalePressProps> = ({ children, ...props }) => {
  const scaleValue = new Animated.Value(1);

  const onPressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.8,
      useNativeDriver: true,
    }).start();
  };

  const onPressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <TouchableOpacity {...props} onPressIn={onPressIn} onPressOut={onPressOut}>
      <Animated.View style={{ transform: [{ scale: scaleValue }], width: '100%' }}>
        {children}
      </Animated.View>
    </TouchableOpacity>
  );
};

export default ScalePress;
