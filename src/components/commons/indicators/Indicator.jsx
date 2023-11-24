import React from 'react';
import style from './indicator.module.css';

import { useSelector } from 'react-redux';

// используем (React.memo) для предотвращения ненужных повторных рендеров
const Indicator = React.memo(() => {
  const { taskListData } = useSelector((state) => state.taskListDataSlice);
  // счетчики
  const [taskCounters, setTaskCounters] = React.useState({
    allTaskCounter: 0,
    activeTaskCounter: 0,
    completedTaskCounter: 0,
  });

  // проценты
  // использованием хука (useMemo), чтобы избежать вычислений при каждом рендере
  const lowValue = React.useMemo(() => {
    const thirtyPercent = 0.3;
    (taskCounters.allTaskCounter * thirtyPercent).toFixed(2);
  }, [taskCounters.allTaskCounter]);

  const highValue = React.useMemo(() => {
    const sixtyPercent = 0.6;
    (taskCounters.allTaskCounter * sixtyPercent).toFixed(2);
  }, [taskCounters.allTaskCounter]);

  const optimumValue = React.useMemo(() => {
    const ninetyPercent = 0.9;
    (taskCounters.allTaskCounter * ninetyPercent).toFixed(2);
  }, [taskCounters.allTaskCounter]);

  // использованием хука (useCallback), для сохранения ссылки на функцию
  const calcActiveAndCompletedTasks = React.useCallback(() => {
    let activeCount = 0;
    let completedCount = 0;
    if (taskListData !== null) {
      taskListData.forEach((item) => {
        if (item.tick === true) {
          completedCount += 1;
        } else if (item.tick === false) {
          activeCount += 1;
        }
      });
    }

    setTaskCounters({
      allTaskCounter: activeCount + completedCount,
      activeTaskCounter: activeCount,
      completedTaskCounter: completedCount,
    });
  }, [taskListData]);

  React.useEffect(() => {
    // вызываем функцию при изменении массива данных списка задач
    calcActiveAndCompletedTasks();
  }, [taskListData, calcActiveAndCompletedTasks]);

  return (
    <div className={style.wrapper}>
      <div className={style.name}>
        <span>{`всего-${taskCounters.allTaskCounter}`}</span>
        <span>{`активно-${taskCounters.activeTaskCounter}`}</span>
        <span>{`завершено-${taskCounters.completedTaskCounter}`}</span>
      </div>
      <meter
        className={style.stripe}
        value={taskCounters.completedTaskCounter}
        low={lowValue}
        high={highValue}
        max={taskCounters.allTaskCounter}
        optimum={optimumValue}
      ></meter>
    </div>
  );
});

export default Indicator;
