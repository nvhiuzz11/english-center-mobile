import axios from 'axios';

const MAPBOX_ACCESS_TOKEN =
  'pk.eyJ1IjoiaGl1enoxMSIsImEiOiJjbTBhcmt2M20wMHc4MmtwdHNsdnBraDJxIn0.vK4Alf2YsKn2uGfwFYc_6w';

/**
 * Hàm tìm kiếm tọa độ cho một địa chỉ
 * @param {string} address - Địa chỉ cần tìm tọa độ
 * @returns {Promise<Object>} - Trả về tọa độ {lat, lng}
 */
export const getCoordinatesFromAddress = async address => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address,
  )}.json`;

  try {
    const response = await axios.get(url, {
      params: {
        access_token: MAPBOX_ACCESS_TOKEN,
        limit: 1,
      },
    });

    if (response.data.features.length > 0) {
      const {center} = response.data.features[0];
      return {
        lat: center[1],
        lng: center[0],
      };
    } else {
      console.error('Không tìm thấy tọa độ cho địa chỉ:', address);
      return null;
    }
  } catch (error) {
    console.error('Lỗi khi gọi API Mapbox:', error);
    return null;
  }
};

export const convertMetersToKilometers = meters => {
  const kilometers = meters / 1000;
  return kilometers.toFixed(2); // Format to 2 decimal places
};

export const getRoute = async (startCoords, endCoords) => {
  const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${startCoords.lng},${startCoords.lat};${endCoords.lng},${endCoords.lat}?geometries=geojson&access_token=${MAPBOX_ACCESS_TOKEN}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log('getRoute', data);

    const routeCoordinates = data.routes[0].geometry.coordinates;
    const distance = data.routes[0].distance;

    return {routeCoordinates, distance};
  } catch (error) {
    console.error(error);
  }
};
