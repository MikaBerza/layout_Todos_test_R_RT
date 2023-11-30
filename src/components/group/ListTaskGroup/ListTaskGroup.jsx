import React from 'react';
import { useSelector } from 'react-redux';
import { Task } from '../../commons/Task';

import {
  arrNameOfFilters,
  searchForTasks,
  filterTasks,
} from '../../../utils/modules.js';
import style from './listTaskGroup.module.css';

const ListTaskGroup = React.memo(() => {
  const { taskListData } = useSelector((state) => state.listTaskGroupSlice);
  const { searchValue } = useSelector((state) => state.searchSlice);
  const { filteringValue } = useSelector((state) => state.filteringSlice);

  // если условие выполняется, то дальше по коду не идем, вернет null
  if (taskListData === null) {
    return null;
  }

  // функция, сгенерировать (JSX) элемент (Task)
  const generateTaskElement = (objectWithTaskData) => {
    return <Task key={objectWithTaskData.id} {...objectWithTaskData} />;
  };

  return (
    <ul className={style.item}>
      {(searchValue.trim().length
        ? searchForTasks(taskListData, searchValue)
        : filterTasks(taskListData, filteringValue, arrNameOfFilters)
        /*
        элемент (objectWithTaskData) попадает в функцию (generateTaskElement) как параметр,
        потому что при вызове map(generateTaskElement), каждый элемент массива,
        по которому проходит итерация, будет передан в качестве аргумента
        в функцию (generateTaskElement).
        Это встроенное поведение map, которое автоматически передает
        текущий элемент как аргумент в коллбэк функцию, которую мы передаем в map.
        */
      ).map(generateTaskElement)}
    </ul>
  );
});

ListTaskGroup.displayName = 'ListTaskGroup';
export default ListTaskGroup;
