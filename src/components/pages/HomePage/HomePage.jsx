import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setTaskListData } from '../../../redux/slices/taskListDataSlice.js';
import { setTextareaMessage } from '../../../redux/slices/textareaMessageSlice.js';

import {
  generateId,
  checkLengthOfTheString,
  writeToLocalStorage,
} from '../../../utils/modules.js';

import Search from '../../commons/searches/Search';
import Indicator from '../../commons/indicators/Indicator';
import Filtering from '../../commons/filtering/Filtering';
import Textarea from '../../commons/textareas/Textarea';
import Button from '../../commons/buttons/Button';
import Task from '../../commons/task/Task';

import style from './homePage.module.css';

const HomePage = () => {
  /* 
     используем хук useSelector из библиотеки Redux 
     для получения значений (taskListData) из состояния,
     с помощью селектора taskListDataSlice 
  */
  const { taskListData } = useSelector((state) => state.taskListDataSlice);
  const { textareaMessage } = useSelector(
    (state) => state.textareaMessageSlice
  );
  /*
  useDispatch - это хук библиотеки Redux, используем его
  для получения функции dispatch из Redux store. 
  Функция dispatch принимает действие(action) в качестве аргумента
  и передает его в редюсеры для обновления состояния приложения.
  Вызов функции dispatch позволяет инициировать изменения состояния Redux.
  */
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (taskListData === null) {
      console.log('localStorage-ПУСТ!!!', taskListData);
    } else if (taskListData !== null) {
      console.log('localStorage-НЕ ПУСТ!!!', taskListData);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        note: textareaMessage,
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
        note: textareaMessage,
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

  return (
    <>
      <main className={style.content}>
        <section className={style.control}>
          <Search placeholders={'🔍 поиск задач'} />
          <Indicator nameOfStatuses={['всего', 'активно', 'завершено']} />
          <Filtering
            title={'фильтрация'}
            nameOfFilters={['все', 'активные', 'завершенные']}
          />
        </section>

        <section className={style.enteringTask}>
          <Textarea placeholders={'Что нужно сделать?'} />
          <div className={style.buttons}>
            <Button name={'Выбрать всё'} />
            <Button name={'Удалить'} />
            <Button name={'Добавить'} addTaskToTheList={addTaskToTheList} />
          </div>
        </section>

        <section className={style.outputTask}>
          <ul className={style.listTask}>
            {taskListData === null
              ? ''
              : taskListData.map((item) => {
                  return (
                    <Task
                      key={item.id}
                      id={item.id}
                      note={item.note}
                      calendarDate={item.date}
                      sign={item.sign}
                      checking={item.tick}
                    />
                  );
                })}
          </ul>
        </section>
      </main>
    </>
  );
};

export default HomePage;
