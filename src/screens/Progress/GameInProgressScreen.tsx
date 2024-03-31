import { NativeStackScreenProps } from '@react-navigation/native-stack';
import PauseIcon from 'assets/icons/action_icons/pause_icon';
import PlayIcon from 'assets/icons/action_icons/play_icon';
import Layout from 'components/layout';
import AppText from 'components/text';
import { useContext, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { fetchRandomWord } from 'src/api/fetchRandomWord';
import { NetContext } from 'src/context/netContext';
import { useDiscard } from 'src/hooks/useDiscard';
import i18n from 'src/locales/i18n';
import { wordBackground } from 'src/mocks';
import getRandomWords from 'src/utils/getRandomWord';
import theme from 'theme';
import { Languages, ResultParams, RootStackParamList } from 'types';

type GameInProgressParams = NativeStackScreenProps<RootStackParamList, 'GameInProgress'>;

function GameInProgress({ navigation, route: { params } }: GameInProgressParams) {
  const [time, setTime] = useState(params.time);
  const point = useRef(0);
  const [words, setWords] = useState(params.preWords);
  const interval = useRef<NodeJS.Timeout | null>(null);
  const [paused, setPaused] = useState(false);
  const [, forceUpdate] = useState({});
  const { t } = useTranslation();
  const { hasNet } = useContext(NetContext);

  const gameResult = useRef<ResultParams[]>([]);
  const stepResult = useRef<ResultParams[]>(words.map(word => ({ result: 'lated', word })));
  const preWords = useRef<string[]>([]);
  console.log(params.preWords);
  const isOneWord = params.wordsCount === 1;

  useDiscard(navigation);

  const handleGuessWord = (word: string) => {
    if (preWords.current[0] === words[0]) return;

    const currentWord = stepResult.current.find(prop => prop.word === word);

    if (currentWord?.result === 'lated') {
      currentWord.result = 'guessed';
      point.current++;
    } else {
      if (currentWord) currentWord.result = 'lated';
      point.current--;
    }

    !isOneWord && forceUpdate({});

    if (stepResult.current.every(({ result }) => result === 'guessed')) {
      gameResult.current.push(...stepResult.current);
      stepResult.current = preWords.current.map(preWord => ({ result: 'lated', word: preWord }));

      setWords(preWords.current);
    }
  };

  const handleSkipWord = () => {
    gameResult.current.push({
      result: 'skipped',
      word: words[0],
    });

    point.current--;

    setWords(preWords.current);

    stepResult.current = preWords.current.map(word => ({ result: 'lated', word }));
  };

  const handleFinishGame = () => {
    setPaused(true);
    Alert.alert(t('progress.finish'), t('progress.info'), [
      { text: t('progress.reject'), style: 'cancel', onPress: () => setPaused(false) },
      {
        text: t('progress.resolve'),
        style: 'destructive',
        onPress: () => {
          endGame();
        },
      },
    ]);
  };

  function endGame() {
    gameResult.current.push(...stepResult.current);

    navigation.navigate('GameProgressState', {
      result: gameResult.current,
      gameState: params,
      score: point.current,
    });

    clearInterval(interval.current!);

    return 0;
  }

  useEffect(() => {
    if (hasNet) {
      fetchRandomWord(i18n.language as Languages, params.wordsCount).then(nextWords => {
        preWords.current = nextWords;
      });
    } else {
      preWords.current = getRandomWords(params.wordsCount);
    }
  }, [words, hasNet]);

  useEffect(() => {
    if (time > 0)
      interval.current = setInterval(() => {
        setTime(turnTime => {
          if (turnTime <= 0) return endGame();
          if (paused) return turnTime;
          return turnTime - 1;
        });
      }, 1000);

    return () => {
      clearInterval(interval.current!);
    };
  }, [paused]);

  /*eslint-disable react-native/no-inline-styles*/
  return (
    <Layout style={{ justifyContent: isOneWord ? 'space-between' : 'space-evenly', alignItems: 'center' }}>
      <AppText style={{ fontSize: theme.fonts.h4, color: time <= 5 ? 'red' : theme.colors.text }}>{time}</AppText>
      <View style={{ ...styles.mainBlock, minHeight: isOneWord ? '30%' : '50%' }}>
        <View style={{ ...styles.wordBlock, height: isOneWord ? '50%' : 'auto' }}>
          {/* eslint-enable react-native/no-inline-styles */}
          {stepResult.current.map(({ word, result }, i) => (
            <TouchableOpacity
              key={i}
              onPress={() => handleGuessWord(word)}
              style={{ ...wordDynamicStyles(isOneWord).wordsBlock, backgroundColor: wordBackground[result] }}>
              <AppText style={wordDynamicStyles(isOneWord).wordStyle}>{word}</AppText>
            </TouchableOpacity>
          ))}
        </View>
        <AppText style={{ fontSize: theme.fonts.h4 }}>Score: {point.current}</AppText>
        <TouchableOpacity style={styles.playPause}>
          {!paused ? <PauseIcon onPress={() => setPaused(true)} /> : <PlayIcon onPress={() => setPaused(false)} />}
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={handleFinishGame}
        style={{ ...styles.actionsCommon, backgroundColor: theme.colors.error }}>
        {/* eslint-disable-next-line react-native/no-inline-styles */}
        <AppText style={{ textAlign: 'center' }}>{t('progress.finish')}</AppText>
      </TouchableOpacity>
      {isOneWord && (
        <View style={styles.oneWordActionsBlock}>
          <TouchableOpacity
            onPress={handleSkipWord}
            style={{ ...styles.actionsCommon, backgroundColor: theme.colors.error }}>
            {/* eslint-disable-next-line react-native/no-inline-styles */}
            <AppText style={{ textAlign: 'center' }}>{t('progress.skip')}</AppText>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ ...styles.actionsCommon, backgroundColor: theme.colors.success }}
            onPress={() => handleGuessWord(words[0])}>
            {/* eslint-disable-next-line react-native/no-inline-styles */}
            <AppText style={{ textAlign: 'center' }}>{t('progress.guess')}</AppText>
          </TouchableOpacity>
        </View>
      )}
    </Layout>
  );
}

function wordDynamicStyles(isOneWord: boolean) {
  return StyleSheet.create({
    wordsBlock: {
      justifyContent: 'center',
      height: isOneWord ? '100%' : 40,
      borderRadius: isOneWord ? 20 : 0,
    },
    wordStyle: {
      fontSize: isOneWord ? theme.fonts.h3 : theme.fonts.h4,
      color: theme.colors.border,
      textAlign: 'center',
    },
  });
}

const styles = StyleSheet.create({
  mainBlock: {
    width: '100%',
    alignItems: 'center',
  },
  wordBlock: {
    width: '90%',
    overflow: 'hidden',
    backgroundColor: theme.colors.text,
    borderRadius: 20,
  },
  playPause: { marginTop: 10, width: 'auto', height: 'auto', padding: 2 },
  actionsCommon: {
    justifyContent: 'center',
    width: '30%',
    height: 40,
    borderRadius: 8,
  },
  oneWordActionsBlock: { flexDirection: 'row', justifyContent: 'space-evenly', width: '100%' },
});

export default GameInProgress;
