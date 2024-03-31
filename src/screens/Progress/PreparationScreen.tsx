import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Field } from 'assets/icons/field_icons/field';
import AppTextInput from 'components/input';
import Layout from 'components/layout';
import SelectModal from 'components/select/select-modal';
import AppText from 'components/text';
import { Dispatch, SetStateAction, useContext, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { fetchRandomWord } from 'src/api/fetchRandomWord';
import getRandomWords from 'src/utils/getRandomWord';
import { NetContext } from 'src/context/netContext';
import { useDiscard } from 'src/hooks/useDiscard';
import { points, times, wordOptions } from 'src/mocks';
import theme from 'theme';
import { IMapData, ITeam, Languages, RootStackParamList } from 'types';

type PreparationParams = NativeStackScreenProps<RootStackParamList, 'Preparation'>;

interface ISelectProps {
  data: IMapData[];
  handleSelectOption: (opt: string) => void;
  hasInput: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
}

function Preparation({ route: { params }, navigation }: PreparationParams) {
  const { t, i18n } = useTranslation();
  const { player, team } = params.turn;
  const currentPlayerName = params.teams[team].players[player].name;
  const [preparedWords, setPreparedWords] = useState<string[]>([]);
  const [show, setShow] = useState<boolean>(false);
  const [props, setProps] = useState<null | ISelectProps>(null);
  const [, forceUpdate] = useState({});
  const { hasNet } = useContext(NetContext);

  useDiscard(navigation);

  const mutalbeParams = useRef({ ...params }).current;

  const updateNames = () => {
    forceUpdate({});
  };

  const handleOpenModal = (currentTeam: ITeam) => {
    navigation.removeListener('focus', updateNames);

    navigation.navigate('Modal', {
      content: <ModalContent team={currentTeam} />,
    });

    navigation.addListener('focus', updateNames);
  };

  const handleStart = () => {
    if (!preparedWords.length) return;
    navigation.navigate('GameInProgress', { ...{ ...mutalbeParams, turn: params.turn }, preWords: preparedWords });
  };

  const handleChangePoint = () => {
    setShow(true);
    setProps({
      data: points,
      handleSelectOption: opt => {
        mutalbeParams.point = +opt;
        setShow(false);
      },
      hasInput: true,
      setShow,
    });
  };

  const handleChangeWordCount = () => {
    setShow(true);
    setProps({
      data: wordOptions,
      handleSelectOption: opt => {
        mutalbeParams.wordsCount = +opt;
        setShow(false);
      },
      hasInput: false,
      setShow,
    });
  };

  const handleChangeTime = () => {
    setShow(true);
    setProps({
      data: times,
      handleSelectOption: opt => {
        mutalbeParams.time = +opt;
        setShow(false);
      },
      hasInput: true,
      setShow,
    });
  };

  useEffect(() => {
    if (hasNet) {
      fetchRandomWord(i18n.language as Languages, mutalbeParams.wordsCount)
        .then(result => {
          console.log(result);
          setPreparedWords(result);
        })
        .catch(e => {
          console.warn(e);
        });
    } else {
      setPreparedWords(getRandomWords(params.wordsCount));
    }
  }, [mutalbeParams.wordsCount, hasNet, team]);

  return (
    <Layout>
      {/* eslint-disable-next-line react-native/no-inline-styles */}
      <View style={{ height: '100%' }}>
        <View style={styles.root}>
          <TouchableOpacity onPress={handleChangePoint}>
            <AppText style={styles.commonText}>{t('common.point')}</AppText>
            <AppText style={styles.commonText}>{mutalbeParams.point}</AppText>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleChangeWordCount}>
            <AppText style={styles.commonText}>{t('common.words')}</AppText>
            <AppText style={styles.commonText}>{mutalbeParams.wordsCount}</AppText>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleChangeTime}>
            <AppText style={styles.commonText}>{t('common.time')}</AppText>
            <AppText style={styles.commonText}>{mutalbeParams.time}</AppText>
          </TouchableOpacity>
        </View>
        {/* eslint-disable-next-line react-native/no-inline-styles */}
        <ScrollView showsVerticalScrollIndicator={false} style={{ marginTop: 20 }}>
          {mutalbeParams.teams.map((mutTeam, i) => (
            <TouchableOpacity onPress={() => handleOpenModal(mutTeam)} key={i} style={styles.teamBlock}>
              <AppText style={styles.teamName}>{mutTeam.name}</AppText>
              <AppText style={{ color: theme.colors.secondory, fontSize: theme.fonts.h4 }}>{mutTeam.score}</AppText>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <AppText style={styles.turnPlayer}>{currentPlayerName}</AppText>
        <Field onPress={handleStart}>
          <AppText style={styles.startBtn}>{t('common.start')}</AppText>
        </Field>
      </View>
      {show && props && <SelectModal {...props} />}
    </Layout>
  );
}
/*eslint-disable react-native/no-inline-styles*/
const ModalContent = ({ team }: { team: ITeam }) => (
  <View style={{ width: '100%', height: '100%' }}>
    <AppTextInput
      style={{ fontSize: theme.fonts.h2, textAlign: 'center' }}
      onChangeText={text => (team.name = text)}
      defaultValue={team.name}
    />
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }} style={{ maxHeight: 200 }}>
      {team.players.map(player => (
        <TouchableOpacity key={player.id}>
          <AppTextInput
            onChangeText={text => (player.name = text)}
            style={{
              fontSize: theme.fonts.h3,
              borderBottomWidth: 1,
              textAlign: 'center',
            }}
            defaultValue={player.name}
          />
        </TouchableOpacity>
      ))}
    </ScrollView>
  </View>
);

const styles = StyleSheet.create({
  root: { flexDirection: 'row', justifyContent: 'space-between' },
  commonText: { fontSize: theme.fonts.h4, color: theme.colors.text, textAlign: 'center' },
  teamBlock: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderLeftWidth: 0.6,
    paddingHorizontal: 10,
    marginVertical: 5,
    alignItems: 'center',
  },
  teamName: { color: theme.colors.secondory, fontSize: theme.fonts.h4, marginBottom: 10 },
  turnPlayer: { textAlign: 'center', fontSize: theme.fonts.h4, marginBottom: 20 },
  startBtn: { textAlign: 'center', fontSize: theme.fonts.h4, color: theme.colors.background },
});

export default Preparation;
