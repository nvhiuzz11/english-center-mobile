import * as React from 'react';
import Svg, {G, Path, Defs, ClipPath} from 'react-native-svg';

export const CloseIcon = props => {
  return (
    <Svg
      width={18}
      height={18}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <G clipPath="url(#clip0_1222_2113)">
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M2.195.377A1.286 1.286 0 00.377 2.195L7.182 9 .377 15.805a1.286 1.286 0 101.818 1.818L9 10.818l6.805 6.805a1.286 1.286 0 101.818-1.818L10.818 9l6.805-6.805A1.286 1.286 0 0015.805.377L9 7.182 2.195.377z"
          fill={props.color || '#1F1F1F'}
        />
      </G>
      <Defs>
        <ClipPath id="clip0_1222_2113">
          <Path fill="#fff" d="M0 0H18V18H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};
