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
import MapView, {Marker, Polyline} from 'react-native-maps';
import {
  convertMetersToKilometers,
  getCoordinatesFromAddress,
  getRoute,
} from '@utils/map';
import Geolocation from '@react-native-community/geolocation';
import {getDistance} from 'geolib';
import {ChangeTypeIcon} from '@assets/icons/changeType';

export const MapScreen = props => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {colors} = useTheme();
  const styles = makeStyle(colors);

  const isLogin = useSelector(state => state.app.isLogin);
  const {accountInfo} = useSelector(state => state.account);

  const {publicAxios} = useAuxios();
  const isFocused = useIsFocused();

  const [classes, setClasses] = useState([]);
  const [centers, setCenters] = useState([]);

  const [centerCoordinates, setCenterCoordinates] = useState([]);

  const [currentCoordinate, setCurrentCoordinate] = useState(null);

  const [addressCoordinate, setAddressCoordinate] = useState(null);

  const [mapType, setMapType] = useState('standard');

  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [distance, setDistance] = useState(0);

  const [selectedCenter, setSelectedCenter] = useState(null);

  const handleMarkerPress = async center => {
    setSelectedCenter(center);
    const startCoords = isLogin ? addressCoordinate : currentCoordinate;
    const endCoords = center.coordinates;

    if (startCoords) {
      const {routeCoordinates, distance} = await getRoute(
        startCoords,
        endCoords,
      );
      setRouteCoordinates(routeCoordinates);
      setDistance(distance);
    } else {
      Alert.alert('Vị trí không xác định', 'Không thể lấy vị trí của bạn.');
    }
  };

  //    const fetchRoute = async () => {
  //      const startCoords = {lat: 21.046597, lng: 105.843721};
  //      const endCoords = {lat: 21.022732, lng: 105.80858};
  //      const {routeCoordinates, distance} = await getRoute(
  //        startCoords,
  //        endCoords,
  //      );
  //      setRouteCoordinates(routeCoordinates);
  //      setDistance(distance);
  //    };
  //    fetchRoute();

  const toggleMapType = () => {
    if (mapType === 'standard') {
      setMapType('satellite');
    } else if (mapType === 'satellite') {
      setMapType('hybrid');
    } else {
      setMapType('standard');
    }
  };

  const getAddressCoordiante = async () => {
    const coordinates = await getCoordinatesFromAddress(accountInfo.address);
    setAddressCoordinate(coordinates);
  };
  useEffect(() => {
    if (isLogin) {
      getAddressCoordiante();
    } else {
      setAddressCoordinate([]);
    }
  }, []);

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
    } catch (error) {
      console.error('fetchClasses error', error);
    }
  };

  const fetchCenter = async () => {
    try {
      const res = await publicAxios.get('api/centers');
      setCenters(res.data.docs);
    } catch (error) {
      console.error('fetchCenter error', error);
    }
  };

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

  return (
    <Container>
      <Header title={translate('Location of centers')} />
      <View style={styles.container}>
        {currentCoordinate && addressCoordinate && (
          <MapView
            style={{
              flex: 1,
            }}
            mapType={mapType}
            region={{
              // c: currentCoordinate.lat,
              // longitude: currentCoordinate.log,
              latitude: 21.046597,
              longitude: 105.843721,
              //   latitude: isLogin ? addressCoordinate.lat : currentCoordinate.lat,
              //   longitude: isLogin
              //     ? addressCoordinate.lng
              //     : currentCoordinate.lng,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.05,
            }}
            showsCompass={true}
            showsMyLocationButton
            showsUserLocation={true}
            toolbarEnabled
            onPress={() => {
              setRouteCoordinates([]);
              setDistance(0);
            }}>
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
                    onPress={() => handleMarkerPress(center)}
                  />
                ),
            )}
            {currentCoordinate && (
              <Marker
                key={'currentCoordinate'}
                title={'Vị trí của bạn'}
                coordinate={{
                  latitude: currentCoordinate.lat,
                  longitude: currentCoordinate.lng,
                }}
                pinColor={'wheat'}
              />
            )}

            {addressCoordinate && isLogin && (
              <Marker
                key={'addressCoordinate'}
                title={'Địa chỉ của bạn'}
                coordinate={{
                  latitude: addressCoordinate.lat,
                  longitude: addressCoordinate.lng,
                }}
                pinColor={'green'}
              />
            )}
            {routeCoordinates && (
              <Polyline
                coordinates={routeCoordinates.map(coord => ({
                  latitude: coord[1],
                  longitude: coord[0],
                }))}
                strokeWidth={4}
                strokeColor="blue"
              />
            )}
          </MapView>
        )}

        <TouchableOpacity style={styles.changeButton} onPress={toggleMapType}>
          <ChangeTypeIcon />
        </TouchableOpacity>

        <Text style={styles.distanceText}>
          {`Khoảng cách đường đi: ${convertMetersToKilometers(distance)} km`}
        </Text>
      </View>

      <View style={{paddingBottom: hp(2)}}></View>
    </Container>
  );
};

const makeStyle = colors =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    changeButton: {
      position: 'absolute',
      top: hp(10),
      right: wp(2),
      backgroundColor: 'rgba(255,255,255,0.5)',
      padding: 10,
    },
    distanceText: {
      position: 'absolute',
      bottom: 20,
      left: 10,
      backgroundColor: 'white',
      padding: 10,
      borderRadius: 5,
      elevation: 5,
    },
  });
