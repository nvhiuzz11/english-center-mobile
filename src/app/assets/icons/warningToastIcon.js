import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

export const WarningToastIcon = props => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      {...props}>
      <Path
        d="M12 21.893c-5.523 0-10-4.477-10-10 0-5.522 4.477-10 10-10s10 4.478 10 10c0 5.523-4.477 10-10 10zm0-15a1 1 0 00-1 1v5a1 1 0 002 0v-5a1 1 0 00-1-1zm0 10a1 1 0 100-2 1 1 0 000 2z"
        fill={props.color || '#FCB100'}
      />
    </Svg>
  );
};
