import React from 'react';
import {PermissionsAndroid, Platform} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import {useAuxios} from '@src/app/hook';
import {StatusCodes} from 'http-status-codes';
import {useDispatch} from 'react-redux';
import {setIsSubscribedNotification} from '@store/reducers/setting';

export const NotificationManage = () => {
  const {publicAxios, authAxios} = useAuxios();

  const dispatch = useDispatch();

  const requestUserPermission = async () => {
    if (Platform.OS === 'android' && Platform.Version >= 33) {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );
      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Notification permission denied');
        return;
      }
    }
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    if (enabled) {
      console.log('Authorization status:', authStatus);
      const token = await messaging().getToken();
      console.log('FCM token:', token);
    }
  };

  const getFCMToken = async () => {
    const token = await messaging().getToken();
    return token;
  };

  const subscribeNotification = async () => {
    const token = await messaging().getToken();
    try {
      const res = await authAxios.post('/api/update-user-message-token', {
        messageToken: token,
      });
      if (res.status === StatusCodes.OK) {
        console.log('subscribeNotification: success');
        dispatch(setIsSubscribedNotification({isSubscribedNotification: true}));
      }
    } catch (error) {
      console.log('subscribeNotification ~ error', error);
    }
  };

  const unSubscribeNotification = async () => {
    try {
      const res = await authAxios.post('/api/remove-user-message-token');
      if (res.status === StatusCodes.OK) {
        console.log('unSubscribeNotification: success');
        dispatch(
          setIsSubscribedNotification({isSubscribedNotification: false}),
        );
      }
    } catch (error) {
      console.log('unSubscribeNotification ~ error', error);
    }
  };

  return {
    requestUserPermission,
    getFCMToken,
    subscribeNotification,
    unSubscribeNotification,
  };
};
