import * as React from 'react';
import Svg, {G, Path, Defs, ClipPath} from 'react-native-svg';

export const AddCircleIcon = props => {
  return (
    <Svg
      width={25}
      height={25}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <G clipPath="url(#clip0_1222_1856)">
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M20 10c0 5.523-4.477 10-10 10S0 15.523 0 10 4.477 0 10 0s10 4.477 10 10zM10 4.643c.592 0 1.071.48 1.071 1.071V8.93h3.215a1.071 1.071 0 010 2.142H11.07v3.215a1.071 1.071 0 01-2.142 0V11.07H5.714a1.071 1.071 0 110-2.142H8.93V5.714c0-.591.48-1.071 1.071-1.071z"
          fill={props.color || '#1F1F1F'}
        />
      </G>
      <Defs>
        <ClipPath id="clip0_1222_1856">
          <Path fill="#fff" d="M0 0H20V20H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};
