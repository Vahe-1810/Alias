import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

const RuIcon = (props: SvgProps) => (
  <Svg
    //@ts-ignore
    xmlns="http://www.w3.org/2000/svg"
    width={32}
    height={32}
    aria-hidden="true"
    className="iconify iconify--twemoji"
    viewBox="0 0 36 36"
    {...props}>
    <Path fill="#CE2028" d="M36 27a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4v-4h36v4z" />
    <Path fill="#22408C" d="M0 13h36v10H0z" />
    <Path fill="#EEE" d="M32 5H4a4 4 0 0 0-4 4v4h36V9a4 4 0 0 0-4-4z" />
  </Svg>
);

export default RuIcon;
