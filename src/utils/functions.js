export const findIdx = (addWeek, setAddWeek) => {
  return addWeek.findIndex((week) => week.id === setAddWeek.id);
};
