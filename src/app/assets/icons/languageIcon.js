import {useTheme} from '@react-navigation/native';
import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

export const LanguagelIcon = props => {
  const {colors} = useTheme();
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M5 7h7m-2-2v2c0 2.122-.527 4.157-1.464 5.657C7.598 14.157 6.326 15 5 15m1-4c-.002 1.032.695 2.024 1.943 2.77 1.249.745 2.953 1.186 4.757 1.23M11 19l4-9 4 9m-.9-2h-6.2"
        stroke={colors.ICON_TAB_COLOR || '#1F1F1F'}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
