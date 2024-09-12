import * as React from 'react';
import Svg, {Circle, Path} from 'react-native-svg';

export const LoginArrow = props => {
  return (
    <Svg
      width={48}
      height={48}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Circle cx={24} cy={24} r={24} fill="#fff" />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.25 24.867h15.788l-5.363 5.303a1.23 1.23 0 00.015 1.732 1.263 1.263 0 001.752.015l7.495-7.412a1.22 1.22 0 00.366-.869v-.005c0-.159-.033-.323-.097-.473a1.321 1.321 0 00-.269-.4l-7.495-7.412a1.263 1.263 0 00-1.752.014 1.225 1.225 0 00-.015 1.733l5.363 5.303H14.25c-.688 0-1.249.555-1.249 1.235 0 .681.56 1.236 1.25 1.236z"
        fill="#0088cc"
      />
    </Svg>
  );
};
