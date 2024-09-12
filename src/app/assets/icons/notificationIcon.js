import {useTheme} from '@react-navigation/native';
import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

export const NotificationlIcon = props => {
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
        d="M12.016 6.44v3.33M12.036 2c-3.68 0-6.66 2.98-6.66 6.66v2.1c0 .68-.28 1.7-.63 2.28l-1.27 2.12c-.78 1.31-.24 2.77 1.2 3.25a23.34 23.34 0 0014.73 0 2.22 2.22 0 001.2-3.25l-1.27-2.12c-.35-.58-.63-1.61-.63-2.28v-2.1C18.695 5 15.696 2 12.036 2z"
        stroke={colors.ICON_TAB_COLOR || '#1F1F1F'}
        strokeWidth={1.5}
        strokeMiterlimit={10}
        strokeLinecap="round"
      />
      <Path
        d="M15.345 18.82c0 1.83-1.5 3.33-3.33 3.33-.91 0-1.75-.38-2.35-.98-.6-.6-.98-1.44-.98-2.35"
        stroke={colors.ICON_TAB_COLOR || '#1F1F1F'}
        strokeWidth={1.5}
        strokeMiterlimit={10}
      />
    </Svg>
  );
};
