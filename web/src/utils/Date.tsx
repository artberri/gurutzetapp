export const weekDay = (locale: string) => (date: Date) =>
  new Intl.DateTimeFormat(locale, { weekday: "long" }).format(date);

export const monthDay = (locale: string) => (date: Date) =>
  new Intl.DateTimeFormat(locale, { day: "numeric", month: "long" }).format(
    date
  );
