import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

const PlayIcon = (props: SvgProps) => (
  <Svg
    // @ts-ignore-next-line
    xmlns="http://www.w3.org/2000/svg"
    width={32}
    height={32}
    viewBox="-0.5 0 7 7"
    {...props}>
    <Path
      fill="#000"
      fillRule="evenodd"
      d="M5.495 2.573 1.5.143C.832-.266 0 .25 0 1.068V5.93c0 .82.832 1.333 1.5.927l3.995-2.43c.673-.41.673-1.445 0-1.855"
    />
  </Svg>
);
export default PlayIcon;
