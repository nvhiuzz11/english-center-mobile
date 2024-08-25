import {Platform} from 'react-native';

export const isAndroid = Platform.OS === 'android' ? true : false;
export const isIos = Platform.OS === 'ios' ? true : false;
