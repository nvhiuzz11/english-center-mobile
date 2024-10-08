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
  KeyboardAvoidingView,
  Animated,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {MainHeader} from '@components/mainHeader';
import {hp, wp} from '@utils/responsive';
import {CourseItem} from './components/courseItem';
import {Header} from '@components/header';
import {SCREEN_NAME} from '@constants/navigation';
import {setLanguage, setThemeMode} from '@store/reducers/setting';
import {InputApp} from '@components/input';
import {SearchIcon} from '@assets/icons/searchIcon';
import {FilterHomeIcon} from '@assets/icons/filterHomeIcon';
import {translate} from '@locales';
import {DrawerLayout} from 'react-native-gesture-handler';
import {ModalFilterClass} from './components/ModalFilterClass';
import {Loading} from '@components/loading';
import Toast from 'react-native-toast-message';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {ExpandingDot} from 'react-native-animated-pagination-dots';
import {CenterItem} from './components/centerItem';
import {useAuxios} from '@src/app/hook';
import {ModalDelete} from '@components/modalDelete';
import {CLASS_STATUS} from '@constants/user';
import {ModalSelectStudent} from '@screens/registerClass/components/modalSelectStudent';
import {
  formatDateFromISO,
  formatMoney,
  removeVietnameseTones,
} from '@utils/input';
import MapView, {Marker} from 'react-native-maps';
import {getCoordinatesFromAddress} from '@utils/map';
import Geolocation from '@react-native-community/geolocation';
import {getDistance} from 'geolib';

