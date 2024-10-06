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
  KeyboardAvoidingView,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {MainHeader} from '@components/mainHeader';
import {hp, wp} from '@utils/responsive';

import {Header} from '@components/header';
import {SCREEN_NAME} from '@constants/navigation';
import {setLanguage, setThemeMode} from '@store/reducers/setting';
import {InputApp} from '@components/input';
import {SearchIcon} from '@assets/icons/searchIcon';
import {FilterHomeIcon} from '@assets/icons/filterHomeIcon';
import {translate} from '@locales';
import {DrawerLayout} from 'react-native-gesture-handler';
import {Loading} from '@components/loading';
import Toast from 'react-native-toast-message';
import {CourseItem} from './components/courseItem';
import {useAuxios} from '@src/app/hook';
import {CLASS_STATUS} from '@constants/user';

export const ClassOfCenterScreen = props => {
  const {centerId} = props.route.params.payload;

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {colors} = useTheme();
  const styles = makeStyle(colors);

  const isLogin = useSelector(state => state.app.isLogin);
  const {publicAxios} = useAuxios();
  const [isLoading, setIsLoading] = useState(true);

  const [classes, setClasses] = useState([]);

  const onPressCource = courseData => {
    navigation.navigate(SCREEN_NAME.REGISTER_CLASS, {
      payload: {courseData: courseData},
    });
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    try {
      const response = await publicAxios.get('api/class', {
        params: {
          status: CLASS_STATUS.COMMING,
          includeTeacher: true,
          includeCenter: true,
          includeProgram: true,
          includeSchedule: true,
          centerId: centerId,
        },
      });
      console.log('fetchClasses res :', response.data);
      setClasses(response.data.docs);
      setIsLoading(false);
    } catch (error) {
      console.error('fetchClasses error', error);
    }
  };

  const renderItem = ({item, index}) => {
    return <CourseItem courseData={item} onPressCource={onPressCource} />;
  };

  return (
    <Container>
      {isLoading && <Loading />}
      <Header title={translate('Center') + ' ' + centerId} />
      <View style={styles.container}>
        <Text style={styles.header}>
          {translate('Class list is about to open')}
        </Text>

        {classes.length > 0 ? (
          <FlatList
            data={classes}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            scrollEventThrottle={16}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          !isLoading && (
            <Text style={styles.notice}>
              {translate('Currently, the center has no upcoming classes')}...
            </Text>
          )
        )}
      </View>
    </Container>
  );
};

const makeStyle = colors =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: wp(5),
      marginBottom: hp(5),
    },
    classContainer: {
      marginTop: 30,
    },
    columnContainer: {
      backgroundColor: colors.NEUTRAL[50],
      marginTop: 20,
      paddingBottom: 10,
    },
    header: {
      fontSize: 22,
      color: colors.SECONDARY[800],
      fontWeight: '700',
      textAlign: 'center',
    },
    notice: {
      fontSize: 16,
      color: colors.text,
      fontWeight: '500',
      marginTop: 20,
      fontStyle: 'italic',
    },
    searchText: {
      color: colors.text,
    },
    footer: {},
  });
