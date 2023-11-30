import { configureStore } from '@reduxjs/toolkit';
import listTaskGroupSlice from './slices/listTaskGroupSlice';
import textareaSlice from './slices/textareaSlice';
import buttonGroupSlice from './slices/buttonGroupSlice';
import filteringSlice from './slices/filteringSlice';
import searchSlice from './slices/searchSlice';

export const store = configureStore({
  reducer: {
    listTaskGroupSlice: listTaskGroupSlice,
    textareaSlice: textareaSlice,
    buttonGroupSlice: buttonGroupSlice,
    filteringSlice: filteringSlice,
    searchSlice: searchSlice,
  },
});
