import { createSlice } from '@reduxjs/toolkit';

// первое состояние
const initialState = {
  textareaMessage: '',
};

export const textareaSlice = createSlice({
  name: 'textareaMessage',
  initialState,
  reducers: {
    setTextareaMessage(state, action) {
      state.textareaMessage = action.payload;
    },
  },
});

export const { setTextareaMessage } = textareaSlice.actions;

export default textareaSlice.reducer;
