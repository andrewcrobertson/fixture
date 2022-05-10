import { convertTime } from './convertTime';

export const flatten = (data: any) => {
  const records = [];
  for (let i = 0; i < data.length; i++) {
    const { id, name, fixture } = data[i];
    for (let j = 0; j < fixture.length; j++) {
      const { round, games } = fixture[j];
      for (let k = 0; k < games.length; k++) {
        const { homeTeam, awayTeam, venue, time } = games[k];
        records.push({ id, name, round, venue, time: convertTime(time), homeTeam, awayTeam });
      }
    }
  }

  return records;
};
