import { createSlice } from '@reduxjs/toolkit';

// первое состояние
const initialState = {
  searchValue: '',
};

export const searchSlice = createSlice({
  name: 'filtering',
  initialState,
  reducers: {
    setSearchValue(state, action) {
      state.searchValue = action.payload;
    },
  },
});

export const { setSearchValue } = searchSlice.actions;

export default searchSlice.reducer;
