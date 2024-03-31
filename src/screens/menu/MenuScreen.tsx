import { NativeStackScreenProps } from '@react-navigation/native-stack';
import MenuField from 'assets/icons/field_icons/menu_field';
import { BackHandler, StyleSheet } from 'react-native';
import theme from 'theme';
import { RootStackParamList } from 'src/types';
import Layout from 'components/layout';
import { useTranslation } from 'react-i18next';
import AppText from 'components/text';
import AsyncStorage from '@react-native-async-storage/async-storage';

type MenuProps = NativeStackScreenProps<RootStackParamList>;

function Menu({ navigation }: MenuProps) {
  const { t } = useTranslation();

  return (
    <Layout style={styles.root}>
      <AppText style={styles.header} onPress={() => AsyncStorage.clear()}>
        ALIAS
      </AppText>
      <MenuField onPress={() => navigation.navigate('GameSetup')}>{t('menu.play')}</MenuField>
      <MenuField onPress={() => navigation.navigate('Settings')}>{t('menu.settings')}</MenuField>
      <MenuField onPress={BackHandler.exitApp}>{t('menu.quit')}</MenuField>
    </Layout>
  );
}

const styles = StyleSheet.create({
  root: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  header: {
    color: theme.colors.text,
    fontSize: 110,
    flex: 0.6,
    fontFamily: 'MadimiOne-Regular',
  },
});

export default Menu;
