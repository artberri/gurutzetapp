export const weekDay = (locale: string) => (date: Date) =>
  new Intl.DateTimeFormat(locale, { weekday: "long" }).format(date);

export const monthDay = (locale: string) => (date: Date) =>
  new Intl.DateTimeFormat(locale, { day: "numeric", month: "long" }).format(
    date,
  );

export const getYYYYMMDD = (date: Date) => date.toISOString().slice(0, 10);
export const getHHmm = (date: Date) => date.toTimeString().slice(0, 5);
