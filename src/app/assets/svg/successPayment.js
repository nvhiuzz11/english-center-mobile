import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

export const SuccessPayment = props => {
  return (
    <Svg
      width={120}
      height={120}
      viewBox="0 0 390 389"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M368.455 215.212c-13.897 69.487-66.29 134.916-139.808 149.537a173.722 173.722 0 01-185.116-84.814 173.718 173.718 0 0122.6-202.363c50.42-55.534 135.555-70.821 205.042-43.026"
        stroke="#20AE5C"
        strokeWidth={41.6923}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M132.2 187.416l69.487 69.487L368.456 76.237"
        stroke="#20AE5C"
        strokeWidth={41.6923}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
