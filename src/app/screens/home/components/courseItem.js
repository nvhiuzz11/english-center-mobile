import React from 'react';
import {useNavigation, useTheme} from '@react-navigation/native';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useDispatch} from 'react-redux';
import FastImage from 'react-native-fast-image';
import {translate} from '@locales';
import {wp} from '@utils/responsive';
import {formatDateFromISO, formatMoney} from '@utils/input';

export const CourseItem = props => {
  const {courseData, onPressCource} = props;

  const program = courseData.program;

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {colors} = useTheme();

  const styles = makeStyle(colors);

  return (
    <TouchableOpacity
      style={styles.courseItemContainer}
      onPress={() => {
        onPressCource(courseData);
      }}>
      <View style={{flexDirection: 'row'}}>
        <View style={styles.leftItemContainer}>
          <FastImage
            source={require('@assets/images/defaultClassImage.png')}
            style={styles.image}
            resizeMode="stretch"
          />
          <Text style={[styles.description, {fontWeight: '500'}]}>
            {translate('Class ID')}: {courseData.code}
          </Text>
          <Text style={[styles.description, {fontWeight: '500', fontSize: 12}]}>
            {translate('Center')} {courseData.centerId}
          </Text>
        </View>
        <View style={styles.rightItemContainer}>
          <Text style={styles.header}>{courseData.name}</Text>
          <View style={styles.row}>
            <Text style={styles.title}>{translate('Teacher')}:</Text>
          </View>
          <Text style={styles.description}>{courseData.teachers[0]?.name}</Text>
          <View style={styles.row}>
            <Text style={styles.title}>
              {translate('Total number of sessions')}:
            </Text>
            <Text style={styles.description}>{courseData.totalSession}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.title}>{translate('Time')}:</Text>
            <Text style={styles.description}>
              {formatDateFromISO(courseData.startAt)}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.title}>{translate('Tuition fee')}:</Text>
            <Text style={styles.description}>
              {formatMoney(courseData.fee)}/{translate('sessions')}
            </Text>
          </View>
          {program && (
            <>
              <View style={styles.row}>
                <Text style={styles.title}>{translate('Promotion')}:</Text>
                <Text style={styles.description}>
                  {program.reducePercent} {'%'}
                </Text>
              </View>
              <Text
                style={{
                  fontStyle: 'italic',
                  color: colors.SEMANTIC.WARNING[700],
                  fontSize: 14,
                }}>
                {translate('From')} {formatDateFromISO(program.startAt)}
                {'\n'}
                {translate('To')} {formatDateFromISO(program.endAt)}
              </Text>
            </>
          )}
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
      flex: 1,
    },
    leftItemContainer: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    rightItemContainer: {
      marginLeft: 10,
      alignItems: 'flex-start',
      justifyContent: 'center',
      flex: 1,
    },
    image: {
      height: 120,
      width: 120,
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
      fontWeight: '400',
    },
  });
