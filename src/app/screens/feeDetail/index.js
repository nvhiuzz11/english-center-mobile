import React, {useEffect, useRef, useState} from 'react';
import {Container} from '@components/container';
import {
  useFocusEffect,
  useIsFocused,
  useNavigation,
  useTheme,
} from '@react-navigation/native';
import {
  View,
  StyleSheet,
  FlatList,
  Button,
  Text,
  TouchableOpacity,
  ScrollView,
  Animated,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {MainHeader} from '@components/mainHeader';
import {hp, wp} from '@utils/responsive';
import {Header} from '@components/header';
import {ROUTES_STUDENT_CLASS, SCREEN_NAME} from '@constants/navigation';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import {translate} from '@locales';
import {InputApp} from '@components/input';
import {SearchIcon} from '@assets/icons/searchIcon';
import {ReloadIcon} from '@assets/icons/reloadIcon';
import {IndexPath, Select, SelectItem} from '@ui-kitten/components';
import {ModalHistory} from './components/modalHistory';
import {formatMoney, getCostStatus} from '@utils/input';
import {COST_STATUS} from '@constants/request';
import {useAuxios} from '@src/app/hook';
import {StatusCodes} from 'http-status-codes';

export const FeeDetailScreen = props => {
  const payload = props.route.params.payload;

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {colors} = useTheme();
  const styles = makeStyle(colors);

  const [showHistory, setShowHistory] = useState(false);
  const [color, setColor] = useState(null);
  const [history, setHistory] = useState([]);

  const [costDetail, setCostDetail] = useState(null);

  const isFocused = useIsFocused();
  const {publicAxios, authAxios} = useAuxios();

  useEffect(() => {
    if (isFocused) {
      fetchCost();
    }
  }, [isFocused]);

  const fetchCost = async () => {
    try {
      const response = await authAxios.get('api/costs-by-parent');
      if (response.status === StatusCodes.OK) {
        console.log('fetchCost data2', response.data);
        const data = response.data.docs;

        const a = data.filter(item => item.id === payload.costDetail.id);
        setCostDetail(a[0]);
      }
    } catch (error) {
      console.error('fetchCost error', error);
    }
  };

  useEffect(() => {
    if (payload) {
      setCostDetail(payload.costDetail);
    }
  }, [payload]);

  useEffect(() => {
    if (costDetail) {
      setHistory(costDetail.transactions);
      let bgcolor;
      if (costDetail.status === COST_STATUS.PENDING) {
        bgcolor = '#e84a4a';
      } else if (costDetail.status === COST_STATUS.DONE) {
        bgcolor = '#31bd31';
      } else {
        bgcolor = '#5759ff';
      }
      setColor(bgcolor);
    }
  }, [costDetail]);

  const onPressShowHistory = () => {
    setShowHistory(true);
    console.log('costDetail', costDetail);
  };
  const onPressPay = () => {
    navigation.navigate(SCREEN_NAME.PAY, {
      payload: {
        costDetail: costDetail,
      },
    });
  };

  return (
    <Container>
      <Header title={translate('Fee Detail')} />
      {costDetail && (
        <>
          <View style={styles.container}>
            <View style={styles.billContaienr}>
              <Text style={styles.header}>{translate('Fee Detail')}</Text>

              <Text style={styles.title}>
                {translate('Bill ID')}:{' '}
                <Text style={styles.description}> {costDetail.id}</Text>
              </Text>
              <Text style={styles.title}>
                {translate('Bill Name')}:{' '}
                <Text style={styles.description}> {costDetail.name}</Text>
              </Text>
              <Text style={styles.title}>
                {translate('Student')}:{' '}
                <Text style={styles.description}>
                  {' '}
                  {costDetail.user.student.name}
                </Text>
              </Text>
              <Text style={styles.title}>
                {translate('Class')}:{' '}
                <Text style={styles.description}> {'123'}</Text>
              </Text>
              <Text style={styles.title}>
                {translate('Time')}:{' '}
                <Text style={styles.description}>
                  {' '}
                  {costDetail.forMonth}
                  {'/'}
                  {costDetail.forYear} {'('} {'3'} {translate('sessions')}
                  {')'}
                </Text>
              </Text>
              <Text style={styles.title}>
                {translate('Money')}:
                <Text style={styles.description}>
                  {' '}
                  {formatMoney(costDetail.originTotalMoney)} VND
                </Text>
              </Text>
              <Text style={styles.title}>
                {translate('Discount')}:{' '}
                <Text style={styles.description}>
                  {costDetail.studentClass.reducePercent}
                  {'%'} {`(${formatMoney(costDetail.totalReduceMoney)} VND)`}
                </Text>
              </Text>
              <Text style={styles.title}>
                {translate('Amount to be paid')}:
                <Text style={styles.description}>
                  {' '}
                  {formatMoney(costDetail.totalMoney)} VND
                </Text>
              </Text>
              <Text style={styles.title}>
                {translate('Amount paid')}:{' '}
                <Text style={styles.description}>
                  {' '}
                  {formatMoney(costDetail.paidMoney)} VND
                </Text>
              </Text>
              <Text style={styles.title}>
                {translate('Fees owed')}:{' '}
                <Text style={styles.description}>
                  {' '}
                  {formatMoney(costDetail.debtMoney)} VND
                </Text>
              </Text>
              <Text style={styles.title}>
                {translate('Status')}:{' '}
                <Text
                  style={[
                    styles.description,
                    color && {color: color, fontStyle: 'italic'},
                  ]}>
                  {' '}
                  {getCostStatus(costDetail.status)}
                </Text>
              </Text>
              <TouchableOpacity
                style={styles.historyButton}
                onPress={onPressShowHistory}>
                <Text style={styles.buttonTitle}>
                  {translate('Payment history')}
                </Text>
              </TouchableOpacity>

              {costDetail.status !== COST_STATUS.DONE && (
                <TouchableOpacity
                  style={[
                    styles.historyButton,
                    {backgroundColor: colors.SECONDARY[400]},
                  ]}
                  onPress={onPressPay}>
                  <Text style={styles.buttonTitle}>{translate('Pay')}</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
          <ModalHistory
            isVisible={showHistory}
            onClose={() => {
              setShowHistory(false);
            }}
            costDetail={costDetail}
          />
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
    header: {
      fontSize: 22,
      color: colors.SECONDARY[800],
      fontWeight: '700',
      textAlign: 'center',
      marginTop: 25,
      marginBottom: 25,
    },
    billContaienr: {
      marginHorizontal: wp(5),
      marginTop: hp(2),
      backgroundColor: colors.card,
      borderRadius: 20,
      shadowColor: colors.PRIMARY[900],
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      padding: 20,
      paddingBottom: 24,
      marginBottom: hp(3),
    },
    title: {
      color: colors.text,
      fontSize: 16,
      fontWeight: '600',
      marginVertical: 7,
    },
    description: {
      marginLeft: 16,
      fontWeight: '400',
    },
    historyButton: {
      backgroundColor: colors.NEUTRAL[800],
      paddingVertical: 10,
      alignContent: 'center',
      marginHorizontal: hp(2),
      borderRadius: 15,
      marginTop: 20,
    },
    buttonTitle: {
      color: colors.SECONDARY[800],
      fontSize: 16,
      fontWeight: '600',
      textAlign: 'center',
    },
  });
