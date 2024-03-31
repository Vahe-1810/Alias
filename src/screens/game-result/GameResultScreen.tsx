import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Field } from 'assets/icons/field_icons/field';
import Layout from 'components/layout';
import AppText from 'components/text';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';
import { useDiscard } from 'src/hooks/useDiscard';
import i18n from 'src/locales/i18n';
import { resetGameProgress } from 'src/utils/resetGameProgress';
import theme from 'theme';
import { Languages, RootStackParamList } from 'types';

type GameResultParams = NativeStackScreenProps<RootStackParamList, 'GameResult'>;

function GameResult({ navigation, route }: GameResultParams) {
  const { t } = useTranslation();
  // prettier-ignore
  const { params: { teams, turn: { team }}} = route;

  const { name, players, score } = teams[team];

  useDiscard(navigation);

  const handlePlayAgain = () => {
    resetGameProgress(teams);
    navigation.navigate('Preparation', route.params);
  };

  return (
    <Layout>
      <View style={styles.root}>
        <AppText style={styles.winnerTeam}>{t('finish.winner')}</AppText>
        <AppText style={styles.nameAndScore}>
          {name} - {score}
        </AppText>
        <View style={styles.playersBlock}>
          {players.map(player => (
            <AppText key={player.id} style={styles.eachPlayer}>
              {player.name}
            </AppText>
          ))}
        </View>
        <View style={styles.resultPageActions}>
          <Field onPress={() => navigation.navigate('Menu')}>
            <AppText style={{ color: theme.colors.border }}>{t('setup.back')}</AppText>
          </Field>
          <Field colors={['#90ade2', '#00485a']} onPress={handlePlayAgain}>
            <AppText>{t('finish.playAgain')}</AppText>
          </Field>
        </View>
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  root: { alignItems: 'center', height: '100%' },
  winnerTeam: {
    fontSize: (i18n.language as Languages) === 'hy' ? theme.fonts.h2 : theme.fonts.h1,
    color: theme.colors.text,
    textAlign: 'center',
  },
  nameAndScore: { fontSize: theme.fonts.h3, color: theme.colors.success, marginTop: 20 },
  playersBlock: { backgroundColor: theme.colors.card, width: '100%', padding: 20, borderRadius: 20 },
  eachPlayer: {
    fontSize: theme.fonts.h4,
    color: theme.colors.border,
    marginVertical: 10,
    borderBottomWidth: 1,
  },
  resultPageActions: { marginTop: 'auto', flexDirection: 'row', gap: 10 },
});

export default GameResult;
