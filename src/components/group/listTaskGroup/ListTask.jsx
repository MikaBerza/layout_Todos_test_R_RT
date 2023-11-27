import React from 'react';
import { useSelector } from 'react-redux';
import Task from '../../commons/task/Task.jsx';

import {
  arrNameOfFilters,
  searchForTasks,
  filterTasks,
} from '../../../utils/modules.js';
import style from './listTask.module.css';

const ListTask = React.memo(() => {
  const { taskListData } = useSelector((state) => state.taskListDataSlice);
  const { searchValue } = useSelector((state) => state.searchSlice);
  const { filteringValue } = useSelector((state) => state.filteringSlice);

  // если условие выполняется, то дальше по коду не идем, вернет null
  if (taskListData === null) {
    return null;
  }

  return (
    <ul className={style.item}>
      {searchValue.trim().length > 0
        ? searchForTasks(taskListData, searchValue).map(
            (objectWithTaskData) => {
              return (
                <Task key={objectWithTaskData.id} {...objectWithTaskData} />
              );
            }
          )
        : filterTasks(taskListData, filteringValue, arrNameOfFilters).map(
            (objectWithTaskData) => {
              return (
                <Task key={objectWithTaskData.id} {...objectWithTaskData} />
              );
            }
          )}
    </ul>
  );
});

// для отображения имени компонента в дереве компонентов 
// используем метод displayName
ListTask.displayName = 'ListTask';
export default ListTask;
