import React, {useEffect, useState} from 'react';
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
import {l} from 'i18n-js';
import {StatusCodes} from 'http-status-codes';
import {formatMoney, getCostStatus, removeVietnameseTones} from '@utils/input';
import {translate} from '@locales';
import {COST_STATUS} from '@constants/request';
import {SCREEN_NAME} from '@constants/navigation';
import {
  KeyboardAwareFlatList,
  KeyboardAwareScrollView,
} from 'react-native-keyboard-aware-scroll-view';

export const FeeScreen = props => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {colors} = useTheme();
  const styles = makeStyle(colors);
  const {authAxios} = useAuxios();
  const isFocused = useIsFocused();

  const [isLoading, setIsLoading] = useState(true);
  const [listCost, setListCost] = useState(null);
  const [listCostData, setListCostData] = useState([]);
  const [childs, setChilds] = useState(null);
  const [selectedChildIndex, setSelectedChildIndex] = useState(
    new IndexPath(0),
  );
  const [selectedStatusIndex, setSelectedStatusIndex] = useState(
    new IndexPath(0),
  );

  const [searchKey, setSearchKey] = useState('');

  const statusOptions = [
    {id: null, name: '...'},
    {id: 1, name: translate('Unpaid')},
    {id: 2, name: translate('Completed')},
    {id: 3, name: translate('Still owe money')},
  ];

  useEffect(() => {
    if (isFocused) {
      setSelectedChildIndex(new IndexPath(0));
      setSelectedStatusIndex(new IndexPath(0));
      fetchChild();
      fetchCost();
    }
  }, [isFocused]);

  // useEffect(() => {
  //   if (childs && listCost) {
  //     if (listCostData) setListCostData(listCost);
  //   }
  // }, [childs, listCost]);

  useEffect(() => {
    if (listCost && childs) {
      setListCostData(
        listCost.filter(invoice => {
          const selectedChildId =
            selectedChildIndex.row === 0
              ? null
              : childs[selectedChildIndex.row - 1]?.id; // Đặt điều kiện cho "Tất cả"
          const selectedStatus =
            selectedStatusIndex.row === 0
              ? null
              : statusOptions[selectedStatusIndex.row]?.id; // Đặt điều kiện cho "Tất cả"

          const matchChild =
            !selectedChildId || invoice.user.student.id === selectedChildId;
          const matchStatus =
            !selectedStatus || invoice.status === selectedStatus;

          const matchSearchKey =
            removeVietnameseTones(invoice.name.toLowerCase()).includes(
              searchKey.toLowerCase(),
            ) ||
            removeVietnameseTones(
              invoice.user.student.name.toLowerCase(),
            ).includes(searchKey.toLowerCase()) ||
            invoice.id.toString().includes(searchKey) ||
            invoice.totalMoney.toString().includes(searchKey) ||
            `${invoice.forMonth}/${invoice.forYear}`
              .toString()
              .includes(searchKey);

          return matchChild && matchStatus && matchSearchKey;
        }),
      );
    }
  }, [selectedChildIndex, selectedStatusIndex, childs, listCost, searchKey]);

  const fetchCost = async () => {
    try {
      const response = await authAxios.get('api/costs-by-parent');
      if (response.status === StatusCodes.OK) {
        console.log('fetchCost data', response.data);
        setListCost(response.data.docs);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error('fetchCost error', error);
    }
  };

  const fetchChild = async () => {
    try {
      const response = await authAxios.get('api/student-connected');
      if (response.status === StatusCodes.OK) {
        console.log('fetchChild data', response.data);
        setChilds(response.data);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error('fetchChild error', error);
    }
  };

  const renderItem = ({item}) => {
    let bgcolor;
    if (item.status === COST_STATUS.PENDING) {
      bgcolor = colors.INVOICE_STATUS.PENDING;
    } else if (item.status === COST_STATUS.DONE) {
      bgcolor = colors.INVOICE_STATUS.DONE;
    } else {
      bgcolor = colors.INVOICE_STATUS.DEBT;
    }
    return (
      <TouchableOpacity
        style={[styles.itemContainer, {backgroundColor: bgcolor}]}
        onPress={() =>
          navigation.navigate(SCREEN_NAME.FEE_DETAIL, {
            payload: {
              costDetail: item,
            },
          })
        }>
        <View style={styles.row}>
          <Text style={[styles.title, {fontWeight: '500'}]}>ID: {item.id}</Text>
          <Text style={[styles.title, {marginLeft: 20, fontWeight: '500'}]}>
            {item.name}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.title}>{item.user.student.name}</Text>
          <Text style={[styles.title, {marginLeft: 39}]}>{'E01-7-2024'}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.title}>
            {translate('Time')}: {item.forMonth}
            {'/'}
            {item.forYear}
          </Text>
          <Text style={[styles.title, {marginLeft: 30}]}>
            {formatMoney(item.totalMoney)} VND
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.title}>
            {translate('Status')}:{' '}
            <Text style={{}}>{getCostStatus(item.status)}</Text>
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <Container>
      <MainHeader />
      {isLoading && <Loading />}
      <KeyboardAwareScrollView
        style={{flex: 1}}
        contentContainerStyle={{flexGrow: 1}}
        enableOnAndroid={true}
        extraScrollHeight={-hp(30)}>
        <View style={styles.container}>
          <Text style={styles.header}>{translate('List of tuition fees')}</Text>

          <View style={styles.searchContainer}>
            <InputApp
              style={styles.searchInput}
              textStyle={styles.searchText}
              placeholder={translate('Enter search key')}
              accessoryLeft={<SearchIcon color={colors.PRIMARY[900]} />}
              onChangeText={text => setSearchKey(text)}
              value={searchKey}
            />

            <TouchableOpacity
              style={styles.reloadContainer}
              onPress={() => {
                setSelectedChildIndex(new IndexPath(0));
                setSelectedStatusIndex(new IndexPath(0));
                setSearchKey('');
                fetchCost();
              }}>
              <ReloadIcon color={colors.text} />
            </TouchableOpacity>
          </View>

          <View style={styles.selectContainer}>
            <View style={styles.select}>
              <Text style={styles.selectTitle}>{translate('Student')}</Text>
              <Select
                selectedIndex={selectedChildIndex}
                onSelect={index => setSelectedChildIndex(index)}
                placeholder="Chọn học sinh"
                value={
                  childs
                    ? selectedChildIndex.row === 0
                      ? '...'
                      : childs[selectedChildIndex.row - 1]?.name
                    : '...'
                }>
                <SelectItem title="..." />
                {childs &&
                  childs.map(child => (
                    <SelectItem key={child.id} title={child.name} />
                  ))}
              </Select>
            </View>
            <View style={styles.select}>
              <Text style={styles.selectTitle}>{translate('Status')}</Text>
              <Select
                selectedIndex={selectedStatusIndex}
                onSelect={index => setSelectedStatusIndex(index)}
                placeholder="Chọn trạng thái"
                value={statusOptions[selectedStatusIndex.row]?.name}>
                {statusOptions.map(status => (
                  <SelectItem key={status.id} title={status.name} />
                ))}
              </Select>
            </View>
          </View>

          {listCostData.length < 1 && listCost && (
            <Text
              style={[
                styles.title,
                {fontStyle: 'italic', marginHorizontal: wp(2)},
              ]}>
              {translate('There are no tuition invoices as per your request')}
            </Text>
          )}

          <FlatList
            data={listCostData}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </KeyboardAwareScrollView>
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
    description: {},
  });
