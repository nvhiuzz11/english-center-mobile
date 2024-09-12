import * as React from 'react';
import Svg, {G, Path, Defs, ClipPath} from 'react-native-svg';

export const VNFlag = props => {
  return (
    <Svg
      width={24}
      height={16}
      viewBox="0 0 513 343"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <G clipPath="url(#clip0_301_64)">
        <Path d="M197.025.96H0v341.993h513V.96H197.025z" fill="#D80027" />
        <Path
          d="M256.5 73.043l22.707 69.883h73.481l-59.448 43.19 22.708 69.885L256.5 212.81l-59.448 43.191 22.708-69.885-59.448-43.19h73.481L256.5 73.043z"
          fill="#FFDA44"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_301_64">
          <Path fill="#fff" transform="translate(0 .956)" d="M0 0H513V342H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};
