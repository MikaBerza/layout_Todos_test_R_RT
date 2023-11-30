import { createSlice } from '@reduxjs/toolkit';
import { checkLocalStorageForNull } from '../../utils/modules';

// первое состояние
const initialState = {
  taskListData: checkLocalStorageForNull(),
  showTasks: true,
};

export const listTaskGroupSlice = createSlice({
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

export const { setTaskListData, setShowTasks } = listTaskGroupSlice.actions;

export default listTaskGroupSlice.reducer;
