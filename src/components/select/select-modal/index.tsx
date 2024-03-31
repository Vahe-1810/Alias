import AppTextInput from 'components/input';
import AppText from 'components/text';
import { Dispatch, SetStateAction, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal, ScrollView, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import theme from 'theme';
import { IMapData } from 'types';

interface SelectModalProps {
  setShow: Dispatch<SetStateAction<boolean>>;
  data: IMapData[];
  handleSelectOption: (option: string) => void;
  hasInput: boolean;
  optionTypeName?: string;
}

function SelectModal({ data, handleSelectOption, hasInput, setShow, optionTypeName }: SelectModalProps) {
  const [value, setValue] = useState('');
  const { t } = useTranslation();

  const handleChangeValue = (text: string) => {
    if (/^\d+$/g.test(text)) {
      setValue(`${Math.abs(+text)}`.replace(/^0/, ''));
      return;
    }

    setValue('0');
  };

  return (
    <Modal transparent>
      <TouchableOpacity activeOpacity={1} onPressOut={() => setShow(false)} style={styles.root}>
        <ScrollView style={styles.selectBlock}>
          {data.map(({ label, key }) => (
            <TouchableWithoutFeedback key={key}>
              <TouchableOpacity onPress={() => handleSelectOption(label)} style={styles.border}>
                <AppText style={styles.optionTypeStyles}>
                  {label}
                  {optionTypeName}
                </AppText>
              </TouchableOpacity>
            </TouchableWithoutFeedback>
          ))}
          {hasInput && (
            <View style={styles.border}>
              <AppTextInput
                keyboardType="numeric"
                maxLength={3}
                value={value}
                onChangeText={handleChangeValue}
                placeholderTextColor={'#333'}
                style={styles.dynamicValue}
                placeholder={t('setup.typeHere')}
              />
            </View>
          )}
        </ScrollView>
        {value && (
          <TouchableOpacity onPress={() => handleSelectOption(value)} style={styles.confirmStyles}>
            <AppText>{t('common.ok')}</AppText>
          </TouchableOpacity>
        )}
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00000050',
  },
  selectBlock: {
    backgroundColor: 'lightgray',
    maxHeight: 300,
    width: 150,
    bottom: 50,
    borderRadius: 8,
  },
  optionTypeStyles: { textAlign: 'center', color: theme.colors.border, fontSize: theme.fonts.h4 },
  border: { height: 40, borderBottomWidth: 0.4 },
  dynamicValue: {
    textAlign: 'center',
    color: theme.colors.border,
    fontSize: theme.fonts.h5,
    padding: 0,
  },
  confirmStyles: {
    backgroundColor: theme.colors.background,
    width: 100,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
});

export default SelectModal;
