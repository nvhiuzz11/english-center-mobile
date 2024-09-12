import React from 'react';
import {useNavigation, useTheme} from '@react-navigation/native';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useDispatch} from 'react-redux';
import FastImage from 'react-native-fast-image';
import {translate} from '@locales';
import {wp} from '@utils/responsive';

export const CourseItem = props => {
  const {courseData, onPressCource} = props;

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
      <View style={styles.leftItemContainer}>
        <FastImage
          source={require('@assets/images/defaultClassImage.png')}
          style={styles.image}
          resizeMode="stretch"
        />
        <Text style={[styles.description, {fontWeight: '500'}]}>
          {translate('Class ID')}: {'L03-02-2023'}
        </Text>
        <Text style={[styles.description, {fontWeight: '500', fontSize: 12}]}>
          {translate('Center')} {'A'}
        </Text>
      </View>
      <View style={styles.rightItemContainer}>
        <Text style={styles.header}>{'Lớp tiếng anh L03'}</Text>
        <View style={styles.row}>
          <Text style={styles.title}>{translate('Teacher')}:</Text>
          <Text style={styles.description}>{'Nguyễn Văn A'}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.title}>
            {translate('Total number of sessions')}:
          </Text>
        </View>
        <Text style={styles.description}>{'20 buổi'}</Text>
        <View style={styles.row}>
          <Text style={styles.title}>{translate('Course start time')}:</Text>
          <Text style={styles.description}>{'2-3-2024'}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.title}>{translate('Tuition fee')}:</Text>
          <Text style={styles.description}>{'200.000đ'}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.title}>{translate('Promotion')}:</Text>
          <Text style={styles.description}>{'20%'}</Text>
        </View>
        <Text
          style={{
            fontStyle: 'italic',
            color: '#d9b607',
            fontSize: 13,
          }}>
          {'(Từ ngày 12-1-2024 đến 22-2-2024)'}
        </Text>
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
      flexDirection: 'row',
      marginVertical: 5,
    },
    leftItemContainer: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    rightItemContainer: {
      marginLeft: 20,
    },
    image: {
      height: 150,
      width: 120,
      borderRadius: 20,
      marginBottom: 5,
    },
    header: {
      color: colors.text,
      fontSize: 20,
      fontWeight: '700',
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
