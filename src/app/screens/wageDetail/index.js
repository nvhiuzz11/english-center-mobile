import React, {useEffect, useRef, useState} from 'react';
import {Container} from '@components/container';
import {useNavigation, useTheme} from '@react-navigation/native';
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
import {COST_STATUS} from '@constants/request';
import {formatDateFromISO, formatMoney, getWageStatus} from '@utils/input';

export const WageDetailScreen = props => {
  const {costDetail} = props.route.params.payload;
  const {teachedInfo} = costDetail;

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {colors} = useTheme();
  const styles = makeStyle(colors);

  const [showHistory, setShowHistory] = useState(false);
  const [color, setColor] = useState(null);

  const onPressShowHistory = () => {
    setShowHistory(true);
  };

  useEffect(() => {
    if (costDetail) {
      let bgcolor;
      if (costDetail.status === COST_STATUS.PENDING) {
        bgcolor = '#e84a4a';
      } else if (costDetail.status === COST_STATUS.DONE) {
        bgcolor = '#31bd31';
      }
      setColor(bgcolor);
    }
  }, [costDetail]);

  return (
    <Container>
      <Header title={translate('Fee Detail')} />
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
            {translate('Time')}:{' '}
            <Text style={styles.description}>
              {' '}
              {costDetail.forMonth}
              {'/'}
              {costDetail.forYear}
            </Text>
          </Text>

          <View style={{flexDirection: 'row'}}>
            <Text style={styles.title}>{translate('Class')}: </Text>
            <View style={{marginLeft: 5}}>
              {teachedInfo &&
                teachedInfo.map(info => (
                  <Text style={styles.description}>
                    {`${info.class.code}: ${info.teachedCount} ${translate(
                      'sessions',
                    )} (${formatMoney(info.salary)} VND/ ${translate(
                      'sessions',
                    )})`}
                  </Text>
                ))}

              {/* <Text style={styles.description}>
                {'E02-L02-2022: 2 buổi (100,000/buổi)'}
              </Text> */}
            </View>
          </View>
          {costDetail.status === COST_STATUS.DONE && (
            <Text style={styles.title}>
              {translate('Payment time')}:{' '}
              <Text style={styles.description}>
                {' '}
                {formatDateFromISO(costDetail.paidAt)}
              </Text>
            </Text>
          )}

          <Text style={styles.title}>
            {translate('Money')}:{' '}
            <Text style={styles.description}>
              {' '}
              {formatMoney(costDetail.totalMoney)} VND
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
              {getWageStatus(costDetail.status)}
            </Text>
          </Text>
          {/* <TouchableOpacity
            style={styles.historyButton}
            onPress={onPressShowHistory}>
            <Text style={styles.buttonTitle}>
              {translate('Payment history')}
            </Text>
          </TouchableOpacity> */}
        </View>
      </View>
    </Container>
  );
};

const makeStyle = colors =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: wp(5),
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
      paddingHorizontal: wp(5),
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
      fontWeight: '400',
      color: colors.text,
      fontSize: 16,
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
