import { Key, ReactElement } from 'react';

export interface IPlayer {
  name: string;
  id: string;
}
export interface ITeam {
  name: string;
  players: IPlayer[];
  score: number;
}

export interface GameInProgressParams {
  time: number;
  point: number;
  wordsCount: number;
  teams: ITeam[];
  turn: {
    team: number;
    player: number;
  };
  preWords?: string[];
}

export interface SavingParams {
  time: number;
  point: number;
  wordsCount: number;
  teams: ITeam[];
}

export interface IMapData {
  key: Key;
  label: string;
}

interface GameProgressStateParams {
  result: ResultParams[];
  gameState: GameInProgressParams;
  score: number;
}

export interface ResultParams {
  word: string;
  result: 'skipped' | 'guessed' | 'lated';
}

export type RootStackParamList = {
  Splash: undefined;
  Menu: undefined;
  Settings: undefined;
  GameSetup: undefined;
  Preparation: GameInProgressParams;
  GameInProgress: Required<GameInProgressParams>;
  GameProgressState: GameProgressStateParams;
  GameResult: GameInProgressParams;
  Modal: {
    content: ReactElement;
  };
};

export interface InputTypes {
  fontSize?: number;
  color?: string;
  fontWeight?: number | string | 'bold';
  p?: number;
}

export type Languages = 'en' | 'ru' | 'hy';
