import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

export const InfoToastIcon = props => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size || 24}
      height={props.size || 24}
      viewBox="0 0 24 24"
      fill="none"
      {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zm-2-10.5a1 1 0 011-1h1a1 1 0 011 1v4a1 1 0 110 2h-1a1 1 0 01-1-1v-4a1 1 0 01-1-1zm1.75-5a1.25 1.25 0 100 2.5 1.25 1.25 0 000-2.5z"
        fill={props?.color || '#42A5F5'}
      />
    </Svg>
  );
};
