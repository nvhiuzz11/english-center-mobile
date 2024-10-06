import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const initialState = {
  accountInfo: null,
  accessToken: null,
  refreshToken: null,
};

export const accountState = createSlice({
  name: 'account',
  initialState,
  reducers: {
    setAccountInfo: (state, action: PayloadAction<{accountInfo: Object}>) => {
      state.accountInfo = action.payload.accountInfo;
    },
    setAccessToken: (state, action: PayloadAction<{accessToken: String}>) => {
      state.accessToken = action.payload.accessToken;
    },
    setRefreshToken: (state, action: PayloadAction<{refreshToken: String}>) => {
      state.refreshToken = action.payload.refreshToken;
    },
    setAuthState: (
      state,
      action: PayloadAction<{
        refreshToken: String,
        accessToken: String,
      }>,
    ) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
  },
});

export const {setAccountInfo, setAccessToken, setRefreshToken, setAuthState} =
  accountState.actions;
export default accountState.reducer;
