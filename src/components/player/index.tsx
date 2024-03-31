import DeleteIcon from 'assets/icons/action_icons/delete_icon';
import AppTextInput from 'components/input';
import { Dispatch, MutableRefObject, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Animated, StyleSheet, TouchableHighlight, View, useWindowDimensions } from 'react-native';
import theme from 'theme';
import { IPlayer, ITeam } from 'types';

interface PlayerProps {
  player: IPlayer;
  playersList: IPlayer[];
  teams: MutableRefObject<ITeam[]>;
  team: number;
  updateParent: Dispatch<React.SetStateAction<{}>>;
}

function Player({ player, playersList, teams: { current }, team, updateParent }: PlayerProps) {
  const playerRef = useRef<View>(null);
  const translate = useRef(new Animated.Value(0)).current;
  const { width } = useWindowDimensions();
  const { t } = useTranslation();

  const handleDeletePlayer = (id: string) => {
    if (current[team].players.length) {
      current[team].players = current[team].players.filter(currTeamPlayer => currTeamPlayer.id !== id);
    }

    Animated.timing(translate, {
      toValue: -width,
      duration: 300,
      useNativeDriver: true,
    }).start(() => updateParent({}));
  };

  const handleChangeName = (text: string) => {
    player.name = text;
  };

  return (
    <Animated.View ref={playerRef} style={{ ...styles.root, transform: [{ translateX: translate }] }}>
      <AppTextInput
        placeholder={t('common.player')}
        placeholderTextColor={'#666'}
        style={styles.input}
        defaultValue={player.name}
        onChangeText={handleChangeName}
      />
      {/* eslint-disable-next-line react-native/no-inline-styles */}
      <TouchableHighlight style={{ justifyContent: 'space-between' }}>
        <DeleteIcon onPress={() => handleDeletePlayer(player.id)} visible={playersList.length > 2} />
      </TouchableHighlight>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  input: {
    color: 'black',
    fontWeight: theme.weights.w1,
    paddingHorizontal: 10,
    paddingBottom: 10,
    fontSize: theme.fonts.h4,
    width: '60%',
  },
});

export default Player;
