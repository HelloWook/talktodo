const LOCAL_STORAGE_KEY = 'selectedDate';

export const saveSelectedDate = (date: Date) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, date.toISOString());
};

export const getSelectedDate = () => {
  const date = localStorage.getItem(LOCAL_STORAGE_KEY);
  return date ? new Date(date) : null;
};

export const removeSelectedDate = () => {
  localStorage.removeItem(LOCAL_STORAGE_KEY);
};
