import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

export const ChildTabIcon = props => {
  return (
    <Svg
      width={20}
      height={18}
      viewBox="0 0 20 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.429 4.429a4.286 4.286 0 11-8.572 0 4.286 4.286 0 018.572 0zm-4.286 5.714A7.143 7.143 0 000 17.286c0 .394.32.714.714.714h12.857c.395 0 .715-.32.715-.714a7.143 7.143 0 00-7.143-7.143zM19.286 18h-3.318a2.5 2.5 0 00.104-.714 8.915 8.915 0 00-3.56-7.135A7.143 7.143 0 0120 17.286c0 .394-.32.714-.714.714zm-6.429-9.286c-.43 0-.847-.063-1.24-.182a6.05 6.05 0 001.597-4.103A6.05 6.05 0 0011.618.325a4.286 4.286 0 111.24 8.39z"
        fill={props.color || '#1F1F1F'}
      />
    </Svg>
  );
};
