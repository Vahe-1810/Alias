import { NativeStackScreenProps } from '@react-navigation/native-stack';
import DeleteIcon from 'assets/icons/action_icons/delete_icon';
import Layout from 'components/layout';
import { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Animated,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import { emptyStoragedGameParams, initialTeams, points, times, wordOptions } from 'src/mocks';
import theme from 'theme';
import { GameInProgressParams, RootStackParamList } from 'types';
import cloneDeep from 'lodash.clonedeep';
import { Field } from 'assets/icons/field_icons/field';
import { useDiscard } from 'src/hooks/useDiscard';
import { uid } from 'src/utils/UniqIdGenerator';
import { addTeam } from 'src/utils/addTeam';
import Player from 'components/player';
import { getIsTeamValid } from 'src/utils/getIsTeamValid';
import Select from 'components/select';
import AppText from 'components/text';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { resetGameProgress } from 'src/utils/resetGameProgress';

type GameSetupParams = NativeStackScreenProps<RootStackParamList>;

function GameSetup({ navigation }: GameSetupParams) {
  const [highlight, setHighlight] = useState(false);
  const [currentTime, setCurrentTime] = useState(30);
  const [currentPoints, setCurrentPoints] = useState(50);
  const [wordsCount, setWordsCount] = useState(5);
  const [team, setTeam] = useState(0);
  const playersRef = useRef<ScrollView>(null);
  const teamScale = useRef(new Animated.Value(0)).current;
  const teamNameRef = useRef<TextInput>(null);
  const validationAnimation = useRef(new Animated.Value(1)).current;
  const [isValid, setIsValid] = useState(true);
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);

  const [onUpdate, forceUpdate] = useState({});
  const teams = useRef(cloneDeep(initialTeams));

  const hasNext = teams.current[team + 1];

  const gameParams = {
    point: currentPoints,
    teams: teams.current,
    time: currentTime,
    turn: { team: 0, player: 0 },
    wordsCount,
  };

  useDiscard(navigation, forceUpdate);

  useEffect(() => {
    getChanges();
  }, []);

  useEffect(() => {
    saveChanges();
  }, [onUpdate]);

  useEffect(() => {
    animateTeamCard();
  }, [team]);

  const handleValidation = () => {
    setIsValid(false);

    Animated.timing(validationAnimation, {
      toValue: 0,
      delay: 3500,
      useNativeDriver: true,
    }).start(() => {
      setIsValid(true);
      validationAnimation.setValue(1);
    });
  };

  const animateTeamCard = () => {
    Animated.timing(teamScale, {
      toValue: 0.95,
      duration: 150,
      useNativeDriver: true,
    }).start(() => {
      Animated.timing(teamScale, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }).start();
    });
  };

  const handleChangeTeam = () => {
    if (getIsTeamValid(teams.current[team])) {
      handleValidation();
      return;
    }
    setTeam(teamIdx => {
      if (!hasNext) {
        teams.current.push(addTeam());
      }
      return teamIdx + 1;
    });
  };

  const handleDeleteTeam = () => {
    teams.current.splice(team, 1)[0];
    if (!hasNext) setTeam(team - 1);
    else {
      forceUpdate({});
      animateTeamCard();
    }
  };

  const handleAddPlayer = () => {
    teams.current[team].players.push({ name: '', id: uid('player') });
    playersRef.current?.scrollToEnd();
    forceUpdate({});
  };

  const handleStartGame = () => {
    if (teams.current.some(currentTeam => getIsTeamValid(currentTeam))) {
      handleValidation();
      return;
    }
    resetGameProgress(teams.current);
    saveChanges();
    navigation.navigate('Preparation', gameParams);
  };

  const getChanges = async () => {
    try {
      const storagedGameParamsString = await AsyncStorage.getItem('lastSavedParams');
      const storagedGameParams: Omit<GameInProgressParams, 'turn' | 'preWords'> =
        JSON.parse(storagedGameParamsString!) || emptyStoragedGameParams;
      teams.current = storagedGameParams.teams;

      setCurrentPoints(storagedGameParams.point);
      setWordsCount(storagedGameParams.wordsCount);
      setCurrentTime(storagedGameParams.time);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  async function saveChanges() {
    try {
      await AsyncStorage.setItem(
        'lastSavedParams',
        JSON.stringify({
          point: currentPoints,
          time: currentTime,
          teams: teams.current,
          wordsCount,
        }),
      );
    } catch (error) {
      console.error(error);
    }
  }

  if (loading)
    return (
      <Layout>
        {/* eslint-disable-next-line react-native/no-inline-styles */}
        <ActivityIndicator size={100} style={{ marginTop: 100 }} />
      </Layout>
    );

  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
      <Layout style={styles.root}>
        <AppText style={{ fontSize: theme.fonts.h2, fontWeight: theme.weights.w2, color: theme.colors.secondory }}>
          {t('common.team').toUpperCase()} {team + 1}
        </AppText>
        <Animated.View style={{ ...styles.teams, transform: [{ scale: teamScale }] }}>
          <View style={styles.teamView}>
            <View style={styles.playerRow}>
              <TextInput
                key={`${teams.current[team].name}${team}`}
                ref={teamNameRef}
                placeholder={t('common.team')}
                style={styles.teamName}
                placeholderTextColor="#666"
                defaultValue={teams.current[team].name}
                onChangeText={text => (teams.current[team].name = text)}
              />
              <TouchableHighlight>
                <DeleteIcon onPress={handleDeleteTeam} visible={teams.current.length > 2} />
              </TouchableHighlight>
            </View>
            <ScrollView showsVerticalScrollIndicator={false} style={styles.playersBlock} ref={playersRef}>
              {teams.current[team]?.players.map((player, i, currArr) => (
                <Player
                  key={player.id}
                  player={player}
                  playersList={currArr}
                  teams={teams}
                  team={team}
                  updateParent={forceUpdate}
                />
              ))}
            </ScrollView>
            <AppText
              onPress={handleAddPlayer}
              onPressIn={() => setHighlight(true)}
              onPressOut={() => setHighlight(false)}
              // eslint-disable-next-line react-native/no-inline-styles
              style={{ ...styles.addPlayer, backgroundColor: highlight ? theme.colors.placeholder : 'transparent' }}>
              {t('setup.add')}
            </AppText>
            <View style={styles.teamChangeBlock}>
              {/* eslint-disable react-native/no-inline-styles */}
              <TouchableOpacity
                disabled={team === 0}
                style={{ ...styles.changeActionsCommon, backgroundColor: team === 0 ? 'gray' : '#5392ea' }}
                onPress={() => setTeam(team - 1)}>
                <AppText style={{ fontSize: theme.fonts.h5 }}>{t('setup.back')}</AppText>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ ...styles.changeActionsCommon, backgroundColor: hasNext ? '#4040ef' : theme.colors.success }}
                onPress={handleChangeTeam}>
                <AppText style={styles.addTeam}>{hasNext ? t('setup.nextTeam') : t('setup.newTeam')}</AppText>
              </TouchableOpacity>
              {/* eslint-enable react-native/no-inline-styles */}
            </View>
          </View>
          <Animated.Text style={{ ...styles.validationText, opacity: validationAnimation }}>
            {!isValid && t('setup.validationText')}
          </Animated.Text>
        </Animated.View>
        <Select
          onChange={value => setWordsCount(+value)}
          data={wordOptions}
          label={t('common.words').toUpperCase()}
          initValue={wordsCount + ''}
          optionTypeName={t('common.word').toLowerCase()}
        />
        <View style={styles.selectesBlock}>
          <Select
            hasInput
            onChange={value => setCurrentTime(+value)}
            data={times}
            label={t('common.time').toUpperCase()}
            optionTypeName={t('setup.sec')}
            initValue={currentTime + ''}
          />
          <Select
            hasInput
            onChange={value => setCurrentPoints(+value)}
            data={points}
            label={t('common.point').toUpperCase()}
            initValue={currentPoints + ''}
          />
        </View>
        <Field onPress={handleStartGame}>
          <AppText style={{ fontSize: theme.fonts.h3, color: theme.colors.background }}>{t('common.start')}</AppText>
        </Field>
      </Layout>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  teams: {
    width: '100%',
  },
  teamView: {
    paddingHorizontal: 10,
    paddingBottom: 20,
    borderRadius: 20,
    flex: 1,
    backgroundColor: theme.colors.card,
    opacity: 0.7,
  },
  teamName: { color: 'black', flex: 0.9, fontSize: theme.fonts.h3, fontFamily: 'MadimiOne-Regular' },
  addTeam: {
    fontSize: theme.fonts.h5,
    paddingHorizontal: 5,
  },
  playerRow: {
    height: 65,
    flexDirection: 'row',
    width: '100%',
    borderBottomWidth: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  playersBlock: {
    maxHeight: 200,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  addPlayer: {
    color: theme.colors.background,
    fontSize: theme.fonts.h5,
    height: 40,
    borderRadius: 8,
    textAlign: 'left',
    textAlignVertical: 'center',
  },
  teamChangeBlock: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  changeActionsCommon: {
    minWidth: '30%',
    height: 40,
    marginRight: 20,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  validationText: {
    textAlign: 'center',
    fontFamily: 'serif',
    alignSelf: 'center',
    height: 40,
  },
  selectesBlock: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
  },
  modal: {
    width: 80,
    justifyContent: 'center',
  },
});

export default GameSetup;
