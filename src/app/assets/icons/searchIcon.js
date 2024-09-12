import * as React from 'react';
``;
import Svg, {G, Path, Defs, ClipPath} from 'react-native-svg';

export const SearchIcon = props => {
  return (
    <Svg
      width={20}
      height={20}
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <G clipPath="url(#clip0_1222_2364)">
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M2 6a4 4 0 118 0 4 4 0 01-8 0zm4-6a6 6 0 103.476 10.89l2.817 2.817a1 1 0 001.414-1.414l-2.816-2.816A6 6 0 006 0z"
          fill={props.color || '#000'}
        />
      </G>
      <Defs>
        <ClipPath id="clip0_1222_2364">
          <Path fill="#fff" d="M0 0H14V14H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};
