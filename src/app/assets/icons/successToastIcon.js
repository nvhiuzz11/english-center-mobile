import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

export const SuccessToastIcon = props => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zm5.686-12.272a1 1 0 10-1.372-1.456l-5.98 5.633-2.648-2.494a1 1 0 10-1.372 1.456l2.829 2.664a1.746 1.746 0 002.381 0l6.162-5.803z"
        fill="#00B64B"
      />
    </Svg>
  );
};
