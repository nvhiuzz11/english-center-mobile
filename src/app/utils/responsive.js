import {PixelRatio, Dimensions} from 'react-native';

const {height, width} = Dimensions.get('window');

export const wp = widthPercent => {
  const elemWidth =
    typeof widthPercent === 'number' ? widthPercent : parseFloat(widthPercent);
  return PixelRatio.getFontScale() >= 1
    ? PixelRatio.roundToNearestPixel((width * elemWidth) / 100)
    : Math.round(
        ((width * elemWidth) / 100) * Math.round(PixelRatio.getFontScale()),
      );
};

export const hp = heightPercent => {
  const elemHeight =
    typeof heightPercent === 'number'
      ? heightPercent
      : parseFloat(heightPercent);
  return PixelRatio.getFontScale() >= 1
    ? PixelRatio.roundToNearestPixel((height * elemHeight) / 100)
    : Math.round(
        ((height * elemHeight) / 100) * Math.round(PixelRatio.getFontScale()),
      );
};
