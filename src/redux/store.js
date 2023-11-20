import { configureStore } from '@reduxjs/toolkit';
import taskListDataSlice from './slices/taskListDataSlice';
import textareaMessageSlice from './slices/textareaMessageSlice';

export const store = configureStore({
  reducer: {
    taskListDataSlice: taskListDataSlice,
    textareaMessageSlice: textareaMessageSlice,
  },
});
