import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const initialState = {
  language: null,
  themeMode: 'light',
  isSubscribedNotification: false,
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
    setIsSubscribedNotification: (
      state,
      action: PayloadAction<{isSubscribedNotification: Boolean}>,
    ) => {
      state.isSubscribedNotification = action.payload.isSubscribedNotification;
    },
  },
});

export const {setLanguage, setThemeMode, setIsSubscribedNotification} =
  settingState.actions;
export default settingState.reducer;
