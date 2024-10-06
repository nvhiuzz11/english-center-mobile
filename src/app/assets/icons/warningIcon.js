import * as React from 'react';
import Svg, {G, Path, Defs, ClipPath} from 'react-native-svg';

export const WarningIcon = props => {
  return (
    <Svg
      width={26}
      height={26}
      viewBox="0 0 26 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <G clipPath="url(#clip0_1222_2727)">
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M7.157.816A2.786 2.786 0 019.127 0h7.747c.738 0 1.447.293 1.97.816l6.34 6.34c.523.523.816 1.232.816 1.97v7.748c0 .738-.293 1.447-.816 1.97l-6.34 6.34a2.785 2.785 0 01-1.97.816H9.126a2.786 2.786 0 01-1.97-.816l-6.34-6.34A2.785 2.785 0 010 16.873V9.126c0-.738.293-1.447.816-1.97l6.34-6.34zM13 5.804c.77 0 1.393.623 1.393 1.392v6.036a1.393 1.393 0 01-2.786 0V7.196c0-.769.624-1.392 1.393-1.392zm1.857 12.535a1.857 1.857 0 11-3.714 0 1.857 1.857 0 013.714 0z"
          fill="#FE1717"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_1222_2727">
          <Path fill="#fff" d="M0 0H26V26H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};
