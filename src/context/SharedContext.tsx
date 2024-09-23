import { createContext, FC, useContext } from 'react';
import { SharedValue, useSharedValue, withSpring } from 'react-native-reanimated';

import { BOTTOM_TAB_HEIGHT } from '@/utils/Constants';
import { screenHeight } from '@/utils/Scaling';

interface SharedStateContextType {
  translationY: SharedValue<number>;
  expandPlayer: () => void;
  collapsePlayer: () => void;
}

const MIN_PLAYER_HEIGHT = BOTTOM_TAB_HEIGHT + 60;
const MAX_PLAYER_HEIGHT = screenHeight;

export const SharedStateContext = createContext<SharedStateContextType | undefined>(undefined);

export const SharedStateProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const translationY = useSharedValue(0);

  const expandPlayer = () => {
    translationY.value = withSpring(-MAX_PLAYER_HEIGHT + MIN_PLAYER_HEIGHT, { duration: 300 });
  };

  const collapsePlayer = () => {
    translationY.value = withSpring(0, { duration: 300 });
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
