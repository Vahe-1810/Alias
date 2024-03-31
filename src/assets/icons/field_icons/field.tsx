import { StyleProp, StyleSheet, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export function Field({ style, ...props }: TouchableOpacityProps & { colors?: (string | number)[] }) {
  return (
    <LinearGradient
      colors={props.colors || ['#8FA1FE', '#fff']}
      style={{ ...styles.root, ...(style as StyleProp<any>) }}>
      <TouchableOpacity onPress={props.onPress} {...props} style={{ ...styles.root, ...(style as StyleProp<any>) }}>
        {props.children}
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  root: {
    width: 150,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
});
