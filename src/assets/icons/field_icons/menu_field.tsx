import * as React from 'react';
import { useTranslation } from 'react-i18next';
import Svg, { G, Path, Ellipse, Defs, LinearGradient, Stop, Text, SvgProps } from 'react-native-svg';
import theme from 'theme';

const MenuField = (props: SvgProps) => {
  const { i18n } = useTranslation();
  const isHy = i18n.language === 'hy';

  return (
    <Svg onPress={props.onPress} width={216} height={110} fill="none" {...props}>
      <G filter="url(#a)">
        <Path
          fill="#FEF2EA"
          d="M.98 15.826C.856.084 12.32.157 19.534.886c44.392.932 138.448 2.966 159.528 3.64 21.08.673 23.12 12.354 21.505 18.11l-8.153 40.434c-1.89 9.21-11.604 13.05-16.225 13.82L28.275 87.978c-12.022.437-18.912-5.77-20.855-8.928C3.74 77.447 1.593 36.233.98 15.826Z"
        />
      </G>
      <Path
        fill="#BEC8FF"
        d="M11.507 19.45C11.397 5.974 21.654 6.037 28.109 6.661c39.72.798 123.875 2.538 142.736 3.115 18.861.577 20.687 10.574 19.242 15.5l-7.295 34.608c-1.692 7.883-10.383 11.17-14.517 11.828l-132.346 9.49c-10.757.375-16.922-4.938-18.66-7.64-3.292-1.373-5.213-36.648-5.762-54.114Z"
      />
      <Path
        fill="#D8DEFB"
        d="m22.27 87.856-5.772-16.603c3.793 5.494 12.718 4.28 15.84 4.511 30.806-2.148 96.642-3.84 119.653-5.013 28.763-1.467 22.311-6.905 26.555-14.189 3.395-5.826 10.805-23.964 11.905-34.609l8.315 10.296-3.395 16.392c-3.973 18.195-1.373 20.77-16.825 27.994 0 0-152.639 12.854-156.276 11.22Z"
      />
      <G filter="url(#b)">
        <Path
          fill="url(#c)"
          d="M11.507 22.612c-.11-12.391 10.147-12.333 16.602-11.76 39.72.734 123.875 2.334 142.736 2.865 18.861.53 20.687 9.724 19.242 14.255l-7.295 31.825c-1.692 7.25-10.383 10.272-14.517 10.877L35.929 79.402c-10.757.344-16.922-4.541-18.66-7.027-3.292-1.262-5.213-33.702-5.762-49.763Z"
        />
      </G>
      <Path fill="#1036FF" d="M21.445 43.007H12.84v3.216h9.09l5.413-6.184-5.898 2.968Z" />
      <Path fill="#FFF0C6" d="m21.89 46.246-7.945-.036.11 1.028 8.432.027 4.715-7.003-5.312 5.984Z" />
      <Ellipse cx={37.074} cy={11.014} fill="#fff" rx={4.02} ry={2.126} />
      <Ellipse cx={29.338} cy={11.013} fill="#fff" rx={1.52} ry={0.804} />
      <Path fill="#1036FF" d="M104.727 18.58c.769-2.007 3.007-6.491 5.809-8.371-.014 1.648-1.195 5.63-5.809 8.371Z" />
      <Path fill="#FFF4C1" d="M104.764 18.574c2.693-1.48 5.414-6.958 5.724-7.512.101 2.242-3.377 6.408-5.724 7.512Z" />
      <Defs>
        <LinearGradient id="c" x1={16.035} x2={193.567} y1={10.662} y2={48.327} gradientUnits="userSpaceOnUse">
          <Stop stopColor="#94A5FF" />
          <Stop offset={1} stopColor="#2746E6" />
        </LinearGradient>
      </Defs>
      <Text x="20" y="52" fontSize={isHy ? theme.fonts.h4 : theme.fonts.h3} fontFamily="MadimiOne-Regular" fill="wheat">
        {props.children}
      </Text>
    </Svg>
  );
};
export default MenuField;