export const HomeScreen = props => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {colors} = useTheme();
  const styles = makeStyle(colors);

  const isLogin = useSelector(state => state.app.isLogin);
  const {accountInfo} = useSelector(state => state.account);

  const refModalFilterClass = useRef(null);
  const {publicAxios} = useAuxios();
  const isFocused = useIsFocused();

  const [classes, setClasses] = useState([]);
  const [filteredClasses, setFilteredClasses] = useState([]);
  const [centers, setCenters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [searchKey, setSearchKey] = useState('');

  const [selectedCenterIndex, setSelectedCenterIndex] = useState(null);
  const [selectedAgeFrom, setSelectedAgeFrom] = useState(null);
  const [selectedAgeTo, setSelectedAgeTo] = useState(null);
  const [selectedFromDate, setSelectedFromDate] = useState(null);
  const [selectedToDate, setSelectedToDate] = useState(null);
  const [selectedFromFee, setSelectedFromFee] = useState(null);
  const [selectedToFee, setSelectedToFee] = useState(null);
  const [isDiscountChecked, setIsDiscountChecked] = useState(false);

  const [centerCoordinates, setCenterCoordinates] = useState([]);

  const [currentCoordinate, setCurrentCoordinate] = useState(null);

  const [addressCoordinate, setAddressCoordinate] = useState(null);

  const getAddressCoordiante = async () => {
    const coordinates = await getCoordinatesFromAddress(accountInfo.address);
    setAddressCoordinate(coordinates);
  };
  useEffect(() => {
    if (isLogin) {
      getAddressCoordiante();
    }
  }, []);

  useEffect(() => {
    if (filteredClasses) {
      console.log('filteredClasses', filteredClasses);
    }
  }, [filteredClasses]);

  useEffect(() => {
    if (isFocused) {
      fetchClasses();
    }
  }, [isFocused]);

  useEffect(() => {
    if (isFocused) {
      fetchCenter();
    }
  }, [isFocused]);

  useEffect(() => {
    if (isFocused) {
      getCurrentPosition();
    }
  }, [isFocused]);

  const fetchClasses = async () => {
    try {
      const response = await publicAxios.get('api/class', {
        params: {
          status: CLASS_STATUS.COMMING,
          includeTeacher: true,
          includeCenter: true,
          includeProgram: true,
          includeSchedule: true,
        },
      });
      console.log('fetchClasses res :', response.data);
      setClasses(response.data.docs);
      setIsLoading(false);
    } catch (error) {
      console.error('fetchClasses error', error);
    }
  };

  const fetchCenter = async () => {
    try {
      const res = await publicAxios.get('api/centers');
      setCenters(res.data.docs);
      setIsLoading(false);
    } catch (error) {
      console.error('fetchCenter error', error);
    }
  };

  useEffect(() => {
    console.log('classes', classes);
    console.log('centers', centers);
  }, [classes]);

  useEffect(() => {
    if (classes) {
      setFilteredClasses(
        classes.filter(item => {
          let matchAge = true;

          if (selectedAgeFrom && selectedAgeTo) {
            matchAge =
              Number(selectedAgeFrom) <= item.fromAge &&
              item.fromAge <= Number(selectedAgeTo);
          }
          let matchDate = true;
          if (selectedFromDate && selectedToDate) {
            matchDate =
              item.startAt >= selectedFromDate &&
              item.startAt <= selectedToDate;
          }

          let matchFee = true;

          if (selectedFromFee && selectedToFee) {
            matchFee =
              item.fee >= Number(selectedFromFee) &&
              item.fee <= Number(selectedToFee);
          }

          let matcDiscount = true;
          if (isDiscountChecked) {
            matcDiscount = item.program !== null;
          } else {
            matcDiscount = true;
          }

          let matchCenter = true;
          if (selectedCenterIndex) {
            matchCenter = selectedCenterIndex === item.centerId;
          }

          const matchSearchKey =
            item.centerId.toString().includes(searchKey) ||
            item.code.toString().includes(searchKey) ||
            item.name.toLowerCase().includes(searchKey) ||
            removeVietnameseTones(item.name.toLowerCase()).includes(
              searchKey.toLowerCase(),
            ) ||
            item.teachers[0]?.name.toLowerCase().includes(searchKey) ||
            item.totalSession.toString().includes(searchKey) ||
            formatDateFromISO(item.startAt).toString().includes(searchKey) ||
            formatMoney(item.fee).toString().includes(searchKey);

          return (
            matchSearchKey &&
            matchAge &&
            matchDate &&
            matchFee &&
            matcDiscount &&
            matchCenter
          );
        }),
      );
    }
  }, [
    classes,
    searchKey,
    selectedCenterIndex,
    selectedAgeFrom,
    selectedAgeTo,
    selectedFromDate,
    selectedToDate,
    selectedFromFee,
    selectedToFee,
    isDiscountChecked,
  ]);

  useEffect(() => {
    if (centers && currentCoordinate) {
      getCoordinatesForCenters();
    }
  }, [centers, currentCoordinate]);

  const getCoordinatesForCenters = async () => {
    let compareCoordinate;
    if (isLogin) {
      compareCoordinate = addressCoordinate;
    } else {
      compareCoordinate = currentCoordinate;
    }

    const results = await Promise.all(
      centers.map(async center => {
        const coordinates = await getCoordinatesFromAddress(center.address);
        if (coordinates) {
          //  const distanceFromA = haversineDistance(pointA, {
          //    latitude: coordinates.lat,
          //    longitude: coordinates.lng,

          //  });
          const distanceFromA = getDistance(
            {
              latitude: compareCoordinate.lat,
              longitude: compareCoordinate.lng,
            },
            {
              latitude: coordinates.lat,
              longitude: coordinates.lng,
            },
            0.01,
          );

          return {
            ...center,
            coordinates,
            distanceFromA,
          };
        }
        return center;
      }),
    );

    const sortedResults = results.sort(
      (a, b) => a.distanceFromA - b.distanceFromA,
    );

    console.log('sortedResults', sortedResults);

    setCenterCoordinates(sortedResults);
  };

  const getCurrentPosition = () => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        console.log('cur', latitude, longitude);
        setCurrentCoordinate({
          lat: latitude,
          lng: longitude,
        });
      },
      error =>
        Alert.alert(
          'Error',
          'You are denying access to location services. Please allow permission to continue using the application',
          [
            {text: 'OK'},
            {text: 'Go to settings', onPress: () => Linking.openSettings()},
          ],
        ),
    );
  };

  const renderClassItem = ({item, index}) => {
    return <CourseItem courseData={item} onPressCource={onPressCource} />;
  };

  const renderCenterItem = ({item, index}) => {
    return <CenterItem centerData={item} onPressCenter={onPressCenter} />;
  };

  const renderAccessoryRightSearchInput = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          refModalFilterClass.current.open();
        }}>
        <FilterHomeIcon
          color={colors.PRIMARY[100]}
          bgColor={colors.PRIMARY[800]}
        />
      </TouchableOpacity>
    );
  };

  const onPressCource = courseData => {
    navigation.navigate(SCREEN_NAME.REGISTER_CLASS, {
      payload: {courseData: courseData},
    });
  };
  const onPressCenter = centerData => {
    navigation.navigate(SCREEN_NAME.CLASS_OF_CENTER, {
      payload: {centerData: centerData},
    });
  };

  const onApplyFilter = (
    selectedCenterIndex,
    selectedAgeFrom,
    selectedAgeTo,
    selectedFromDate,
    selectedToDate,
    selectedFromFee,
    selectedToFee,
    isDiscountChecked,
  ) => {
    setSelectedCenterIndex(selectedCenterIndex);
    setSelectedAgeFrom(selectedAgeFrom);
    setSelectedAgeTo(selectedAgeTo);
    setSelectedFromDate(selectedFromDate);
    setSelectedToDate(selectedToDate);
    setSelectedFromFee(selectedFromFee);
    setSelectedToFee(selectedToFee);
    setIsDiscountChecked(isDiscountChecked);
  };

  const onReset = () => {
    setSelectedCenterIndex(null);
    setSelectedAgeFrom(null);
    setSelectedAgeTo(null);
    setSelectedFromDate(null);
    setSelectedToDate(null);
    setSelectedFromFee(null);
    setSelectedToFee(null);
    setIsDiscountChecked(null);
  };

  const [index, setIndex] = React.useState(0);
  const isCarousel = React.useRef(null);
  return (
    <Container>
      {isLoading && <Loading />}
      <MainHeader />
      <ScrollView style={styles.container}>
        <View style={styles.classContainer}>
          <Text style={[styles.header, {marginBottom: 15}]}>
            {translate('List of centers near you')}
          </Text>

          {centerCoordinates.length > 0 && (
            <>
              <Carousel
                data={centerCoordinates}
                renderItem={renderCenterItem}
                sliderWidth={wp(95)}
                itemWidth={wp(80)}
                activeSlideOffset={20}
                ref={isCarousel}
                onSnapToItem={index => setIndex(index)}
              />

              <Pagination
                dotsLength={centerCoordinates?.length}
                activeDotIndex={index}
                carouselRef={isCarousel}
                dotStyle={{
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  marginHorizontal: 0,
                  backgroundColor: colors.PRIMARY[800],
                }}
                inactiveDotOpacity={0.4}
                inactiveDotScale={0.6}
                tappableDots={true}
              />
            </>
          )}
        </View>

        <View>
          <Text style={styles.header}>
            {translate('Class list is about to open')}
          </Text>
          <View style={styles.columnContainer}>
            <InputApp
              style={styles.searchInput}
              textStyle={styles.searchText}
              placeholder={translate('Enter search key')}
              accessoryLeft={<SearchIcon color={colors.PRIMARY[900]} />}
              accessoryRight={renderAccessoryRightSearchInput}
              onChangeText={text => setSearchKey(text)}
              value={searchKey}
            />
          </View>
          {classes.length > 0 && filteredClasses.length > 0 && (
            <Carousel
              data={filteredClasses}
              renderItem={renderClassItem}
              sliderWidth={wp(95)}
              itemWidth={wp(80)}
              activeSlideOffset={20}
              loop={true}
              autoplay={true}
              autoplayDelay={1000}
              autoplayInterval={3000}
              activeAnimationType="spring"
            />
          )}

          {filteredClasses.length < 1 && classes.length > 0 && (
            <Text
              style={[
                styles.title,
                {fontStyle: 'italic', marginHorizontal: wp(2)},
              ]}>
              {translate('There are no class as per your request')}
            </Text>
          )}
        </View>

        <View style={styles.mapContainer}>
          <Text
            style={[
              styles.header,
              {
                marginBottom: 10,
                justifyContent: 'center',
                alignItems: 'center',
              },
            ]}>
            {translate('Location of centers')}{' '}
            <TouchableOpacity
              style={{justifyContent: 'center'}}
              onPress={() => {
                navigation.navigate(SCREEN_NAME.MAP);
              }}>
              <Text style={styles.hyperlink}>{translate('See details')}</Text>
            </TouchableOpacity>
          </Text>
          <MapView
            style={{
              height: hp(50),
              width: wp(100),
              borderColor: 'red',
              borderWidth: 1,
            }}
            initialRegion={{
              // latitude: currentCoordinate.lat,
              // longitude: currentCoordinate.log,

              latitude: 21.046597,
              longitude: 105.843721,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.05,
            }}
            showsCompass
            showsMyLocationButton
            showsUserLocation
            toolbarEnabled>
            {centerCoordinates.map(
              center =>
                center.coordinates && (
                  <Marker
                    key={center.id}
                    coordinate={{
                      latitude: center.coordinates.lat,
                      longitude: center.coordinates.lng,
                    }}
                    title={`${center.name} (${(
                      center.distanceFromA / 1000
                    ).toFixed(2)} km)`}
                    description={center.address}
                  />
                ),
            )}

            {currentCoordinate && (
              <Marker
                key={'currentCoordinate'}
                title="Vị trí của bạn"
                coordinate={{
                  latitude: currentCoordinate.lat,
                  longitude: currentCoordinate.lng,
                }}
                pinColor={'wheat'}
              />
            )}

            {addressCoordinate && (
              <Marker
                key={'addressCoordinate'}
                title="Địa chỉ của bạn"
                coordinate={{
                  latitude: addressCoordinate.lat,
                  longitude: addressCoordinate.lng,
                }}
                pinColor={'green'}
              />
            )}
          </MapView>
        </View>
      </ScrollView>
      <ModalFilterClass
        ref={refModalFilterClass}
        centers={centers}
        onApplyFilter={onApplyFilter}
        onReset={onReset}
      />
      <ModalDelete />

      <View style={{paddingBottom: hp(2)}}></View>
    </Container>
  );
};

