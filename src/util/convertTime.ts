import endsWith from 'lodash/endsWith';
import padStart from 'lodash/padStart';
import split from 'lodash/split';

export const convertTime = (time: string) => {
  const isPm = endsWith(time, 'pm');
  const tokens = split(time.substring(0, time.length - 2), ':');
  const hoursRaw = parseInt(tokens[0]);
  const hours = hoursRaw + (isPm && hoursRaw < 12 ? 12 : 0);
  const hoursTxt = padStart(hours.toString(), 2, '0');
  const minutes = parseInt(tokens[1]);
  const minutesTxt = padStart(minutes.toString(), 2, '0');
  return `${hoursTxt}:${minutesTxt}`;
};
