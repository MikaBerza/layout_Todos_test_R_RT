// функция для генерации id
export const generateId = () =>
  Math.round(Math.random() * 100000000000000).toString(16);

// функция, проверяет длину строки
export const checkLengthOfTheString = (str) => {
  if (str.trim().length > 0) {
    return true;
  }
  return false;
};

// функция, возвращает объект с данными из localStorage
export const returnAnObjectWithDataFromLocalStorage = () => {
  const dataFromLocalStorage = window.localStorage.getItem('keyTaskDataset');
  return JSON.parse(dataFromLocalStorage);
};

// функция, проверяет данные из localStorage на null (отсутствие значения)
export const checkLocalStorageForNull = () => {
  const dataFromLocalStorage = window.localStorage.getItem('keyTaskDataset');

  if (dataFromLocalStorage === null) {
    return null;
  }

  return returnAnObjectWithDataFromLocalStorage();
};

// функция, записывает данные в localStorage
export const writeToLocalStorage = (dataset, objEnteredData = null) => {
  if (objEnteredData === null) {
    window.localStorage.setItem('keyTaskDataset', JSON.stringify(dataset));
  }

  if (objEnteredData !== null) {
    dataset.unshift(objEnteredData);
    window.localStorage.setItem('keyTaskDataset', JSON.stringify(dataset));
  }
};
