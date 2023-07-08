export const isoStringToDMY = (isoString: string) => {
  return new Date(isoString).toDateString().slice(4);
};
