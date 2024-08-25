import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

export const HomeTabIcon = props => {
  return (
    <Svg
      width={20}
      height={20}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M.455 8.636C.165 8.906 0 9.284 0 9.68v8.176C0 19.041.96 20 2.143 20H8.57v-4.286a1.429 1.429 0 112.858 0V20h6.428C19.041 20 20 19.04 20 17.857V9.681c0-.397-.165-.775-.455-1.045L10.465.172a.714.714 0 00-.93 0L.455 8.636z"
        fill={props.color || '#1F1F1F'}
      />
    </Svg>
  );
};
