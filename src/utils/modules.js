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

// функция, добавить задачу в список задач
export const addTaskToTheList = (arrayTaskListData, textareaText) => {
  // формируем объект с датой
  const recordingDate = new Date(Date.now()).toLocaleDateString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
  });

  if (
    arrayTaskListData === null &&
    checkLengthOfTheString(textareaText) === true
  ) {
    // создаем пустой массив
    const newArrayTaskListData = [];
    // формируем объект с данными
    const objTaskData = {
      id: generateId(),
      note: textareaText.trim(),
      date: recordingDate,
      tick: false,
      editing: false,
      sign: 'x',
    };
    // статус задачи
    const taskStatus = 'first task';
    return [taskStatus, objTaskData, newArrayTaskListData];
  }

  if (
    arrayTaskListData !== null &&
    checkLengthOfTheString(textareaText) === true
  ) {
    // копируем список задач с помощью оператора spread
    const copyTaskListData = [...arrayTaskListData];
    // формируем объект с данными
    const objTaskData = {
      id: generateId(),
      note: textareaText.trim(),
      date: recordingDate,
      tick: false,
      editing: false,
      sign: 'x',
    };
    // статус задачи
    const taskStatus = 'next task';
    return [taskStatus, objTaskData, copyTaskListData];
  }

  return null;
};

// функция, заменить задачу в списке задач при редактировании
export const replaceTaskToTheListWhenEditing = (
  arrayTaskListData,
  textareaText
) => {
  // формируем объект с датой
  const recordingDate = new Date(Date.now()).toLocaleDateString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
  });

  const newArrayTaskListData = arrayTaskListData.map((item) => {
    if (item.editing === true && textareaText.length !== 0) {
      // изменяем значение поля с записью (note), на то которое в (textarea)
      // изменяем состояние поля с ключом (editing), с (true) на (false)
      // изменяем объект с датой, на актуальную дату редактирования задачи
      const newItem = {
        ...item,
        note: textareaText,
        editing: false,
        date: recordingDate,
      };

      return newItem;
    }

    // возвращаем элемент массива без изменений если он не соответствует условию
    return item;
  });
  return newArrayTaskListData;
};
