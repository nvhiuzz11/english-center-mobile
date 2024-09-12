import React, {useRef} from 'react';
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
import {CourseItem} from './components/courseItem';
import {Header} from '@components/header';
import {ROUTES_STUDENT_CLASS, SCREEN_NAME} from '@constants/navigation';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import {translate} from '@locales';
import {DropDownIcon} from '@assets/icons/dropDownIcon';
import {ActiveClass} from './components/activeClass';
import {ClosedClass} from './components/closedClass';

export const ScheduleScreen = props => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {colors} = useTheme();
  const styles = makeStyle(colors);

  return (
    <Container>
      <MainHeader />
      <View style={styles.container}></View>
    </Container>
  );
};

const makeStyle = colors =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
  });
