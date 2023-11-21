import { createSlice } from '@reduxjs/toolkit';
import { checkLocalStorageForNull } from '../../utils/modules';

// первое состояние
const initialState = {
  taskListData: checkLocalStorageForNull(),
  showTasks: true,
};

export const taskListDataSlice = createSlice({
  name: 'taskListData',
  initialState,
  reducers: {
    setTaskListData(state, action) {
      state.taskListData = action.payload;
    },
    setShowTasks(state, action) {
      state.showTasks = action.payload;
    },
  },
});

export const { setTaskListData, setShowTasks } = taskListDataSlice.actions;

export default taskListDataSlice.reducer;
