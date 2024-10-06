import React, {useState} from 'react';
import {View, StyleSheet, FlatList, Text, TouchableOpacity} from 'react-native';
import {useNavigation, useTheme} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {translate} from '@locales';
import {DropDownIcon} from '@assets/icons/dropDownIcon';
import {hp, wp} from '@utils/responsive';
import {SCREEN_NAME} from '@constants/navigation';
import {Avatar} from '@ui-kitten/components';
import {Container} from '@components/container';
import {Header} from '@components/header';
import {formatDateFromISO} from '@utils/input';

export const SessionContentDetailScreen = props => {
  const {attendanceData} = props.route.params.payload;

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {colors} = useTheme();
  const styles = makeStyle(colors);

  return (
    <Container>
      <Header title={translate('Content detail')} />
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          {attendanceData.generalReview ? (
            <>
              <Text style={styles.header}>
                {attendanceData?.generalReview?.title}
              </Text>
              <Text style={styles.title}>
                {translate('Time')}:{' '}
                <Text style={styles.descrpition}>
                  {formatDateFromISO(attendanceData.date)}
                </Text>
              </Text>
              <Text style={styles.title}>{translate('Session content')}:</Text>
              <Text style={styles.descrpition}>
                {attendanceData?.generalReview?.sessionContent}
              </Text>
              <Text style={styles.title}>
                {translate('Overall assessment')}:
              </Text>
              <Text style={styles.descrpition}>
                {attendanceData?.generalReview?.generalContent}
              </Text>
              <Text style={styles.title}>
                {translate('Student assessment')}:
              </Text>
              <Text style={styles.descrpition}>
                {attendanceData?.generalReview?.specificContent}
              </Text>
            </>
          ) : (
            <>
              <Text style={styles.header}>
                {'Đánh giá buổi học '}
                {formatDateFromISO(attendanceData.date)}
              </Text>
              <Text style={[styles.descrpition, {fontStyle: 'italic'}]}>
                {translate('Lesson content has not been updated')}
              </Text>
            </>
          )}
        </View>
      </View>
    </Container>
  );
};

const makeStyle = colors =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    contentContainer: {
      marginTop: 25,
      paddingHorizontal: wp(5),
    },
    header: {
      fontSize: 21,
      fontWeight: '700',
      textAlign: 'center',
      color: colors.PRIMARY.text,
      marginBottom: 10,
    },
    row: {
      flexDirection: 'row',
      marginVertical: 7,
    },
    title: {
      color: colors.text,
      fontSize: 18,
      fontWeight: '600',
      marginTop: 15,
    },
    descrpition: {
      color: colors.text,
      fontSize: 16,
      fontWeight: '400',
    },
  });
