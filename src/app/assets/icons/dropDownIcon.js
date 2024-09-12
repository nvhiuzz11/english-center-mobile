import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

export const DropDownIcon = props => {
  return (
    <Svg
      width={30}
      height={30}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M17.92 8.18H6.08c-.96 0-1.44 1.16-.76 1.84l5.18 5.18c.83.83 2.18.83 3.01 0l1.97-1.97 3.21-3.21c.67-.68.19-1.84-.77-1.84z"
        fill={props.color || '#1F1F1F'}
      />
    </Svg>
  );
};
