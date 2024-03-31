import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  View,
  Modal as NativeModal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView,
  useWindowDimensions,
  StyleSheet,
} from 'react-native';
import useKeyboardVisibility from 'src/hooks/useKeyboardVisibility';
import theme from 'theme';
import { RootStackParamList } from 'types';
// import { LogBox } from 'react-native';

// LogBox.ignoreLogs(['Non-serializable values were found in the navigation state']);

type ModalParams = NativeStackScreenProps<RootStackParamList, 'Modal'>;

function Modal({ route, navigation }: ModalParams) {
  const { height } = useWindowDimensions();
  const isVisible = useKeyboardVisibility();

  return (
    <NativeModal transparent visible={true} animationType="slide" onRequestClose={navigation.goBack}>
      <TouchableOpacity activeOpacity={1} onPressOut={navigation.goBack} style={styles.root}>
        {/* eslint-disable-next-line react-native/no-inline-styles */}
        <ScrollView directionalLockEnabled={true} style={{ width: '70%' }}>
          <TouchableWithoutFeedback>
            <View style={{ ...styles.noFeedBack, marginTop: height / (isVisible ? 5 : 3) }}>
              {route.params.content}
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
      </TouchableOpacity>
    </NativeModal>
  );
}

const styles = StyleSheet.create({
  root: { justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%' },
  noFeedBack: {
    alignItems: 'center',
    backgroundColor: theme.colors.background,
    borderRadius: 20,
    padding: 20,
  },
});

export default Modal;
