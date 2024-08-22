import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const initialState = {
  language: null,
  themeMode: 'light',
};

// reducer
export const settingState = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<{language: String}>) => {
      state.language = action.payload.language;
    },
    setThemeMode: (state, action: PayloadAction<{themeMode: String}>) => {
      state.themeMode = action.payload.themeMode;
    },
  },
});

export const {setLanguage, setThemeMode} = settingState.actions;
export default settingState.reducer;
