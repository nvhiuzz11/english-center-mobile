import * as React from 'react';
import Svg, {G, Path, Defs, ClipPath} from 'react-native-svg';

export const ChangeTypeIcon = props => {
  return (
    <Svg
      width={20}
      height={20}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <G clipPath="url(#clip0_1222_3412)">
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12.678 1.236L7.322.164v18.6l5.356 1.072v-18.6zm1.786 18.563l4.995-1.249a.714.714 0 00.541-.693V.714a.714.714 0 00-.888-.693l-4.648 1.162V19.8zM.54 1.449L5.536.202v18.616L.888 19.979A.714.714 0 010 19.286V2.143c0-.328.223-.614.541-.693z"
          fill="#2A2A2A"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_1222_3412">
          <Path fill="#fff" d="M0 0H20V20H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};
