import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert } from 'react-native';
import { RootStackParamList } from 'types';

export function useFinish(navigation: NativeStackNavigationProp<RootStackParamList>, callBack: () => number) {
  const { t } = useTranslation();

  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', e => {
      if (e.data.action.type === 'NAVIGATE') return;
      e.preventDefault();

      Alert.alert(t('progress.finish'), t('progress.info'), [
        { text: t('progress.reject'), style: 'cancel' },
        {
          text: t('progress.resolve'),
          style: 'destructive',
          onPress: () => callBack(),
        },
      ]);
    });

    return unsubscribe;
  }, [navigation]);

  return null;
}
