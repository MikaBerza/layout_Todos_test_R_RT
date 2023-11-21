import { createSlice } from '@reduxjs/toolkit';
import { checkLocalStorageForNull } from '../../utils/modules';

// первое состояние
const initialState = {
  taskListData: checkLocalStorageForNull(),
};

export const taskListDataSlice = createSlice({
  name: 'taskListData',
  initialState,
  reducers: {
    setTaskListData(state, action) {
      state.taskListData = action.payload;
    },
  },
});

export const { setTaskListData } = taskListDataSlice.actions;

export default taskListDataSlice.reducer;
