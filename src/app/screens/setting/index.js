import React from 'react';
import {Container} from '@components/container';
import {LIST_SETTINGS, SCREEN_NAME} from '@constants/navigation';
import {changeLanguage, translate} from '@locales';
import {useNavigation, useTheme} from '@react-navigation/native';
import {setAccountInfo} from '@store/reducers/account';
import {
  setIsSubscribedNotification,
  setThemeMode,
} from '@store/reducers/setting';
import {
  View,
  Text,
  Button,
  StyleSheet,
  FlatList,
  Touchable,
  Switch,
  TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Header} from '@components/header';
import {MainHeader} from '@components/mainHeader';
import {hp, wp} from '@utils/responsive';
import {ENFlag} from '@assets/svg/enFlag';
import {VNFlag} from '@assets/svg/vnFlag';

export const SettingScreen = props => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {colors} = useTheme();
  const styles = makeStyle(colors);

  // const themeMode = useSelector(state => state.settings.themeMode);
  // console.log('themeMode', themeMode);
  // console.log('language', language);
  // const mode = themeMode === 'light' ? 'dark' : 'light';
  // const la = language === 'en' ? 'vi' : 'en';

  // console.log('l ', LIST_SETTINGS);

  const {isSubscribedNotification, themeMode, language} = useSelector(
    state => state.settings,
  );

  const onChangeEnableNotification = async () => {
    dispatch(
      setIsSubscribedNotification({
        isSubscribedNotification: !isSubscribedNotification,
      }),
    );
  };

  const onEnableDarkMode = async () => {
    dispatch(
      setThemeMode({themeMode: themeMode === 'dark' ? 'light' : 'dark'}),
    );
  };

  const onPressChangeAccount = () => {};
  const onPressLogout = () => {};

  const onNavigate = item => {
    switch (item.action) {
      case 'navigate':
        navigation.navigate(SCREEN_NAME.PERSONAL_INFORMATION);
        break;
      case 'CA':
        onPressChangeAccount();
        break;
      case 'LO':
        onPressLogout();
        break;
      default:
        break;
    }
  };

  const renderItem = ({item, index}) => {
    if (item.type === 'touchable') {
      return (
        <TouchableOpacity
          onPress={() => {
            onNavigate(item);
          }}
          style={styles.containerItem}>
          <View style={styles.item}>
            {item.icon}
            <Text style={styles.label}>{translate(item.label)}</Text>
          </View>
        </TouchableOpacity>
      );
    }
    return (
      <View style={styles.containerItem}>
        <View style={{flexDirection: 'row'}}>
          {item.icon}
          <Text style={styles.label}>{translate(item.label)}</Text>
        </View>
        {item.type === 'notification' && (
          <Switch
            trackColor={{false: '#9b9a9c'}}
            thumbColor={'#2b9988'}
            value={isSubscribedNotification}
            onValueChange={onChangeEnableNotification}
          />
        )}
        {item.type === 'language' && (
          <TouchableOpacity
            onPress={() => {
              changeLanguage(language === 'en' ? 'vi' : 'en');
            }}>
            <View style={styles.flagWrap}>
              {language === 'en' ? <ENFlag /> : <VNFlag />}
              <Text style={styles.flagText}>
                {language === 'en' ? 'EN' : 'VN'}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        {item.type === 'theme' && (
          <Switch
            Switch
            trackColor={{false: '#9b9a9c'}}
            thumbColor={'#2b9988'}
            value={themeMode === 'dark'}
            onValueChange={onEnableDarkMode}
          />
        )}
      </View>
    );
  };

  const keyExtractor = item => `${item?.label}`;

  return (
    <Container>
      {/* <Header title={'Hoome a'} /> */}

      <MainHeader />
      <View style={styles.container}>
        <FlatList
          data={LIST_SETTINGS}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          style={{marginTop: hp(0)}}
        />
      </View>
    </Container>
  );
};

const makeStyle = colors =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    containerItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: wp(3),
      paddingVertical: hp(2),
      borderTopWidth: 0.5,
      borderBottomWidth: 1,
      borderBottomColor: colors.PRIMARY[100],
    },
    item: {
      flexDirection: 'row',
    },
    label: {
      fontSize: 16,
      lineHeight: 24,
      fontWeight: '500',
      fontStyle: 'normal',
      color: colors.PRIMARY[900],
      marginHorizontal: wp(3),
    },
    flagWrap: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 4,
      backgroundColor: colors.PRIMARY[100],
      borderRadius: 6,
    },
    flagText: {
      fontWeight: '500',
      fontSize: 14,
      marginLeft: 4,
      color: colors.text,
    },
  });
