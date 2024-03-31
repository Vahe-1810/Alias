import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert } from 'react-native';
import { RootStackParamList } from 'types';

export function useDiscard(navigation: NativeStackNavigationProp<RootStackParamList>, cb?: any) {
  const { t } = useTranslation();
  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', e => {
      cb && cb({});
      if (e.data.action.type === 'NAVIGATE') return;
      e.preventDefault();

      Alert.alert(t('alert.header'), t('alert.info'), [
        { text: t('alert.reject'), style: 'cancel' },
        {
          text: t('alert.resolve'),
          style: 'destructive',
          onPress: () => {
            navigation.navigate('Menu');
          },
        },
      ]);
    });

    return unsubscribe;
  }, [navigation]);

  return null;
}
