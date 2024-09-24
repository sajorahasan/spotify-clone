import { createContext, FC, useContext } from 'react';
import { SharedValue, useSharedValue, withTiming } from 'react-native-reanimated';

import { MAX_PLAYER_HEIGHT, MIN_PLAYER_HEIGHT } from '@/utils/Constants';

interface SharedStateContextType {
  translationY: SharedValue<number>;
  expandPlayer: () => void;
  collapsePlayer: () => void;
}

export const SharedStateContext = createContext<SharedStateContextType | undefined>(undefined);

export const SharedStateProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const translationY = useSharedValue(0);

  const expandPlayer = () => {
    translationY.value = withTiming(-MAX_PLAYER_HEIGHT + MIN_PLAYER_HEIGHT, { duration: 300 });
  };

  const collapsePlayer = () => {
    translationY.value = withTiming(0, { duration: 300 });
  };

  return (
    <SharedStateContext.Provider value={{ translationY, expandPlayer, collapsePlayer }}>
      {children}
    </SharedStateContext.Provider>
  );
};

export const useSharedState = () => {
  const context = useContext(SharedStateContext);
  if (!context) {
    throw new Error('useSharedState must be used within a SharedStateProvider');
  }
  return context;
};
