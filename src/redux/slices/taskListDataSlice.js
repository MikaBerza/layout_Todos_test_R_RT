import { createSlice } from '@reduxjs/toolkit';

// первое состояние
const initialState = {
  id: '',
  note: '',
  date: '',
  tick: '',
  editing: '',
  sign: '',
};

export const taskListDataSlice = createSlice({
  name: 'taskListData',
  initialState,
  reducers: {
    setId(state, action) {
      state.id = action.payload;
    },
    setNote(state, action) {
      state.note = action.payload;
    },
    setDate(state, action) {
      state.date = action.payload;
    },
    setTick(state, action) {
      state.tick = action.payload;
    },
    setEditing(state, action) {
      state.editing = action.payload;
    },
    setSign(state, action) {
      state.sign = action.payload;
    },
  },
});

export const { setId, setNote, setDate, setTick, setEditing, setSign } =
  taskListDataSlice.actions;

export default taskListDataSlice.reducer;
