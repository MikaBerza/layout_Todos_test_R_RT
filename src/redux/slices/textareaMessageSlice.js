import { createSlice } from '@reduxjs/toolkit';

// первое состояние
const initialState = {
  textareaMessage: '',
};

export const textareaMessageSlice = createSlice({
  name: 'textareaMessage',
  initialState,
  reducers: {
    setTextareaMessage(state, action) {
      state.textareaMessage = action.payload;
    },
  },
});

export const { setTextareaMessage } = textareaMessageSlice.actions;

export default textareaMessageSlice.reducer;
