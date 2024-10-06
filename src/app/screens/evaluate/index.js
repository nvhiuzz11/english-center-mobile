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
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {MainHeader} from '@components/mainHeader';
import {hp, wp} from '@utils/responsive';
import {Header} from '@components/header';
import {SCREEN_NAME} from '@constants/navigation';
import {setThemeMode} from '@store/reducers/setting';
import {InputApp} from '@components/input';
import {SearchIcon} from '@assets/icons/searchIcon';
import {FilterHomeIcon} from '@assets/icons/filterHomeIcon';
import {translate} from '@locales';
import {DrawerLayout} from 'react-native-gesture-handler';
import {CheckBox, Datepicker} from '@ui-kitten/components';
import {DatePickerIcon} from '@assets/icons/datePickerIcon';
import {EVALUATE_TYPE} from '@constants/request';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Alert} from 'react-native';
import Toast from 'react-native-toast-message';
import {Loading} from '@components/loading';
import {useAuxios} from '@src/app/hook';
import {StatusCodes} from 'http-status-codes';
import {formatDateFromISO} from '@utils/input';

export const EvaluateSessionScreen = props => {
  const payload = props?.route?.params?.payload;

  const {type, classData, reivewData, attendanceData} = payload;
  const students = classData?.students;
  const reviews = reivewData || [];

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {colors} = useTheme();
  const styles = makeStyle(colors);

  const {publicAxios, authAxios} = useAuxios();

  const [date, setDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);

  const [title, setTitle] = useState('');
  const [lessonContent, setLessonContent] = useState('');
  const [expandedStudents, setExpandedStudents] = useState({});
  const [studentEvaluations, setStudentEvaluations] = useState({});
  const [generalContent, setGeneralContent] = useState('');

  useEffect(() => {
    console.log('classData', classData);
    console.log('reivewData', reivewData);
    console.log('attendanceData', attendanceData);
    // students.forEach(student => {
    //   student.reviews = reviews.filter(
    //     review => review.referenceId === student.id,
    //   );
    // });

    console.log('students', students);

    const initialEvaluations = {};

    students.forEach(student => {
      const studentReview = reviews.find(
        review => review.referenceId === student.id,
      );
      initialEvaluations[student.id] = studentReview
        ? studentReview.specificContent
        : '';
    });
    console.log('initialEvaluations', initialEvaluations);

    setStudentEvaluations(initialEvaluations);

    if (type === EVALUATE_TYPE.UPDATE) {
      setDate(new Date(attendanceData.date));
      if (reviews[0]?.title) {
        setTitle(reviews[0].title);
      } else {
        setTitle('Đánh giá buổi học ' + formatDateFromISO(attendanceData.date));
      }
      if (reviews[0]?.sessionContent) {
        setLessonContent(reviews[0].sessionContent);
      }

      if (reviews[0]?.generalContent) {
        setGeneralContent(reviews[0].generalContent);
      }
    }
  }, []);

  const toggleStudentExpand = id => {
    setExpandedStudents(prevState => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const handleEvaluationChange = (studentId, content) => {
    setStudentEvaluations(prevState => ({
      ...prevState,
      [studentId]: content,
    }));
  };

  const handleUpdate = async () => {
    const specificContent = Object.keys(studentEvaluations).map(studentId => ({
      studentId: Number(studentId),
      content: studentEvaluations[studentId],
    }));

    console.log('specificContent', specificContent);

    setIsLoading(true);
    console.log('attendanceData.id', attendanceData.id);

    try {
      let res;
      if (reivewData.length < 1) {
        res = await authAxios.post('api/review', {
          generalContent: generalContent,
          specificContent: specificContent,
          sessionContent: lessonContent,
          title: title,
          attendanceId: attendanceData.id,
        });
      } else {
        res = await authAxios.put('api/review', {
          generalContent: generalContent,
          specificContent: specificContent,
          sessionContent: lessonContent,
          title: title,
          attendanceId: attendanceData.id,
        });
      }

      if (res.status === StatusCodes.OK) {
        Toast.show({
          type: 'success',
          props: {
            title: translate('Update review successfully'),
          },
        });
        setIsLoading(false);
      }
    } catch (error) {
      console.log('update review  ~ error', error);
      setIsLoading(false);
      Toast.show({
        type: 'error',
        props: {
          title: translate('Update review failed'),
        },
      });
    }
  };

  const renderStudentEvaluation = ({item}) => (
    <View style={styles.studentContainer}>
      <TouchableOpacity
        onPress={() => {
          toggleStudentExpand(item.id);
        }}>
        <Text style={styles.studentName}>
          {item.id} - {item.name}
        </Text>
      </TouchableOpacity>
      {expandedStudents[item.id] && (
        <TextInput
          multiline
          style={styles.inputStudent}
          placeholder={translate('Enter evaluate for') + ` ${item.name}`}
          value={studentEvaluations[item.id] || ''}
          onChangeText={content => handleEvaluationChange(item.id, content)}
          textAlignVertical="top"
        />
      )}
    </View>
  );

  return (
    <Container>
      {isLoading && <Loading />}
      <Header title={translate('Evaluate the session')} />
      <KeyboardAwareScrollView
        style={styles.container}
        extraScrollHeight={-hp(30)}>
        <Text style={styles.label}>{translate('Time')}</Text>
        <Datepicker
          style={{color: 'black'}}
          max={new Date(2055, 0, 1)}
          min={new Date(1900, 0, 1)}
          date={date}
          onSelect={nextDate => setDate(nextDate)}
          placeholder={translate('Select date')}
          accessoryRight={<DatePickerIcon />}
        />
        <Text style={styles.label}>{translate('Title')}</Text>
        <TextInput
          multiline={true}
          numberOfLines={3}
          value={title}
          onChangeText={setTitle}
          scrollEnabled
          textAlignVertical="top"
          style={{
            borderWidth: 1,
            height: 70,
            color: colors.text,
            borderColor: colors.PRIMARY[700],
            paddingHorizontal: 10,
          }}
        />

        <Text style={styles.label}>{translate('Content of session')}</Text>
        <TextInput
          multiline={true}
          numberOfLines={4}
          value={lessonContent}
          onChangeText={setLessonContent}
          scrollEnabled
          style={{
            borderWidth: 1,
            height: 100,
            color: colors.text,
            borderColor: colors.PRIMARY[700],
            paddingHorizontal: 10,
          }}
          textAlignVertical="top"
        />

        <Text style={styles.label}>{translate('Overall assessment')}</Text>
        <TextInput
          multiline={true}
          numberOfLines={4}
          value={generalContent}
          onChangeText={setGeneralContent}
          scrollEnabled
          style={{
            borderWidth: 1,
            height: 100,
            color: colors.text,
            borderColor: colors.PRIMARY[700],
            paddingHorizontal: 10,
          }}
          textAlignVertical="top"
        />

        <View style={styles.evaluateContainer}>
          <Text style={styles.label}>{translate('Evaluate student')}</Text>
          <FlatList
            data={students}
            renderItem={renderStudentEvaluation}
            keyExtractor={item => item.id}
          />
        </View>
      </KeyboardAwareScrollView>

      {type === EVALUATE_TYPE.ADD ? (
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.titleButton}>{translate('Add')}</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.buttonContainer}>
          {/* <TouchableOpacity style={styles.deleteButton}>
            <Text style={styles.titleButton}>{translate('Delete')}</Text>
          </TouchableOpacity> */}
          <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
            <Text style={styles.titleButton}>{translate('Update')}</Text>
          </TouchableOpacity>
        </View>
      )}
    </Container>
  );
};

