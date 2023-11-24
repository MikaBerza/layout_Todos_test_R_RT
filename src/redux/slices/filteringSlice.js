import { createSlice } from '@reduxjs/toolkit';

// первое состояние
const initialState = {
  filteringValue: 'все',
};

export const filteringSlice = createSlice({
  name: 'filtering',
  initialState,
  reducers: {
    setFiltering(state, action) {
      state.filteringValue = action.payload;
    },
  },
});

export const { setFiltering } = filteringSlice.actions;

export default filteringSlice.reducer;
