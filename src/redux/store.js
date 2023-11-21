import { configureStore } from '@reduxjs/toolkit';
import taskListDataSlice from './slices/taskListDataSlice';
import textareaMessageSlice from './slices/textareaMessageSlice';
import buttonGroupSlice from './slices/buttonGroupSlice';

export const store = configureStore({
  reducer: {
    taskListDataSlice: taskListDataSlice,
    textareaMessageSlice: textareaMessageSlice,
    buttonGroupSlice: buttonGroupSlice,
  },
});
