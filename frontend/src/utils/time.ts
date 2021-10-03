const pad = (n: number) => n.toString().padStart(2, '0');

export function formatDate(input: Date | string) {
  const date = new Date(input);
  const dateStr = [date.getDate(), date.getMonth() + 1, date.getFullYear()]
    .map((text) => pad(text))
    .join('.');

  // const timeStr = [date.getHours(), date.getMinutes()]
  //   .map((text) => pad(text))
  //   .join(":");

  return dateStr;
}
