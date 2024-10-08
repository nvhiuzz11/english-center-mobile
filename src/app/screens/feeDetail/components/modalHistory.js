import React, {useEffect, useState} from 'react';

import {useTheme} from '@react-navigation/native';
import {Avatar, Layout, Modal} from '@ui-kitten/components';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {hp, wp} from '@utils/responsive';
import {translate} from '@locales';
import {CloseIcon} from '@assets/icons/closeIcon';
import {formatDateFromISO, formatMoney} from '@utils/input';

export const ModalHistory = props => {
  const {isVisible, onClose, costDetail} = props;
  const history = costDetail?.transactions || [];
  const [totalAmount, setTotalAmount] = useState(0);
  const [debtAmount, setDebtAmount] = useState(0);

  const {colors} = useTheme();
  const styles = makeStyle(colors);

  useEffect(() => {
    if (history && history.length > 0) {
      let total = 0;

      history.forEach(item => {
        total += item.totalMoney;
      });

      let debt = costDetail.totalMoney - total;
      setTotalAmount(total);
      setDebtAmount(debt);
    }
  }, [history]);

  const renderItem = ({item}) => (
    <View style={styles.row}>
      {/* <Text style={styles.cell}>{item.id}</Text> */}
      <Text style={styles.cell}>{item.id}</Text>
      <Text style={styles.cell}>{formatDateFromISO(item.timerTime)}</Text>
      <Text style={styles.cell}>{formatMoney(item.totalMoney)}</Text>
    </View>
  );

  return (
    <Modal
      visible={isVisible}
      backdropStyle={styles.backdrop}
      animationType="fade">
      <Layout style={styles.container}>
        <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
          <CloseIcon />
        </TouchableOpacity>
        <Text style={styles.header}>{translate('Payment history')}</Text>
        <View>
          {history.length > 0 ? (
            <>
              <View style={styles.headerTable}>
                <Text style={styles.headerCell}>
                  {translate('Transaction ID')}
                </Text>
                <Text style={styles.headerCell}>{translate('Time')}</Text>
                <Text style={styles.headerCell}>{translate('Money')}</Text>
              </View>
              <FlatList
                data={history}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
              />
              <View style={styles.headerTable}>
                <Text style={styles.headerCell}></Text>
                <Text style={styles.headerCell}>
                  {translate('Total money')}
                </Text>
                <Text style={styles.headerCell}>
                  {formatMoney(totalAmount)}
                </Text>
              </View>
              <View style={styles.headerTable}>
                {/* <Text style={styles.headerCell}>STT</Text> */}
                <Text style={styles.headerCell}></Text>
                <Text style={styles.headerCell}>
                  {translate('Still owe money')}
                </Text>
                <Text style={styles.headerCell}>{formatMoney(debtAmount)}</Text>
              </View>
            </>
          ) : (
            <Text
              style={[
                styles.title,
                {fontStyle: 'italic', marginLeft: 10, fontWeight: '400'},
              ]}>
              {translate('The invoice does not have payment data yet')}...
            </Text>
          )}
        </View>
      </Layout>
    </Modal>
  );
};

const makeStyle = colors =>
  StyleSheet.create({
    backdrop: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    container: {
      paddingHorizontal: wp(2),
      paddingVertical: 20,
      paddingBottom: 50,
      width: wp(90),
      backgroundColor: colors.BACKGROUND_MODAL,
      borderRadius: 16,
      minHeight: hp(50),
      maxHeight: hp(80),
    },
    header: {
      fontSize: 21,
      fontWeight: '700',
      textAlign: 'center',
      color: colors.PRIMARY.text,
      marginTop: 5,
      marginBottom: 10,
    },
    closeBtn: {
      alignItems: 'flex-end',
      marginRight: 10,
    },
    headerTable: {
      flexDirection: 'row',
      padding: 10,
      fontSize: 15,
      borderBottomWidth: 1,
      borderBottomColor: colors.PRIMARY[400],
      color: colors.text,
    },
    row: {
      flexDirection: 'row',
      marginVertical: 7,
    },
    title: {
      color: colors.text,
      fontSize: 16,
      fontWeight: '600',
    },
    info: {
      color: colors.text,
      fontSize: 16,
    },
    row: {
      flexDirection: 'row',
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
    },
    headerCell: {
      flex: 1,
      fontWeight: 'bold',
      textAlign: 'center',
      color: colors.text,
    },
    cell: {
      flex: 1,
      textAlign: 'center',
      color: colors.text,
    },
  });
