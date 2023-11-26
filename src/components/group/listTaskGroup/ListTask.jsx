import React from 'react';
import { useSelector } from 'react-redux';
import Task from '../../commons/task/Task.jsx';

import {
  arrNameOfFilters,
  searchForTasks,
  filterTasks,
} from '../../../utils/modules.js';
import style from './listTask.module.css';

const ListTask = () => {
  const { taskListData } = useSelector((state) => state.taskListDataSlice);
  const { filteringValue } = useSelector((state) => state.filteringSlice);
  const { searchValue } = useSelector((state) => state.searchSlice);

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
};

export default ListTask;
