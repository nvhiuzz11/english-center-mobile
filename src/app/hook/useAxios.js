import {useRef} from 'react';
import axios from 'axios';
import {API_URL} from '@env';
import {API_TIME_OUT} from '@constants/uri';
import {useAuth} from './useAuth';
import {Alert} from 'react-native';
import createAuthRefreshInterceptor from 'axios-auth-refresh';

export const useAuxios = () => {
  const {getAccessToken, authState, saveAuthSate} = useAuth();

  const publicAxios = useRef(
    axios.create({
      baseURL: API_URL,
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: API_TIME_OUT,
    }),
  ).current;

  const authAxios = useRef(
    axios.create({
      baseURL: API_URL,
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: API_TIME_OUT,
    }),
  ).current;

  authAxios.interceptors.request.use(
    config => {
      if (!config.headers.Authorization) {
        config.headers.Authorization = `Bearer ${getAccessToken()}`;
      }
      return config;
    },
    error => {
      return Promise.reject(error);
    },
  );

  const refreshAuthLogic = failedRequest => {
    const data = {
      refreshToken: authState.refreshToken,
    };
    const options = {
      method: 'POST',
      data,
      url: API_URL + 'auth/refresh',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    return axios(options)
      .then(async tokenRefreshResponse => {
        failedRequest.response.config.headers.Authorization =
          'Bearer ' + tokenRefreshResponse.data.accessToken;
        saveAuthSate({
          accessToken: tokenRefreshResponse.data.accessToken,
          refreshToken: tokenRefreshResponse.data.refreshToken,
        });
        return Promise.resolve();
      })
      .catch(error => {
        console.log('refreshAuthLogic ~ error:', error);
      });
  };

  createAuthRefreshInterceptor(authAxios, refreshAuthLogic, {});

  return {
    publicAxios,
    authAxios,
  };
};
