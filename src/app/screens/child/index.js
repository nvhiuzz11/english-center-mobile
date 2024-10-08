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
  KeyboardAvoidingView,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {MainHeader} from '@components/mainHeader';
import {hp, wp} from '@utils/responsive';
import {CourseItem} from './components/courseItem';
import {Header} from '@components/header';
import {ROUTES_STUDENT_CLASS, SCREEN_NAME} from '@constants/navigation';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import {translate} from '@locales';
import {Swipeable} from 'react-native-gesture-handler';
import {SwipeableItem} from '@components/swipeableItem';
import {Avatar} from '@ui-kitten/components';
import {AddCircleIcon} from '@assets/icons/addCircleIcon';
import {REQUEST_STATUS, REQUEST_TYPE} from '@constants/request';
import {ModalListRequest} from './components/modalListRequest';
import {ModalAddRequest} from './components/modalAddRequest';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {ModalStudentInfo} from './components/modalStudentInfo';
import {useAuxios} from '@src/app/hook';
import {StatusCodes} from 'http-status-codes';
import {ROLE, ROLE_REQUEST} from '@constants/user';
import {getAvatar, getGender} from '@utils/user';
import Toast from 'react-native-toast-message';
import {Loading} from '@components/loading';

export const ChildScreen = props => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {colors} = useTheme();
  const styles = makeStyle(colors);

  const {publicAxios, authAxios} = useAuxios();
  const isFocused = useIsFocused();

  const [showInfo, setShowInfo] = useState(false);
  const [info, setInfo] = useState(null);
  const [showRequest, setShowRequest] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [childs, setChilds] = useState([]);
  const [listRequest, setListRequest] = useState([]);
  const [listRequestReceive, setListRequestReceive] = useState([]);
  const [listRequestSend, setListRequestSend] = useState([]);

  const [type, setType] = useState(null);

  useEffect(() => {
    if (isFocused) {
      fetchChild();
      fetchRequest();
    }
  }, [isFocused]);

  const fetchChild = async () => {
    try {
      const response = await authAxios.get('api/student-connected');
      if (response.status === StatusCodes.OK) {
        console.log('fetchChild res  :', response.data);
        setChilds(response.data);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error('fetchChild error', error);
    }
  };

  const fetchRequest = async () => {
    try {
      const response = await authAxios.get('api/request', {
        params: {
          status: REQUEST_STATUS.PENDING,
        },
      });
      console.log('fetchRequest res  :', response.data);
      const requests = response.data;
      setListRequest(response.data);

      setListRequestSend(
        requests.filter(item => item.requestByRoleId === ROLE_REQUEST.PARENT),
      );
      setListRequestReceive(
        requests.filter(item => item.requestByRoleId === ROLE_REQUEST.STUDENT),
      );
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error('fetchRequest error', error);
    }
  };

  const onPressItem = item => {
    // setInfo(info);
    // setShowInfo(true);
    navigation.navigate(SCREEN_NAME.STUDENT_DETAIL, {
      payload: {childInfo: item},
    });
  };
  const onPressShowSend = () => {
    setType(REQUEST_TYPE.SEND);
    setShowRequest(true);
  };
  const onPressShowReceive = () => {
    setType(REQUEST_TYPE.RECEIVE);
    setShowRequest(true);
  };

  const onPressShowAddModal = () => {
    setShowAddModal(true);
  };

  const onCreat = async id => {
    setShowAddModal(false);
    setIsLoading(true);
    try {
      const res = await authAxios.post('api/request', {targetId: id});
      if (res.status === StatusCodes.OK) {
        await fetchRequest();
        Toast.show({
          type: 'success',
          props: {
            title: translate('Send request successfully'),
          },
        });
        setIsLoading(false);
      }
    } catch (error) {
      console.log('onCreat ~ error', error);
      setIsLoading(false);
      Toast.show({
        type: 'error',
        props: {
          title: translate(
            'The request already exists or the student id is wrong',
          ),
        },
      });
    }
  };
  const onAccept = async requestID => {
    setShowRequest(false);
    setIsLoading(true);
    try {
      const res = await authAxios.put(`api/request/${requestID}`, {
        status: REQUEST_STATUS.ACCEPT,
      });
      if (res.status === StatusCodes.OK) {
        await fetchChild();
        await fetchRequest();
        Toast.show({
          type: 'success',
          props: {
            title: translate('Added associated student successfully'),
          },
        });
        setIsLoading(false);
      }
    } catch (error) {
      console.log('onAccept ~ error', error);
      setIsLoading(false);
      Toast.show({
        type: 'error',
        props: {
          title: translate('Add student link failed'),
        },
      });
    }
  };
  const onRefuse = async requestID => {
    setShowRequest(false);

    setIsLoading(true);
    try {
      const res = await authAxios.put(`api/request/${requestID}`, {
        status: REQUEST_STATUS.DENY,
      });
      if (res.status === StatusCodes.OK) {
        await fetchRequest();
        Toast.show({
          type: 'success',
          props: {
            title: translate('Delete request successfully'),
          },
        });
        setIsLoading(false);
      }
    } catch (error) {
      console.log('onAccept ~ error', error);
      setIsLoading(false);
      Toast.show({
        type: 'error',
        props: {
          title: translate('Delete request failed'),
        },
      });
    }
  };

  const onDelete = async id => {
    setIsLoading(true);
    try {
      const res = await authAxios.post('api/request-remove', {targetId: id});
      if (res.status === StatusCodes.OK) {
        await fetchChild();
        Toast.show({
          type: 'success',
          props: {
            title: translate('Deleted associated student successfully'),
          },
        });
        setIsLoading(false);
      }
    } catch (error) {
      console.log('onDelete ~ error', error);
      setIsLoading(false);
      Toast.show({
        type: 'error',
        props: {
          title: translate('Delete associated student failed'),
        },
      });
    }
  };

  const renderRightActions = (progress, dragX, item) => {
    return (
      <TouchableOpacity
        onPress={() => {
          onDelete(item.id);
        }}
        style={styles.deleteButton}>
        <Text style={styles.deleteButtonText}>{translate('Delete')}</Text>
      </TouchableOpacity>
    );
  };

  const renderItem = ({item, index}) => (
    <Swipeable
      renderRightActions={(progress, dragX) =>
        renderRightActions(progress, dragX, item)
      }>
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => {
          onPressItem(item);
        }}>
        <View style={styles.leftContainer}>
          <Avatar
            size="large"
            source={getAvatar(ROLE.STUDENT, item.gender)}
            style={styles.avatar}
          />
          <Text style={styles.idItem}>
            {'ID: '}
            {item.id}
          </Text>
        </View>

        <View style={styles.rightContainer}>
          <View style={styles.row}>
            <Text style={styles.nameItem}>{item.name}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.title}>{translate('Gender')}: </Text>
            <Text style={styles.infoText}>{getGender(item.gender)}</Text>
            <Text style={[styles.infoText, {marginLeft: 50}]}>
              {item.age} {translate('years old')}
            </Text>
          </View>
          {item.phone && (
            <View style={styles.row}>
              <Text style={styles.title}>
                {translate('Phone')}:{' '}
                <Text style={{fontWeight: '400'}}>{item.phone}</Text>
              </Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    </Swipeable>
  );

  return (
    <Container>
      {isLoading && <Loading />}
      <MainHeader />
      <View style={styles.container}>
        <View>
          <Text style={styles.header}>
            {translate('List of students linked to you')}
          </Text>
          <FlatList
            data={childs}
            keyExtractor={item => item.id}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            style={{height: hp(60)}}
          />
        </View>
        <View style={styles.buttonContainer}>
          <View style={{flex: 4}}>
            <TouchableOpacity style={styles.button} onPress={onPressShowSend}>
              <Text style={styles.buttonTitle}>
                {translate('List of sent requests')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={onPressShowReceive}>
              <Text style={styles.buttonTitle}>
                {translate('List of receive requests')}
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.addButton}
            onPress={onPressShowAddModal}>
            <AddCircleIcon color={colors.text} />
          </TouchableOpacity>
        </View>
      </View>
      {/* <ModalStudentInfo
        isVisible={showInfo}
        onClose={() => {
          setShowInfo(false);
        }}
        info={info}
      /> */}
      <ModalListRequest
        isVisible={showRequest}
        onClose={() => {
          setShowRequest(false);
        }}
        type={type}
        listRequestSend={listRequestSend}
        listRequestReceive={listRequestReceive}
        onAccept={onAccept}
        onRefuse={onRefuse}
      />
      <ModalAddRequest
        isVisible={showAddModal}
        onClose={() => {
          setShowAddModal(false);
        }}
        onCreat={onCreat}
      />
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
      fontWeight: '800',
      color: colors.SECONDARY[800],
      textAlign: 'center',
      marginTop: 25,
      marginBottom: 5,
    },
    itemContainer: {
      backgroundColor: colors.SECONDARY[400],
      marginVertical: 5,
      paddingHorizontal: 15,
      paddingVertical: 10,
      borderRadius: 15,
      flexDirection: 'row',
      alignItems: 'center',
    },
    avatar: {
      width: 70,
      height: 70,
    },
    leftContainer: {
      alignItems: 'center',
    },
    rightContainer: {
      marginLeft: 20,
    },
    nameItem: {
      color: colors.text,
      fontSize: 18,
      fontWeight: '600',
    },
    idItem: {
      color: colors.text,
      fontSize: 14,
      fontWeight: '700',
      marginTop: 5,
    },
    infoText: {
      color: colors.text,
      fontSize: 16,
    },
    title: {
      color: colors.text,
      fontSize: 16,
      fontWeight: '600',
    },
    row: {
      flexDirection: 'row',
      marginVertical: 3,
      alignItems: 'center',
    },
    deleteButton: {
      backgroundColor: colors.SEMANTIC.ERROR[500],
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 15,
      paddingVertical: 10,
      borderRadius: 15,
      marginHorizontal: 10,
      height: 100,
      alignSelf: 'center',
    },
    deleteButtonText: {
      color: '#f3f3f3',
      fontSize: 16,
      fontWeight: '600',
    },
    button: {
      backgroundColor: colors.NEUTRAL[400],
      paddingVertical: 10,
      paddingHorizontal: 10,
      borderRadius: 15,
      alignItems: 'center',
      marginVertical: 2,
    },
    buttonTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text,
    },
    addButton: {
      flexDirection: 'row',
      backgroundColor: colors.SEMANTIC.SUCCESS[600],
      alignItems: 'center',
      borderColor: colors.border,
      borderRadius: 15,
      marginLeft: 10,
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    addButtontitle: {
      marginRight: 10,
    },
    buttonContainer: {
      flexDirection: 'row',
      paddingVertical: 5,
      position: 'absolute',
      bottom: 0,
      paddingHorizontal: wp(2),
    },
  });
