import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

export const NoIcon = props => {
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
        d="M9.25 4.75a.638.638 0 00-.9 0L7 6.1 5.65 4.75a.637.637 0 00-.9.9L6.1 7 4.75 8.35a.637.637 0 00.9.9L7 7.9l1.35 1.35a.637.637 0 00.9-.9L7.9 7l1.35-1.35a.637.637 0 000-.9zm3.477 7.34a.636.636 0 01-.636.637H1.909a.636.636 0 01-.636-.636V1.909c0-.352.285-.636.636-.636h10.182c.352 0 .636.284.636.636v10.182zM12.091 0H1.909C.855 0 0 .854 0 1.91v10.18C0 13.147.855 14 1.91 14h10.18c1.056 0 1.91-.854 1.91-1.91V1.91C14 .853 13.146 0 12.09 0z"
        fill="#FF001E"
      />
    </Svg>
  );
};
