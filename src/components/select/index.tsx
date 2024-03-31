import AppText from 'components/text';
import { Key, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import theme from 'theme';
import SelectModal from './select-modal';

type SelectProps = {
  label: string;
  optionTypeName?: string;
  initValue?: string;
  data: { key: Key; label: string }[];
  onChange: (value: string) => void;
  hasInput?: boolean;
};

function Select({ label, initValue, data, onChange, optionTypeName, hasInput = false }: SelectProps) {
  const [option, setOption] = useState(initValue || 'Select me!');
  const [show, setShow] = useState<boolean>(false);

  const handleSelectOption = (selectedOption: string) => {
    onChange(selectedOption);
    setOption(selectedOption);
    setShow(false);
  };

  return (
    <View key={initValue}>
      <AppText aria-label="Label for time" nativeID="roundTime" style={styles.selectLabel}>
        {label}
      </AppText>
      <TouchableOpacity onPress={() => setShow(true)} style={styles.option}>
        <AppText style={styles.optionText}>
          {option}
          {optionTypeName}
        </AppText>
      </TouchableOpacity>
      {show && (
        <SelectModal
          data={data}
          handleSelectOption={handleSelectOption}
          hasInput={hasInput}
          optionTypeName={optionTypeName}
          setShow={setShow}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  selectLabel: { color: theme.colors.text, textAlign: 'center' },
  option: {
    borderWidth: 0.5,
    height: 50,
    width: 100,
    borderRadius: 8,
    justifyContent: 'center',
  },
  optionText: { textAlign: 'center', fontSize: theme.fonts.h4 },
});

export default Select;
