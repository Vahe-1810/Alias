import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

const HyIcon = (props: SvgProps) => (
  <Svg //@ts-ignore
    xmlns="http://www.w3.org/2000/svg"
    width={32}
    height={32}
    aria-hidden="true"
    className="iconify iconify--twemoji"
    viewBox="0 0 36 36"
    {...props}>
    <Path fill="#D90012" d="M32 5H4a4 4 0 0 0-4 4v4h36V9a4 4 0 0 0-4-4z" />
    <Path fill="#F2A800" d="M4 31h28a4 4 0 0 0 4-4v-4H0v4a4 4 0 0 0 4 4z" />
    <Path fill="#0033A0" d="M0 13h36v10H0z" />
  </Svg>
);
export default HyIcon;
