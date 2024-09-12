import * as React from 'react';
import Svg, {G, Path, Defs, ClipPath} from 'react-native-svg';

export const ResetFilterIcon = props => {
  return (
    <Svg
      width={14}
      height={14}
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <G clipPath="url(#clip0_1222_1943)">
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M4 5.543V4.25H3a1 1 0 00-1 1v3.5a1 1 0 001 1h1a1 1 0 110 2H3a3 3 0 01-3-3v-3.5a3 3 0 013-3h1V.957a.5.5 0 01.854-.353l2.292 2.292a.5.5 0 010 .708L4.854 5.896A.5.5 0 014 5.543zm6 6.207v1.293a.5.5 0 01-.854.354l-2.292-2.293a.5.5 0 010-.708l2.292-2.292a.5.5 0 01.854.353V9.75h1a1 1 0 001-1v-3.5a1 1 0 00-1-1h-1a1 1 0 110-2h1a3 3 0 013 3v3.5a3 3 0 01-3 3h-1z"
          fill={props.color || '#000'}
        />
      </G>
      <Defs>
        <ClipPath id="clip0_1222_1943">
          <Path fill="#fff" d="M0 0H14V14H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};
