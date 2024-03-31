import { ITeam } from 'types';

export function resetGameProgress(teams: ITeam[]) {
  teams.forEach(team => {
    team.score = 0;
  });
}
