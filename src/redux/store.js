import { configureStore } from '@reduxjs/toolkit';
import taskListDataSlice from './slices/taskListDataSlice';
import textareaMessageSlice from './slices/textareaMessageSlice';
import buttonGroupSlice from './slices/buttonGroupSlice';
import filteringSlice from './slices/filteringSlice';
import searchSlice from './slices/searchSlice';

export const store = configureStore({
  reducer: {
    taskListDataSlice: taskListDataSlice,
    textareaMessageSlice: textareaMessageSlice,
    buttonGroupSlice: buttonGroupSlice,
    filteringSlice: filteringSlice,
    searchSlice: searchSlice,
  },
});
