import React, {useEffect, useRef, useState} from 'react';
import {Container} from '@components/container';
import {useIsFocused, useNavigation, useTheme} from '@react-navigation/native';
import {View, StyleSheet, FlatList, Text, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {MainHeader} from '@components/mainHeader';
import {hp, wp} from '@utils/responsive';
import {InputApp} from '@components/input';
import {SearchIcon} from '@assets/icons/searchIcon';
import {ReloadIcon} from '@assets/icons/reloadIcon';
import {IndexPath, Select, SelectItem} from '@ui-kitten/components';
import {useAuxios} from '@src/app/hook';
import {Loading} from '@components/loading';
import {StatusCodes} from 'http-status-codes';
import {formatMoney, getCostStatus, removeVietnameseTones} from '@utils/input';
import {translate} from '@locales';
import {COST_STATUS} from '@constants/request';
import {SCREEN_NAME} from '@constants/navigation';
import {
  KeyboardAwareFlatList,
  KeyboardAwareScrollView,
} from 'react-native-keyboard-aware-scroll-view';
import {Header} from '@components/header';
import WebView from 'react-native-webview';
import {SuccessPayment} from '@assets/svg/successPayment';
import {FailPayment} from '@assets/svg/failPayment';
import Toast from 'react-native-toast-message';

export const PayScreen = props => {
  const {costDetail} = props.route.params.payload;

  const {debtMoney} = costDetail;

  const encodedDebtMoney = encodeURIComponent(debtMoney);

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {colors} = useTheme();
  const styles = makeStyle(colors);
  const {authAxios} = useAuxios();
  const isFocused = useIsFocused();

  const {accountInfo} = useSelector(state => state.account);

  const [isLoading, setIsLoading] = useState(false);

  const [isWebVisible, setIsWebVisible] = useState(true);
  const [dataRespond, setDatRespond] = useState(null);

  const webviewRef = useRef(null);

  const dataToSend = {
    username: costDetail.user.student.name,
    costName: costDetail.name,
    debtMoney: costDetail.debtMoney,
    classCode: costDetail.class.code,
    time: `${costDetail.forMonth}/${costDetail.forYear}`,
  };

  const sendData = () => {
    const jsCode = `window.postMessage(${JSON.stringify(dataToSend)}, "*");`;
    webviewRef.current.injectJavaScript(jsCode);
  };

  const formatAmount = numberString => {
    const trimmedAmount = numberString.slice(0, -2);
    return Number(trimmedAmount);
  };

  const handleMessage = async event => {
    setIsLoading(true);

    const data = JSON.parse(event.nativeEvent.data);

    setDatRespond(data);

    console.log('Received data:', data);
    setIsWebVisible(false);

    if (data?.responseCode === '00') {
      try {
        const res = await authAxios.post('api/payment-success', {
          costId: costDetail.id,
          createdByUserId: accountInfo.id,
          totalMoney: formatAmount(data.amount),
        });

        if (res.status === StatusCodes.OK) {
          setTimeout(() => {
            setIsLoading(false);
            Toast.show({
              type: 'success',
              props: {
                title: translate('Payment successful'),
              },
            });
          }, 1500);
        }
      } catch (error) {
        setTimeout(() => {
          setIsLoading(false);
          Toast.show({
            type: 'error',
            props: {
              title: translate('Payment failed'),
            },
          });
        }, 1500);
        console.log('onCreat ~ error', error);
      }
    } else {
      setIsLoading(false);
      Toast.show({
        type: 'error',
        props: {
          title: translate('Payment failed'),
        },
      });
    }
  };

  const onPressBack = () => {
    navigation.navigate(SCREEN_NAME.FEE_DETAIL, {
      payload: {costDetail: costDetail},
    });
  };

  return (
    <Container>
      <Header title={translate('Pay')} />
      {isLoading && <Loading />}

      {isWebVisible ? (
        <WebView
          style={{flex: 1}}
          ref={webviewRef}
          source={{
            uri: 'https://englishcenter.giaysinhvien.shop/vnpay_php/vnpay_pay.php',
          }}
          onLoadEnd={sendData}
          onMessage={handleMessage}
        />
      ) : (
        <>
          {!isLoading && (
            <View style={styles.container}>
              {dataRespond?.responseCode === '00' ? (
                <View style={styles.inforContainer}>
                  <SuccessPayment />
                  <Text
                    style={[
                      styles.header,
                      {color: colors.SEMANTIC.SUCCESS[700]},
                    ]}>
                    {translate('Payment successful')}
                  </Text>
                  <Text style={styles.description}>
                    {translate('Successfully paid for tuition bill')}
                    {': '}
                    {costDetail.name}
                  </Text>
                  <Text style={styles.description}>
                    {translate('Money')}:{' '}
                    {formatMoney(formatAmount(dataRespond?.amount || '0'))} VND
                  </Text>

                  <TouchableOpacity style={styles.button} onPress={onPressBack}>
                    <Text style={styles.buttonTitle}>{translate('Done')}</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={styles.inforContainer}>
                  <FailPayment />
                  <Text
                    style={[
                      styles.header,
                      {color: colors.SEMANTIC.ERROR[700]},
                    ]}>
                    {translate('Payment failed')}
                  </Text>
                  <Text style={styles.description}>
                    {translate(
                      'An error occurred during payment; Please try again later',
                    )}
                    !
                  </Text>

                  <TouchableOpacity style={styles.button} onPress={onPressBack}>
                    <Text style={styles.buttonTitle}>{translate('Back')}</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          )}
        </>
      )}
    </Container>
  );
};

const makeStyle = colors =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: wp(2),
    },
    inforContainer: {
      alignItems: 'center',
      marginTop: hp(10),
      paddingHorizontal: 20,
    },
    header: {
      fontSize: 22,
      fontWeight: '700',
      textAlign: 'center',
      marginTop: 25,
      marginBottom: 35,
    },
    searchInput: {
      marginHorizontal: 5,
      borderRadius: 15,
      //   marginTop: 10,
      borderColor: colors.PRIMARY[500],
      backgroundColor: colors.PRIMARY[100],
      width: wp(80),
    },
    searchText: {
      color: colors.text,
    },
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 10,
    },
    reloadContainer: {
      backgroundColor: colors.SECONDARY[500],
      justifyContent: 'center',
      padding: 10,
      borderRadius: 10,
      alignSelf: 'center',
    },
    selectContainer: {
      flexDirection: 'row',
      marginTop: 10,
      marginBottom: 10,
    },
    select: {
      flex: 1,
      marginHorizontal: 5,
    },
    selectTitle: {
      color: colors.text,
      marginLeft: 5,
      fontSize: 14,
      fontWeight: '500',
      marginBottom: 5,
    },
    feeContainer: {},
    itemContainer: {
      paddingHorizontal: 15,
      paddingVertical: 10,
      marginVertical: 10,
      backgroundColor: '#80cbc4',
      borderRadius: 15,
      marginHorizontal: 10,
    },
    row: {
      flexDirection: 'row',
      marginVertical: 2,
    },
    title: {
      color: colors.text,
      fontSize: 16,
    },
    description: {
      color: colors.text,
      fontSize: 16,
      fontWeight: '500',
      textAlign: 'center',
    },
    button: {
      backgroundColor: colors.NEUTRAL[800],
      paddingVertical: 12,
      paddingHorizontal: 50,
      alignContent: 'center',
      marginHorizontal: hp(2),
      borderRadius: 15,
      marginTop: 70,
    },
    buttonTitle: {
      color: colors.text,
      fontSize: 16,
      fontWeight: '600',
    },
  });
