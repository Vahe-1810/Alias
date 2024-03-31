import { Text, TextProps } from 'react-native';

function AppText({ children, style, ...props }: TextProps) {
  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <Text {...props} style={[{ fontFamily: 'MadimiOne-Regular' }, style]}>
      {children}
    </Text>
  );
}

export default AppText;
