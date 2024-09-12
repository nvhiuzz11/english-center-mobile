import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

export const YesIcon = props => {
  return (
    <Svg
      width={16}
      height={16}
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.036 4.526L6.337 8.73a.63.63 0 00.199.869.63.63 0 00.872-.182l2.7-4.204a.63.63 0 00-.199-.87.63.63 0 00-.873.183zm3.691 7.565a.636.636 0 01-.636.636H1.909a.636.636 0 01-.636-.636V1.909c0-.352.284-.636.636-.636h10.182c.352 0 .636.284.636.636v10.182zM12.091 0H1.909C.854 0 0 .854 0 1.91v10.18C0 13.147.854 14 1.91 14h10.18c1.056 0 1.91-.854 1.91-1.91V1.91C14 .853 13.146 0 12.09 0z"
        fill="#167F71"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.4 8.76L4.413 4.529a.642.642 0 00-.893-.162.642.642 0 00-.147.896L6.36 9.494a.642.642 0 00.893.162.642.642 0 00.147-.896z"
        fill="#167F71"
      />
    </Svg>
  );
};
