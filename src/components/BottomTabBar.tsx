import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import React from 'react';
import { StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import ScalePress from '@/components/ScalePress';
import TabIcon from '@/components/TabIcon';
import { useSharedState } from '@/context/SharedContext';
import { BOTTOM_TAB_HEIGHT, Colors } from '@/utils/Constants';

const BottomTabBar = (props: BottomTabBarProps) => {
  const { state, navigation } = props;

  const { translationY } = useSharedState();
  const insets = useSafeAreaInsets();

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: -translationY.value }],
    };
  });

  return (
    <Animated.View style={[styles.container, animatedStyle, { paddingBottom: insets.bottom }]}>
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const longPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <ScalePress key={route.key} onPress={onPress} onLongPress={longPress} style={styles.tab}>
            <TabIcon label={route.name === 'index' ? 'home' : route.name} focused={isFocused} />
          </ScalePress>
        );
      })}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.backgroundDark,
    width: '100%',
    height: BOTTOM_TAB_HEIGHT,
    position: 'absolute',
    bottom: 0,
    paddingTop: 10,
    zIndex: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  tab: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabText: {
    color: Colors.text,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default BottomTabBar;
