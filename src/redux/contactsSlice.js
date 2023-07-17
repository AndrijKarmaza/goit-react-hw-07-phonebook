import { createSlice } from '@reduxjs/toolkit';
import { fetchContacts, addContact, deleteContact } from './operations';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
  Notify.failure('Something went wrong please try later.');
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    items: [],
    isLoading: false,
    error: null,
  },
  extraReducers: {
    [fetchContacts.pending](state) {
      state.isLoading = true;
    },

    [fetchContacts.fulfilled](state, action) {
      state.isLoading = false;
      state.error = null;
      state.items = action.payload;
    },

    [fetchContacts.rejected](state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    [addContact.pending](state) {
      state.isLoading = true;
    },

    [addContact.fulfilled](state, action) {
      state.isLoading = false;
      state.error = null;
      state.items.push(action.payload);
      Notify.success('Contact successfully added.');
    },

    [addContact.rejected]: handleRejected,

    [deleteContact.pending](state) {
      state.isLoading = true;
    },
    [deleteContact.fulfilled](state, action) {
      state.isLoading = false;
      state.error = null;
      const index = state.items.findIndex(
        contact => contact.id === action.payload.id
      );
      state.items.splice(index, 1);
      Notify.success('Contact deleted successfully.');
    },
    [deleteContact.rejected]: handleRejected,
  },
});

export const contactReducer = contactsSlice.reducer;
