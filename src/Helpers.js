function padWithLeadingZeros(num, totalLength) {
  return String(num).padStart(totalLength, '0');
}

export function formateTimestamp(timeStamp) {
  const dateObject = new Date(timeStamp);

  return (
    padWithLeadingZeros(
      dateObject.toLocaleString('de-DE', { day: 'numeric' }),
      2
    ) +
    '.' +
    padWithLeadingZeros(
      dateObject.toLocaleString('de-DE', { month: 'numeric' }),
      2
    ) +
    '.' +
    dateObject.toLocaleString('de-DE', { year: '2-digit' }) +
    ', ' +
    dateObject.toLocaleTimeString('de-DE', {
      hour: '2-digit',
      minute: '2-digit',
    }) +
    ' Uhr'
  );
}
