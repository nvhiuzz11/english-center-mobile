import {setAccountInfo, setAuthState} from '@store/reducers/account';
import {setIsLogin} from '@store/reducers/app';
import React from 'react';
import isEqual from 'react-fast-compare';
import {useDispatch, useSelector} from 'react-redux';

export const useAuth = () => {
  const authState = useSelector(state => state.account, isEqual);

  const dispatch = useDispatch();

  const getAccessToken = () => authState.accessToken;

  const saveAccountInfo = accountInfo => {
    try {
      dispatch(setAccountInfo({accountInfo: accountInfo}));
    } catch (error) {
      console.log('saveAccountInfo ~ error', error);
    }
  };

  const saveAuthSate = async (accessToken, refreshToken) => {
    try {
      dispatch(setAuthState({accessToken, refreshToken}));
      //   dispatch(setAuthState({accessToken: null, refreshToken: null}));
    } catch (error) {
      console.log('saveAuthSate ~ error', error);
    }
  };

  const setIsLogedIn = async () => {
    dispatch(setIsLogin({isLogin: true}));
  };

  const logout = async () => {
    dispatch(setAccountInfo({accountInfo: null}));
    dispatch(setAuthState({accessToken: null, refreshToken: null}));
    dispatch(setIsLogin({isLogin: false}));
  };

  return {
    getAccessToken,
    saveAccountInfo,
    setIsLogedIn,
    saveAuthSate,
    logout,
  };
};