const makeStyle = colors =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: wp(2),
    },
    classContainer: {
      marginTop: 30,
    },
    columnContainer: {
      backgroundColor: colors.NEUTRAL[50],
      marginTop: 15,
      paddingBottom: 10,
    },
    header: {
      fontSize: 22,
      color: colors.SECONDARY[800],
      fontWeight: '700',
      textAlign: 'center',
    },
    paginationContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: hp(2),
    },
    dot: {
      width: wp(2),
      height: wp(2),
      borderRadius: wp(1),
      marginHorizontal: wp(1),
    },
    activeDot: {
      backgroundColor: colors.NEUTRAL[100],
    },
    inactiveDot: {
      backgroundColor: colors.PRIMARY[500],
    },
    searchInput: {
      marginHorizontal: 10,
      borderRadius: 15,
      marginTop: 10,
      borderColor: colors.PRIMARY[500],
      backgroundColor: colors.PRIMARY[100],
    },
    searchText: {
      color: colors.text,
    },
    mapContainer: {
      height: hp(40),
      width: wp(100),
      marginTop: 30,
    },
    hyperlink: {
      // marginLeft: 5,
      fontWeight: '800',
      color: colors.SECONDARY[600],
      fontSize: 13,
      textDecorationLine: 'underline',
    },
  });
