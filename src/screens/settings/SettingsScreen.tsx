import { NativeStackScreenProps } from '@react-navigation/native-stack';
import EnIcon from 'assets/icons/flag_icons/English';
import HyIcon from 'assets/icons/flag_icons/Armenian';
import RuIcon from 'assets/icons/flag_icons/Russian';
import Layout from 'components/layout';
import { useTranslation } from 'react-i18next';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { RootStackParamList } from 'types';
import AppText from 'components/text';
import theme from 'theme';

type SettingsProps = NativeStackScreenProps<RootStackParamList>;

function Settings({ navigation }: SettingsProps) {
  const { t, i18n } = useTranslation();

  return (
    <Layout style={styles.root}>
      <TouchableOpacity onPress={navigation.goBack}>
        <AppText style={styles.backText}>{t('setup.back')}</AppText>
      </TouchableOpacity>
      <View style={styles.languageRow}>
        <AppText style={styles.language}>{t('common.ln')}</AppText>
        <HyIcon onPress={() => i18n.changeLanguage('hy')} />
        <EnIcon onPress={() => i18n.changeLanguage('en')} />
        <RuIcon onPress={() => i18n.changeLanguage('ru')} />
      </View>
      <Image style={styles.logo} source={require('../../assets/images/_logo.png')} />
    </Layout>
  );
}

const styles = StyleSheet.create({
  root: {},
  languageRow: {
    flexDirection: 'row',
    columnGap: 5,
    marginTop: 30,
  },
  language: { marginRight: 'auto', fontSize: theme.fonts.h3 },
  backText: { color: theme.colors.text, fontSize: theme.fonts.h4 },
  logo: { width: '100%', height: '100%', marginLeft: 10, opacity: 0.2 },
});

export default Settings;
