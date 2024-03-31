import { uid } from './UniqIdGenerator';

export const addTeam = () => ({
  name: '',
  players: [
    { name: '', id: uid('team') + Math.random() },
    { name: '', id: uid('team') + Math.random() },
  ],
  score: 0,
});
