import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import {
  setTaskListData,
  setShowTasks,
} from '../../../redux/slices/taskListDataSlice.js';
import { setTextareaMessage } from '../../../redux/slices/textareaMessageSlice.js';
import { setEditButton } from '../../../redux/slices/buttonGroupSlice.js';

import {
  generateId,
  checkLengthOfTheString,
  writeToLocalStorage,
} from '../../../utils/modules.js';
import Button from '../../commons/buttons/Button.jsx';
import style from './buttonGroup.module.css';

const ButtonGroup = () => {
  /* 
     используем хук useSelector из библиотеки Redux 
     для получения значений (taskListData) из состояния,
     с помощью селектора taskListDataSlice 
  */
  const { taskListData } = useSelector((state) => state.taskListDataSlice);
  const { textareaMessage } = useSelector(
    (state) => state.textareaMessageSlice
  );
  const { editButton } = useSelector((state) => state.buttonGroupSlice);
  /*
     useDispatch - это хук библиотеки Redux, используем его
     для получения функции dispatch из Redux store. 
     Функция dispatch принимает действие(action) в качестве аргумента
     и передает его в редюсеры для обновления состояния приложения.
     Вызов функции dispatch позволяет инициировать изменения состояния Redux.
     */
  const dispatch = useDispatch();

  // функция, добавить задачу в список задач
  const addTaskToTheList = () => {
    // формируем объект с датой
    const recordingDate = new Date(Date.now()).toLocaleDateString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      day: '2-digit',
      month: '2-digit',
      year: '2-digit',
    });

    if (
      taskListData === null &&
      checkLengthOfTheString(textareaMessage) === true
    ) {
      // создаем пустой массив
      const newTaskListData = [];
      // формируем объект с данными
      const objTaskData = {
        id: generateId(),
        note: textareaMessage.trim(),
        date: recordingDate,
        tick: false,
        editing: false,
        sign: 'x',
      };
      // обновляем данные списка задач
      dispatch(setTaskListData([objTaskData]));
      // записываем данные в localStorage
      writeToLocalStorage(newTaskListData, objTaskData);
      // обновляем(очищаем) поле textarea
      dispatch(setTextareaMessage(''));
    }

    if (
      taskListData !== null &&
      checkLengthOfTheString(textareaMessage) === true
    ) {
      // копируем список задач с помощью оператора spread
      const copyTaskListData = [...taskListData];
      // формируем объект с данными
      const objTaskData = {
        id: generateId(),
        note: textareaMessage.trim(),
        date: recordingDate,
        tick: false,
        editing: false,
        sign: 'x',
      };
      // обновляем данные списка задач (чтобы новый объект был вначале)
      dispatch(setTaskListData([objTaskData, ...copyTaskListData]));
      // записываем данные в localStorage
      writeToLocalStorage(copyTaskListData, objTaskData);
      // обновляем(очищаем) поле textarea
      dispatch(setTextareaMessage(''));
    }
  };

  // функция, заменить задачу в списке задач при редактировании
  const replaceTaskToTheListWhenEditing = () => {
    const newTaskListData = taskListData.map((item) => {
      if (item.editing === true && textareaMessage.length !== 0) {
        // обновляем(очищаем) поле textarea
        dispatch(setTextareaMessage(''));
        // скрываем кнопку (редактировать) изменим ее состояние на (false), показываем остальные кнопки
        dispatch(setEditButton(false));
        // показываем все задачи, обновляя состояние
        dispatch(setShowTasks(true));

        // изменяем значение поля с записью (note), на то которое в textarea
        // изменяем состояние поля с ключом (editing), с (true) на (false)
        const newItem = { ...item, note: textareaMessage, editing: false };
        return newItem;
      }
      // возвращаем элемент массива без изменений если он не соответствует условию
      return item;
    });
    // обновляем данные списка задач
    dispatch(setTaskListData(newTaskListData));
    // записываем данные в localStorage
    writeToLocalStorage(newTaskListData);
  };

  // функция, установить или снять все флажки
  const checkOrClearAllCheckboxes = () => {
    if (taskListData !== null) {
      // копируем список задач с помощью оператора spread
      const copyTaskListData = [...taskListData];
      const newTaskListData = [];
      let counterTrue = 0;

      copyTaskListData.forEach((item) => {
        if (item.tick === true) {
          counterTrue += 1;
        }
      });

      if (counterTrue === copyTaskListData.length) {
        copyTaskListData.forEach((item) => {
          const newItem = { ...item, tick: false };
          newTaskListData.push(newItem);
        });
      }
      if (counterTrue !== copyTaskListData.length) {
        copyTaskListData.forEach((item) => {
          const newItem = { ...item, tick: true };
          newTaskListData.push(newItem);
        });
      }
      // обновляем данные списка задач
      dispatch(setTaskListData(newTaskListData));
      // записываем данные в localStorage
      writeToLocalStorage(newTaskListData);
    }
  };

  // функция, проверить наличие установленных флажков
  const checkForCheckboxes = () => {
    if (taskListData !== null) {
      const result = taskListData.find((item) => {
        return item.tick === true;
      });

      return result !== undefined ? true : false;
    }
  };

  // функция, удалить задачи с флажками
  const removeTasksWithCheckboxes = () => {
    if (taskListData !== null) {
      // копируем список задач с помощью оператора spread
      const copyTaskListData = [...taskListData];
      // удаляем задачу из списка
      const newTaskListData = copyTaskListData.filter(
        (item) => item.tick !== true
      );
      // обновляем данные списка задач
      dispatch(setTaskListData(newTaskListData));
      // записываем данные в localStorage
      writeToLocalStorage(newTaskListData);
    }
  };

  return (
    <div className={style.buttons}>
      {editButton === false ? (
        <>
          <Button
            name={'Выбрать всё'}
            handleButtonClick={checkOrClearAllCheckboxes}
          />
          {checkForCheckboxes() === false ? (
            ''
          ) : (
            <Button
              name={'Удалить'}
              handleButtonClick={removeTasksWithCheckboxes}
            />
          )}
          <Button name={'Добавить'} handleButtonClick={addTaskToTheList} />
        </>
      ) : (
        <Button
          name={'Редактировать'}
          handleButtonClick={replaceTaskToTheListWhenEditing}
        />
      )}
    </div>
  );
};

export default ButtonGroup;
