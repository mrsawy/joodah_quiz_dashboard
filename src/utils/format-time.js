import { format, getTime, formatDistanceToNow } from 'date-fns';

// ----------------------------------------------------------------------

export function fDate(date, newFormat) {
  const fm = newFormat || 'dd MMM yyyy';

  return date ? format(new Date(date), fm) : '';
}

export function fDateTime(date, newFormat) {
  const fm = newFormat || 'dd MMM yyyy p';

  return date ? format(new Date(date), fm) : '';
}

export function fTimestamp(date) {
  return date ? getTime(new Date(date)) : '';
}

export function fToNow(date) {
  return date
    ? formatDistanceToNow(new Date(date), {
        addSuffix: true,
      })
    : '';
}

export function formatTimeCreatedAt(timestampString) {
  const timestamp = new Date(timestampString);

  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZone: 'Asia/Riyadh', // Time zone for Saudi Arabia
  };

  return timestamp.toLocaleString('en-US', options);
}

// export function timeTakenFormat(s) {
//   let seconds = +s/1000;
//   if (typeof seconds !== "number" || seconds < 0) {
//     return "Invalid input";
//   }

//   const hours = Math.floor(seconds / 3600);
//   const minutes = Math.floor((seconds % 3600) / 60);
//   const remainingSeconds = seconds % 60;

//   const formattedTime = `${hours}h ${minutes}m ${remainingSeconds}s`;
//   return formattedTime;
// }

export function timeTakenFormat(s, full) {
  var seconds = +s;
  let fullTime = +full;

  if (
    (typeof seconds !== 'number' || seconds < 0) &&
    typeof fullTime !== 'number'
  ) {
    return 'Invalid input';
  }
  if (
    (typeof seconds !== 'number' || seconds < 0 || isNaN(seconds)) &&
    typeof fullTime == 'number'
  ) {
    seconds = fullTime;
    console.log(seconds, fullTime);
  }

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  const formattedTime = `${hours}h ${minutes}m ${remainingSeconds}s`;
  return formattedTime;
}
