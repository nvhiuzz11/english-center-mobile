import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const initialState = {
  accountInfo: null,
};

export const accountState = createSlice({
  name: 'account',
  initialState,
  reducers: {
    setAccountInfo: (state, action: PayloadAction<{accountInfo: Object}>) => {
      state.accountInfo = action.payload.accountInfo;
    },
  },
});

export const {setAccountInfo} = accountState.actions;
export default accountState.reducer;