const makeStyle = colors =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: wp(2),
      paddingTop: 20,
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 8,
      borderBottomWidth: 1,
      borderColor: colors.PRIMARY[500],
    },
    headerCell: {
      fontWeight: 'bold',
      flex: 2,
      textAlign: 'center',
      color: colors.text,
    },
    cell: {
      flex: 2,
      textAlign: 'center',
      color: colors.text,
    },
    label: {
      color: colors.text,
      fontWeight: '500',
      fontSize: 17,
      marginBottom: 5,
      marginTop: 10,
    },
    addButton: {
      backgroundColor: colors.SEMANTIC.SUCCESS[500],
      paddingVertical: 10,
      alignItems: 'center',
      marginVertical: 5,
      borderRadius: 15,
      marginVertical: wp(2),
      paddingHorizontal: wp(5),
    },
    updateButton: {
      backgroundColor: colors.SEMANTIC.SUCCESS[500],
      paddingVertical: 10,
      alignItems: 'center',
      borderRadius: 15,
      paddingHorizontal: wp(5),
      marginHorizontal: wp(2),
      flex: 1,
    },
    deleteButton: {
      backgroundColor: colors.SEMANTIC.ERROR[500],
      paddingVertical: 10,
      alignItems: 'center',
      borderRadius: 15,
      marginHorizontal: wp(2),
      paddingHorizontal: wp(5),
      flex: 1,
    },
    titleButton: {
      color: colors.text,
      fontSize: 16,
      fontWeight: '600',
    },
    buttonContainer: {
      flexDirection: 'row',
      marginVertical: 7,
    },
    bottomContainer: {},
    studentContainer: {
      marginBottom: 16,
      backgroundColor: colors.NEUTRAL[500],
      paddingVertical: 10,
      paddingHorizontal: 10,
    },
    studentName: {
      fontWeight: '400',
      fontSize: 16,
      color: colors.text,
    },
    evaluateContainer: {},
    inputStudent: {
      backgroundColor: colors.PRIMARY[100],
      borderWidth: 1,
      borderColor: colors.PRIMARY[500],
      marginTop: 5,
      paddingHorizontal: 10,
      height: 70,
    },
  });
