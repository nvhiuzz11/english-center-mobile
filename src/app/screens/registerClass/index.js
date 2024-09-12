import {BackIcon} from '@assets/icons/backIcon';
import {Container} from '@components/container';
import {MainHeader} from '@components/mainHeader';
import {translate} from '@locales';
import {useNavigation, useTheme} from '@react-navigation/native';
import {hp, wp} from '@utils/responsive';
import React, {useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useSelector} from 'react-redux';
import {ModalRecommendLogin} from './components/modalRecommendLogin';
import {SCREEN_NAME} from '@constants/navigation';

export const ResgisterClassScreen = props => {
  const {courseData} = props.route.params.payload;

  const {colors} = useTheme();
  const navigation = useNavigation();
  const styles = makeStyle(colors);

  const isLogin = useSelector(state => state.app.isLogin);

  const [isVisible, setIsVisible] = useState(false);

  console.log('courseData', courseData);

  const onPressRegister = () => {
    if (isLogin) {
    } else {
      setIsVisible(true);
    }
  };

  const onPressCancel = () => {
    setIsVisible(false);
  };

  const onPressLogin = () => {
    setIsVisible(false);
    navigation.navigate(SCREEN_NAME.LOGIN);
  };

  return (
    <Container>
      <MainHeader />
      <ScrollView style={styles.container}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => {
            navigation.goBack();
          }}>
          <BackIcon color={colors.PRIMARY.text} />
          <Text style={styles.backButtonTitle}>{translate('Back')}</Text>
        </TouchableOpacity>
        <View style={styles.detailContainer}>
          <Text style={styles.header}>
            {translate('Detailed information class')} {' E05-L02-2024'}
          </Text>
          <View style={styles.row}>
            <Text style={styles.title}>{translate('Class ID')}:</Text>
            <Text style={styles.description}>{'E05-L02-2024'}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.title}>{translate('Class name')}:</Text>
            <Text style={styles.description}>{'E05-L02-2024'}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.title}>{translate('Age')}:</Text>
            <Text style={styles.description}>{'E05-L02-2024'}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.title}>{translate('Course start time')}:</Text>
            <Text style={styles.description}>{'E05-L02-2024'}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.title}>{translate('Class schedule')}:</Text>
            <View>
              <Text style={styles.description}>{'E05-L02-2024'}</Text>
              <Text style={styles.description}>{'E05-L02-2024'}</Text>
              <Text style={styles.description}>{'E05-L02-2024'}</Text>
            </View>
          </View>
          <View style={styles.row}>
            <Text style={styles.title}>{translate('Tuition fee')}:</Text>
            <Text style={styles.description}>{'E05-L02-2024'}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.title}>
              {translate('Total number of sessions')}:
            </Text>
            <Text style={styles.description}>{'E05-L02-2024'}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.title}>
              {translate('Total number of taught sessions')}:
            </Text>
            <Text style={styles.description}>{'E05-L02-2024'}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.title}>
              {translate('Number of registered students')}:
            </Text>
            <Text style={styles.description}>{'E05-L02-2024'}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.title}>
              {translate('Maximum number of students')}:
            </Text>
            <Text style={styles.description}>{'E05-L02-2024'}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.title}>{translate('Teacher')}:</Text>
            <Text style={styles.description}>{'E05-L02-2024'}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.title}>
              {translate('Teacher qualifications')}:
            </Text>
            <Text style={styles.description}>{'E05-L02-2024'}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.title}>{translate('Promotion')}:</Text>
            <Text style={styles.description}>{'E05-L02-2024'}</Text>
          </View>
          <TouchableOpacity style={styles.button} onPress={onPressRegister}>
            <Text style={styles.buttonTitle}>
              {translate('Resgister now!')}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <ModalRecommendLogin
        isVisible={isVisible}
        onCancel={onPressCancel}
        onLogin={onPressLogin}
      />
    </Container>
  );
};

const makeStyle = colors =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    detailContainer: {
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
    header: {
      fontSize: 22,
      textAlign: 'center',
      color: colors.text,
      fontWeight: '600',
      color: colors.PRIMARY.text,
      marginBottom: 20,
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginVertical: 5,
      alignItems: 'center',
    },
    backButton: {
      flexDirection: 'row',
      backgroundColor: colors.PRIMARY.button,
      borderRadius: 22,
      borderWidth: 1,
      borderColor: colors.PRIMARY.text,
      paddingVertical: 3,
      marginTop: hp(2),
      width: 100,
      justifyContent: 'center',
      marginLeft: wp(2),
    },
    backButtonTitle: {
      color: colors.PRIMARY.text,
      fontSize: 15,
      fontWeight: '600',
      textAlign: 'center',
    },
    title: {
      fontSize: 14,
      fontWeight: '600',
      color: colors.PRIMARY.text,
    },
    description: {
      color: colors.text,
    },
    button: {
      backgroundColor: colors.PRIMARY.button,
      borderRadius: 22,
      borderWidth: 1,
      borderColor: colors.PRIMARY.text,
      paddingVertical: 5,
      marginTop: 30,
    },
    buttonTitle: {
      color: colors.PRIMARY.text,
      fontSize: 18,
      fontWeight: '700',
      textAlign: 'center',
    },
  });
