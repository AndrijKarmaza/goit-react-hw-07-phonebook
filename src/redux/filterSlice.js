import { createSlice } from '@reduxjs/toolkit';

const filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    filteredConcacts(state, action) {
      return action.payload;
    },
  },
});

export const { filteredConcacts } = filterSlice.actions;
export const filterReducer = filterSlice.reducer;
