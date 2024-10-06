import React, {useEffect, useRef, useState} from 'react';
import {Container} from '@components/container';
import {useIsFocused, useNavigation, useTheme} from '@react-navigation/native';
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
import {useAuxios} from '@src/app/hook';
import {Loading} from '@components/loading';
import {StatusCodes} from 'http-status-codes';
import {formatDateFromISO, formatTimeISO} from '@utils/input';
import {NOTIFICATION_TYPE} from '@constants/request';

export const NotificationScreen = props => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {colors} = useTheme();
  const styles = makeStyle(colors);

  const {publicAxios, authAxios} = useAuxios();
  const isFocused = useIsFocused();

  const [isLoading, setIsLoading] = useState(true);
  const [listNoti, setListNoti] = useState([]);

  useEffect(() => {
    if (isFocused) {
      fetchNoti();
    }
  }, [isFocused]);

  const fetchNoti = async () => {
    try {
      const response = await authAxios.get('api/notifications');
      if (response.status === StatusCodes.OK) {
        console.log('fetchNoti res  :', response.data);
        const docs = response.data.docs;
        if (docs.length > 0) {
          docs.sort((a, b) => new Date(b.date) - new Date(a.date));
        }

        setListNoti(docs);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error('fetchNoti error', error);
    }
  };

  const onPresItem = item => {
    console.log('item', item);
    switch (item.type) {
      case NOTIFICATION_TYPE.REQUEST:
        navigation.navigate(SCREEN_NAME.BOTTOM_TAB);
        break;
      case NOTIFICATION_TYPE.REVIEW:
        break;
      case NOTIFICATION_TYPE.TRANSACTION:
        break;
      default:
        break;
    }

    // navigation.navigate(SCREEN_NAME.WAGE_DETAIL);
  };

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => {
          onPresItem(item);
        }}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.content}</Text>
        <Text style={styles.time}>
          {translate('Time')}: {formatTimeISO(item.createdAt)}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <Container>
      {isLoading && <Loading />}
      <Header title={translate('Notification')} />
      <View style={styles.container}>
        <FlatList
          data={listNoti}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => `${item.id}-${index}`}
        />
      </View>
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
    itemContainer: {
      paddingHorizontal: 15,
      paddingVertical: 10,
      marginVertical: 5,
      backgroundColor: colors.NEUTRAL[50],
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
      fontWeight: '600',
    },
    description: {
      color: colors.text,
      fontSize: 14,
      fontWeight: '400',
    },
    time: {
      color: colors.text,
      fontWeight: '400',
      fontSize: 14,
      fontStyle: 'italic',
      textAlign: 'right',
    },
  });
