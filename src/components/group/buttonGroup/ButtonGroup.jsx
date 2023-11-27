import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import {
  setTaskListData,
  setShowTasks,
} from '../../../redux/slices/taskListDataSlice.js';
import { setTextareaMessage } from '../../../redux/slices/textareaMessageSlice.js';
import { setEditButton } from '../../../redux/slices/buttonGroupSlice.js';

import {
  writeToLocalStorage,
  addTaskToTheList,
  replaceTaskToTheListWhenEditing,
} from '../../../utils/modules.js';

import Button from '../../commons/buttons/Button.jsx';
import style from './buttonGroup.module.css';

const ButtonGroup = React.memo(() => {
  const { taskListData } = useSelector((state) => state.taskListDataSlice);
  const { textareaMessage } = useSelector(
    (state) => state.textareaMessageSlice
  );
  const { editButton } = useSelector((state) => state.buttonGroupSlice);
  const dispatch = useDispatch();

  // функция, обработать добавление задачи с помощью кнопки 'Добавить'
  const handleAddTaskByAddButton = React.useCallback(() => {
    // запишем в константу результат выполнения функции
    const executionResults = addTaskToTheList(taskListData, textareaMessage);

    if (executionResults !== null) {
      // запишем в константу статус выполнения функции
      const executionStatus = executionResults[0];

      // если задача записывается _ПЕРВЫЙ_ раз
      if (executionStatus === 'first task') {
        // запишем в константу возвращенный объект с данными задачи
        const objectWithTaskData = executionResults[1];
        // запишем в константу возвращенный массив данных списка задач
        const arrayOfTaskListData = executionResults[2];

        // обновляем данные списка задач
        dispatch(setTaskListData([objectWithTaskData]));
        // записываем данные в localStorage
        writeToLocalStorage(arrayOfTaskListData, objectWithTaskData);
        // обновляем(очищаем) поле textarea
        dispatch(setTextareaMessage(''));
      }

      // если задача записывается _ОЧЕРЕДНОЙ_ раз
      if (executionStatus === 'next task') {
        // запишем в константу возвращенный объект с данными задачи
        const objectWithTaskData = executionResults[1];
        // запишем в константу возвращенный массив данных списка задач
        const arrayOfTaskListData = executionResults[2];

        // обновляем данные списка задач (чтобы новый объект был вначале)
        dispatch(setTaskListData([objectWithTaskData, ...arrayOfTaskListData]));
        // записываем данные в localStorage
        writeToLocalStorage(arrayOfTaskListData, objectWithTaskData);
        // обновляем(очищаем) поле textarea
        dispatch(setTextareaMessage(''));
      }
    }
  }, [dispatch, taskListData, textareaMessage]);

  // функция, обработать замену задачи с помощью кнопки 'Редактировать'
  const handleAddTaskByReplaceButton = React.useCallback(() => {
    // запишем в константу возвращенный массив данных списка задач
    const arrayOfTaskListData = replaceTaskToTheListWhenEditing(
      taskListData,
      textareaMessage
    );

    // обновляем данные списка задач
    dispatch(setTaskListData(arrayOfTaskListData));
    // записываем данные в localStorage
    writeToLocalStorage(arrayOfTaskListData);
    // обновляем(очищаем) поле textarea
    dispatch(setTextareaMessage(''));
    // скрываем кнопку (редактировать)
    dispatch(setEditButton(false));
    // показываем все задачи
    dispatch(setShowTasks(true));
  }, [dispatch, taskListData, textareaMessage]);

  // функция, установить или снять все флажки
  const checkOrClearAllCheckboxes = React.useCallback(() => {
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
  }, [dispatch, taskListData]);

  // функция, проверить наличие установленных флажков
  const checkForCheckboxes = React.useCallback(() => {
    if (taskListData !== null) {
      const result = taskListData.find((item) => {
        return item.tick === true;
      });
      return result !== undefined ? true : false;
    }
    return false;
  }, [taskListData]);

  // функция, удалить задачи с флажками
  const removeTasksWithCheckboxes = React.useCallback(() => {
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
  }, [dispatch, taskListData]);

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
          <Button
            name={'Добавить'}
            handleButtonClick={handleAddTaskByAddButton}
          />
        </>
      ) : (
        <Button
          name={'Редактировать'}
          handleButtonClick={handleAddTaskByReplaceButton}
        />
      )}
    </div>
  );
});

// для отображения имени компонента в дереве компонентов
// используем метод displayName
ButtonGroup.displayName = 'ButtonGroup';
export default ButtonGroup;
