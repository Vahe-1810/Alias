import { SafeAreaView, StyleProp, StyleSheet, ViewStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

function Layout({ children, style }: { children: React.ReactNode; style?: StyleProp<ViewStyle> }) {
  return (
    <SafeAreaView>
      <LinearGradient colors={['#6b25d0', '#9fd1fb']} style={[style, styles.root]}>
        {children}
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { padding: 30, height: '100%', width: '100%' },
});

export default Layout;
