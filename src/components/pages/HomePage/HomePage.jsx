import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setTextareaMessage } from '../../../redux/slices/textareaMessageSlice.js';

import {
  generateId,
  checkLengthOfTheString,
  checkLocalStorageForNull,
  writeToLocalStorage,
  returnAnObjectWithDataFromLocalStorage,
} from '../../../utils/modules.js';

import Search from '../../commons/searches/Search';
import Indicator from '../../commons/indicators/Indicator';
import Filtering from '../../commons/filtering/Filtering';
import Textarea from '../../commons/textareas/Textarea';
import Button from '../../commons/buttons/Button';
import Task from '../../commons/task/Task';

import style from './homePage.module.css';

function HomePage() {
  const [taskListData, setTaskListData] = React.useState(null);
  const dispatch = useDispatch();
  /* используем хук useSelector из библиотеки Redux 
     для получения значений (textareaMessage) из состояния,
     с помощью селектора textareaMessageSlice */
  const { textareaMessage } = useSelector(
    (state) => state.textareaMessageSlice
  );
  // const { id, note, date, tick, editing, sign } = useSelector(
  //   (state) => state.taskListDataSlice
  // );

  React.useEffect(() => {
    if (checkLocalStorageForNull() === true) {
      // возвращаем объект с данными из localStorage
      const returnRaskListData = returnAnObjectWithDataFromLocalStorage();
      setTaskListData(returnRaskListData);
      console.log(returnRaskListData, 'sasas');
    } else if (checkLocalStorageForNull() === null) {
      console.log('777');
    }
  }, []);

  // //функция, обработать изменение текстовой области
  // const handleTextareaMessageChange = (event) => {
  //   // setTextareaMessage(event.target.value);
  //   dispatch(setTextareaMessage(event.target.value));
  // };

  // функция, обработать изменение флажка
  const handleCheckboxChange = (id) => {
    const newTaskListData = taskListData.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          tick: !item.tick,
        };
      }
      return item;
    });
    setTaskListData(newTaskListData);
  };

  // функция, удалить задачу
  const removeTask = (id) => {
    // копируем список задач с помощью оператора spread
    const copyTaskListData = [...taskListData];
    // удаляем задачу из списка
    const newTaskListData = copyTaskListData.filter((item) => item.id !== id);
    // обновляем данные списка задач
    setTaskListData(newTaskListData);
  };

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
      checkLocalStorageForNull() === null &&
      checkLengthOfTheString(textareaMessage) === true
    ) {
      // создаем пустой массив
      const taskListData = [];
      // формируем объект с данными
      const objTaskData = {
        id: generateId(),
        note: textareaMessage,
        date: recordingDate,
        tick: false,
        editing: false,
        sign: 'x',
      };
      // обновляем состояние
      setTaskListData(taskListData);
      // записываем данные в localStorage
      writeToLocalStorage(taskListData, objTaskData);
      // очищаем поле textarea
      dispatch(setTextareaMessage(''));
    } else if (
      checkLocalStorageForNull() !== null &&
      checkLengthOfTheString(textareaMessage) === true
    ) {
      // возвращаем объект с данными из localStorage
      const taskListData = returnAnObjectWithDataFromLocalStorage();
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
      // обновляем состояние
      setTaskListData([...copyTaskListData, objTaskData]);
      // записываем данные в localStorage
      writeToLocalStorage(copyTaskListData, objTaskData);
      // очищаем поле textarea
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
                      handleCheckboxChange={handleCheckboxChange}
                      removeTask={removeTask}
                    />
                  );
                })}
          </ul>
        </section>
      </main>
    </>
  );
}

export default HomePage;
