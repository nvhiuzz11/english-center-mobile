import * as React from 'react';
import Svg, {Rect, Path} from 'react-native-svg';

export const FilterHomeIcon = props => {
  return (
    <Svg
      width={30}
      height={30}
      viewBox="0 0 38 38"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Rect width={38} height={38} rx={10} fill={props.bgColor || '#1F1F1F'} />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18.643 26.714a1.285 1.285 0 110-2.57 1.285 1.285 0 010 2.57zm9-1.928h-6.52a2.56 2.56 0 00-4.96 0h-6.52a.644.644 0 000 1.285h6.52a2.56 2.56 0 004.96 0h6.52a.644.644 0 000-1.285zm-2.572-4.5a1.285 1.285 0 110-2.571 1.285 1.285 0 010 2.57zm2.572-1.929h-.09a2.56 2.56 0 00-4.962 0H9.643a.644.644 0 000 1.286H22.59a2.56 2.56 0 004.961 0h.09a.644.644 0 000-1.286zm-15.429-7.071a1.285 1.285 0 110 2.57 1.285 1.285 0 010-2.57zm-2.571 1.928h.09a2.56 2.56 0 004.962 0h12.948a.644.644 0 000-1.285H14.695a2.56 2.56 0 00-4.962 0h-.09a.644.644 0 000 1.285z"
        fill={props.color || '#E8F1FF'}
      />
    </Svg>
  );
};
