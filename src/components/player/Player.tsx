import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { Gesture, GestureDetector, ScrollView } from 'react-native-gesture-handler';
import Animated, {
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import AirPlayer from '@/components/player/AirPlayer';
import FullscreenPlayer from '@/components/player/FullscreenPlayer';
import { useSharedState } from '@/context/SharedContext';
import { MAX_PLAYER_HEIGHT, MIN_PLAYER_HEIGHT } from '@/utils/Constants';

const withPlayer = <P extends object>(WrappedComponent: React.ComponentType<P>): React.FC<P> => {
  const WithPlayer: React.FC<P> = (props) => {
    const { translationY } = useSharedState();
    const isExpanded = useSharedValue(false);
    const isScrolling = useSharedValue(false);

    const scrollRef = useRef<Animated.ScrollView>(null);

    useEffect(() => {
      translationY.value = withTiming(0, { duration: 0 });
    }, [translationY]);

    const handleScroll = useAnimatedScrollHandler({
      onBeginDrag: ({ contentOffset }) => {
        if (contentOffset.y === 0) isScrolling.value = false;
      },
      onEndDrag: ({ contentOffset }) => {
        if (contentOffset.y === 0) isScrolling.value = false;
      },
      onMomentumEnd: ({ contentOffset }) => {
        if (contentOffset.y === 0) isScrolling.value = false;
      },
    });

    const panGesture = Gesture.Pan()
      .onChange(() => {
        if (translationY.value <= -602) {
          isScrolling.value = true;
        }
      })
      .onUpdate((event) => {
        translationY.value = Math.max(
          Math.min(
            event.translationY + (isExpanded.value ? -MAX_PLAYER_HEIGHT + MIN_PLAYER_HEIGHT : 0),
            0
          ),
          -MAX_PLAYER_HEIGHT + MIN_PLAYER_HEIGHT
        );
      })
      .onEnd((event) => {
        if (event.translationY < -MIN_PLAYER_HEIGHT / 2) {
          isExpanded.value = true;
          translationY.value = withTiming(-MAX_PLAYER_HEIGHT + MIN_PLAYER_HEIGHT, {
            duration: 300,
          });
        } else {
          isExpanded.value = false;
          translationY.value = withTiming(0, { duration: 300 });
        }
      })
      .enabled(!isScrolling.value);

    const animatedContainerStyle = useAnimatedStyle(() => {
      const height = interpolate(
        translationY.value,
        [-MAX_PLAYER_HEIGHT + MIN_PLAYER_HEIGHT, 0],
        [MAX_PLAYER_HEIGHT, MIN_PLAYER_HEIGHT],
        'clamp'
      );
      return {
        height,
        borderTopLeftRadius: translationY.value < -2 ? 15 : 0,
        borderTopRightRadius: translationY.value < -2 ? 15 : 0,
      };
    });

    const collapsedOpacityStyle = useAnimatedStyle(() => {
      const opacity = interpolate(translationY.value, [-2, 0], [0, 1], 'clamp');
      return {
        opacity,
        display: translationY.value < -2 ? 'none' : 'flex',
      };
    });

    const expandedOpacityStyle = useAnimatedStyle(() => {
      const opacity = interpolate(translationY.value, [-2, 0], [1, 0], 'clamp');
      return {
        opacity,
        display: translationY.value > -2 ? 'none' : 'flex',
      };
    });

    const combineGesture = Gesture.Simultaneous(panGesture, Gesture.Native());

    return (
      <View style={styles.container}>
        <WrappedComponent {...props} />
        <GestureDetector gesture={combineGesture}>
          <Animated.View style={[styles.playerContainer, animatedContainerStyle]}>
            {Platform.OS === 'ios' ? (
              <Animated.ScrollView
                persistentScrollbar
                ref={scrollRef}
                pinchGestureEnabled
                bounces={false}
                showsVerticalScrollIndicator={false}
                scrollEventThrottle={1}
                onScroll={handleScroll}
                contentContainerStyle={styles.expandedPlayer}
                style={expandedOpacityStyle}>
                <FullscreenPlayer />
              </Animated.ScrollView>
            ) : (
              <Animated.View style={expandedOpacityStyle}>
                <ScrollView
                  nestedScrollEnabled
                  persistentScrollbar
                  pinchGestureEnabled
                  bounces={false}
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={styles.expandedPlayer}>
                  <FullscreenPlayer />
                </ScrollView>
              </Animated.View>
            )}

            <Animated.View style={[styles.collapsedPlayer, collapsedOpacityStyle]}>
              <AirPlayer />
            </Animated.View>
          </Animated.View>
        </GestureDetector>
      </View>
    );
  };

  return React.memo(WithPlayer);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  expandedPlayer: {
    alignItems: 'center',
    backgroundColor: '#444',
  },
  playerContainer: {
    position: 'absolute',
    width: '100%',
    bottom: 0,
    zIndex: 1,
    overflow: 'hidden',
    // backgroundColor: 'transparent',
  },
  collapsedPlayer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default withPlayer;
