const {useSelector} = require('react-redux');

const themeMode = useSelector(state => state.settings.themeMode);

export const IMAGE_BACKGROUND_LINK =
  themeMode === 'light'
    ? '@assets/images/light-background.jpg'
    : '@assets/images/dark-background.jpg';
