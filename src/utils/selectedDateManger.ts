const LOCAL_STORAGE_KEY = 'selectedDate';

export const saveSelectedDate = (date: Date) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(LOCAL_STORAGE_KEY, date.toISOString());
  }
};

export const getSelectedDate = () => {
  if (typeof window !== 'undefined') {
    const date = localStorage.getItem(LOCAL_STORAGE_KEY);
    return date ? new Date(date) : null;
  }
  return null;
};

export const removeSelectedDate = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  }
};
