import * as React from 'react';
import Svg, {G, Path, Defs, ClipPath} from 'react-native-svg';

export const ReloadIcon = props => {
  return (
    <Svg
      width={20}
      height={20}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <G clipPath="url(#clip0_1222_1943)">
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M5.714 7.918V6.071H4.286c-.79 0-1.429.64-1.429 1.429v5c0 .789.64 1.429 1.429 1.429h1.428a1.429 1.429 0 110 2.857H4.286A4.286 4.286 0 010 12.5v-5a4.286 4.286 0 014.286-4.286h1.428V1.367c0-.636.77-.955 1.22-.505l3.275 3.276a.714.714 0 010 1.01L6.934 8.424a.714.714 0 01-1.22-.506zm8.572 8.868v1.847c0 .636-.77.955-1.22.505l-3.275-3.276a.714.714 0 010-1.01l3.275-3.276a.714.714 0 011.22.506v1.847h1.428c.79 0 1.429-.64 1.429-1.429v-5c0-.789-.64-1.429-1.429-1.429h-1.428a1.429 1.429 0 110-2.857h1.428A4.286 4.286 0 0120 7.5v5a4.286 4.286 0 01-4.286 4.286h-1.428z"
          fill="#000"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_1222_1943">
          <Path fill="#fff" d="M0 0H20V20H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};
