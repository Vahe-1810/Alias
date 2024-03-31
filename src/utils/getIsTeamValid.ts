import { ITeam } from 'types';

export const getIsTeamValid = (team: ITeam) => !team.name || team.players.some(player => !player.name);
