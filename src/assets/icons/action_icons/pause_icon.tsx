import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';
const PauseIcon = (props: SvgProps) => (
  <Svg
    // @ts-ignore-next-line
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    width={32}
    height={32}
    viewBox="0 0 277.338 277.338"
    {...props}>
    <Path d="M14.22 45.665v186.013c0 25.223 16.711 45.66 37.327 45.66 20.618 0 37.339-20.438 37.339-45.66V45.665C88.886 20.454 72.165.008 51.547.008 30.931 0 14.22 20.454 14.22 45.665zM225.78 0c-20.614 0-37.325 20.446-37.325 45.657V231.67c0 25.223 16.711 45.652 37.325 45.652s37.338-20.43 37.338-45.652V45.665C263.109 20.454 246.394 0 225.78 0z" />
  </Svg>
);
export default PauseIcon;
