import React from 'react';
import { useSelector } from 'react-redux';
import style from './indicator.module.css';

// используем (React.memo) для предотвращения ненужных повторных рендеров
const Indicator = React.memo(() => {
  const { taskListData } = useSelector((state) => state.taskListDataSlice);
  // счетчики
  const [taskCounters, setTaskCounters] = React.useState({
    allTaskCounter: 0,
    activeTaskCounter: 0,
    completedTaskCounter: 0,
  });

  // функция, определить предел и значение
  const determineTheLimitAndValue = React.useCallback(
    (percent) => (taskCounters.allTaskCounter * percent).toFixed(2),
    [taskCounters.allTaskCounter]
  );

  // используем хук (useMemo), чтобы избежать вычислений при каждом рендере
  // Определяет предел, при достижении которого значение считается низким
  const lowValue = React.useMemo(() => {
    determineTheLimitAndValue(0.3);
  }, [determineTheLimitAndValue]);

  // Определяет предел, при достижении которого значение считается высоким
  const highValue = React.useMemo(() => {
    determineTheLimitAndValue(0.6);
  }, [determineTheLimitAndValue]);

  // Определяет наилучшее или оптимальное значение
  const optimumValue = React.useMemo(() => {
    determineTheLimitAndValue(0.9);
  }, [determineTheLimitAndValue]);

  // используем хук (useCallback), для сохранения ссылки на функцию
  // функция, вычислить активные и завершенные задачи
  const calcActiveAndCompletedTasks = React.useCallback(() => {
    let activeCount = 0;
    let completedCount = 0;
    if (taskListData !== null) {
      taskListData.forEach((item) => {
        if (item.tick) {
          completedCount += 1;
        } else {
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
      />
    </div>
  );
});

Indicator.displayName = 'Indicator';
export default Indicator;
