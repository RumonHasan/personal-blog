import { createSlice } from '@reduxjs/toolkit';

//primary project slice
export const slices = createSlice({
  name: 'projectSlices',
  initialState: {
    searchPost: '',
  },
  reducers: {
    setSearchValue: (state, action) => {
      state.searchPost = action.payload;
    },
  },
});

// actions go here
export const { setSearchValue } = slices.actions;

export default slices.reducer;
