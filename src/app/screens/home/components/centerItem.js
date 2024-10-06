import React from 'react';
import {useNavigation, useTheme} from '@react-navigation/native';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {useDispatch} from 'react-redux';
import FastImage from 'react-native-fast-image';
import {translate} from '@locales';
import {wp} from '@utils/responsive';
import {SCREEN_NAME} from '@constants/navigation';
import {convertMetersToKilometers} from '@utils/map';

export const CenterItem = props => {
  const {centerData, onPressCource} = props;

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {colors} = useTheme();

  const styles = makeStyle(colors);

  return (
    <TouchableOpacity
      style={styles.courseItemContainer}
      onPress={() => {
        navigation.navigate(SCREEN_NAME.CLASS_OF_CENTER, {
          payload: {centerId: centerData?.id},
        });
      }}>
      <View style={styles.row}>
        <View style={styles.leftItemContainer}>
          <FastImage
            source={require('@assets/images/defaultCenter.png')}
            style={styles.image}
            resizeMode="stretch"
          />
        </View>
        <View style={styles.rightItemContainer}>
          <Text style={styles.header}>
            {translate('Center')} {centerData?.id}
          </Text>
          <Text style={styles.title}>{centerData?.name}</Text>
          <Text style={styles.title}>
            {translate('Address')}: {centerData?.address}
          </Text>
          <Text style={styles.title}>
            {translate('Phone')}: {centerData?.phone}
          </Text>
          <Text style={styles.title}>
            {translate('Distance')}:{' '}
            {centerData.distanceFromA > 100
              ? `${convertMetersToKilometers(centerData.distanceFromA)} km`
              : `${centerData.distanceFromA} m`}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const makeStyle = colors =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    courseItemContainer: {
      paddingHorizontal: 10,
      paddingVertical: 15,
      backgroundColor: colors.card,
      borderRadius: 10,
      borderBlockStartColor: colors.border,
      borderBlockEndColor: colors.border,
      borderRightColor: colors.border,
      borderLeftColor: colors.border,
      borderWidth: 2,
    },
    leftItemContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
    },
    rightItemContainer: {
      marginLeft: 20,
      flex: 2,
    },
    image: {
      height: 100,
      width: 70,
      borderRadius: 20,
      marginBottom: 5,
    },
    header: {
      color: colors.text,
      fontSize: 20,
      fontWeight: '700',
      textAlign: 'center',
      marginBottom: 5,
    },
    row: {
      flexDirection: 'row',
    },
    title: {
      color: colors.text,
      fontSize: 14,
      fontWeight: '600',
    },
    description: {
      color: colors.text,
      marginLeft: 5,
      fontSize: 14,
    },
  });
