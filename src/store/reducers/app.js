import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isLogin: false,
};

export const appState = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setIsLogin: (state, action: PayloadAction<{isLogin: Boolean}>) => {
      state.isLogin = action.payload.isLogin;
    },
  },
});

export const {setIsLogin} = appState.actions;
export default appState.reducer;
