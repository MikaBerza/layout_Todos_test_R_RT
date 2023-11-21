import { createSlice } from '@reduxjs/toolkit';

// первое состояние
const initialState = {
  removeButton: false,
  editButton: false,
};

export const buttonGroupSlice = createSlice({
  name: 'buttonGroup',
  initialState,
  reducers: {
    setRemoveButton(state, action) {
      state.removeButton = action.payload;
    },
    setEditButton(state, action) {
      state.editButton = action.payload;
    },
  },
});

export const { setRemoveButton, setEditButton } = buttonGroupSlice.actions;

export default buttonGroupSlice.reducer;
