import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const initialState = {
  isLogin: false,
  listSaveAccount: [],
};

export const appState = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setIsLogin: (state, action: PayloadAction<{isLogin: boolean}>) => {
      state.isLogin = action.payload.isLogin;
    },
    addSaveAccount: (state, action: PayloadAction<{saveAccount: object}>) => {
      const {saveAccount} = action.payload;
      state.listSaveAccount.push(saveAccount);
    },
    updateSaveAccount: (
      state,
      action: PayloadAction<{id: string, updatedAccount: object}>,
    ) => {
      const {id, updatedAccount} = action.payload;
      const accountIndex = state.listSaveAccount.findIndex(
        (account: any) => account.id === id,
      );
      if (accountIndex !== -1) {
        state.listSaveAccount[accountIndex] = {
          ...state.listSaveAccount[accountIndex],
          ...updatedAccount,
        };
      }
    },
    deleteSaveAccount: (state, action: PayloadAction<{id: string}>) => {
      state.listSaveAccount = state.listSaveAccount.filter(
        (account: any) => account.id !== action.payload.id,
      );
    },
  },
});

export const {
  setIsLogin,
  addSaveAccount,
  updateSaveAccount,
  deleteSaveAccount,
} = appState.actions;
export default appState.reducer;
