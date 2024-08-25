import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

export const ClassTabIcon = props => {
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
        d="M1.426.079a1.98 1.98 0 01.831-.06l.017.003a12.482 12.482 0 015.773 2.582V16.65C5.959 15.2 4.073 14.527 1.74 14.138A1.98 1.98 0 010 12.164V1.98A1.98 1.98 0 011.426.079zm8.407 8.335v-5.81A12.482 12.482 0 0115.605.022l.017-.002a1.979 1.979 0 012.257 1.96v10.184a1.98 1.98 0 01-.745 1.556 4.667 4.667 0 00-.857-.079h-1.072v-2.143a3.571 3.571 0 00-5.372-3.084zm.015 10.585v-7.5a1.786 1.786 0 113.571 0v3.928h2.858a2.857 2.857 0 012.857 2.857V19c0 .394-.32.714-.715.714h-7.857a.714.714 0 01-.714-.714z"
        fill={props.color || '#1F1F1F'}
      />
    </Svg>
  );
};
