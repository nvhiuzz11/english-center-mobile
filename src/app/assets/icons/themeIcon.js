import {useTheme} from '@react-navigation/native';
import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

export const ThemeIcon = props => {
  const {colors} = useTheme();
  return (
    <Svg
      width={25}
      height={24}
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M12.016 7.89l-1.07 1.86c-.24.41-.04.75.43.75h1.27c.48 0 .67.34.43.75l-1.06 1.86"
        stroke={colors.ICON_TAB_COLOR || '#1F1F1F'}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M8.316 18.04v-1.16c-2.3-1.39-4.19-4.1-4.19-6.98 0-4.95 4.55-8.83 9.69-7.71 2.26.5 4.24 2 5.27 4.07 2.09 4.2-.11 8.66-3.34 10.61v1.16c0 .29.11.96-.96.96h-5.51c-1.1.01-.96-.42-.96-.95zM8.516 22c2.29-.65 4.71-.65 7 0"
        stroke={colors.ICON_TAB_COLOR || '#1F1F1F'}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
