import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Field } from 'assets/icons/field_icons/field';
import Layout from 'components/layout';
import AppText from 'components/text';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useDiscard } from 'src/hooks/useDiscard';
import theme from 'theme';
import { RootStackParamList } from 'types';

type GameProgressStateParams = NativeStackScreenProps<RootStackParamList, 'GameProgressState'>;

const wordStyle = {
  guessed: { color: 'green', point: '+1' },
  lated: { color: 'gray', point: '0' },
  skipped: { color: 'red', point: '-1' },
};

function GameProgressState({ navigation, route: { params } }: GameProgressStateParams) {
  const { t } = useTranslation();
  useDiscard(navigation);
  //prettier-ignore
  const { turn: {player, team}, teams, point } = params.gameState;
  const score = params.score;

  const nextTeam = teams[team + 1] || teams[0];
  const isSpinTeam = !teams[team + 1];
  const nextTeamTurn = isSpinTeam ? 0 : team + 1;
  const nextPlayerIndex = isSpinTeam ? player + 1 : player;
  const nextPlayerTurn = nextTeam.players[nextPlayerIndex] ? nextPlayerIndex : 0;

  const newState: typeof params.gameState = {
    ...params.gameState,
    turn: { team: nextTeamTurn, player: nextPlayerTurn },
  };

  newState.teams[team].score += score;

  const handleContinueGame = () => {
    if (newState.teams[team].score >= point) navigation.navigate('GameResult', params.gameState);
    else navigation.navigate('Preparation', newState);
  };

  const currentPlayer = teams[team].players[player];

  return (
    <Layout>
      <AppText style={{ ...styles.playerName, color: score > 0 ? theme.colors.success : theme.colors.error }}>
        {currentPlayer.name} {score}
      </AppText>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.wordsBlock}>
        {params.result
          .sort((a, b) => +wordStyle[b.result].point - +wordStyle[a.result].point)
          .map(({ result, word }, i) => (
            <TouchableOpacity key={i} style={styles.eachWordRow}>
              <AppText style={{ ...styles.eachWord, color: wordStyle[result].color }}>{word}</AppText>
              <AppText style={{ ...styles.eachWord, color: wordStyle[result].color }}>
                {wordStyle[result].point}
              </AppText>
            </TouchableOpacity>
          ))}
      </ScrollView>
      <Field onPress={handleContinueGame}>
        <AppText>{t('progress.continue')}</AppText>
      </Field>
    </Layout>
  );
}

const styles = StyleSheet.create({
  playerName: {
    textAlign: 'center',
    fontSize: theme.fonts.h4,
  },
  wordsBlock: {
    backgroundColor: theme.colors.card,
    borderRadius: 20,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  eachWordRow: {
    backgroundColor: 'inherit',
    width: '100%',
    borderBottomWidth: 1,
    height: 40,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  eachWord: {
    fontSize: theme.fonts.h4,
  },
});

export default GameProgressState;
