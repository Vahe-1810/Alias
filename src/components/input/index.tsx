import { TextInput, TextInputProps } from 'react-native';
function AppTextInput({ style, ...props }: TextInputProps) {
  // eslint-disable-next-line react-native/no-inline-styles
  return <TextInput {...props} style={[{ fontFamily: 'MadimiOne-Regular' }, style]} />;
}

export default AppTextInput;
