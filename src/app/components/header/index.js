// import React, {Component} from 'react';
// import {Text, TopNavigation, Divider} from '@ui-kitten/components';
// import {StyleSheet, TouchableOpacity, View} from 'react-native';
// import {wp} from '@utils/index';
// import PropTypes from 'prop-types';
// import {TEXT_STYLES} from '@constants/index'; //
// import {useNavigation, useTheme} from '@react-navigation/native';
// import {useMode} from '@hooks/useMode';
// import {TextStyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';
// import {BackIcon} from '@assets/icons/BackIcon';

// interface HeaderProps {
//   title: String;
//   subtitle: String;
//   titleIcon: String;
//   isHideDivider: Boolean;
//   titleTextStyle: TextStyleProp;
//   backIconColor: String;
//   hideDefaultAccessoryLeft: Boolean;
//   accessoryLeft: Component;
//   titleMore: String;
//   titleMoreStyle: TextStyleProp;
//   isLimitLineNumber: Boolean;
//   accessoryRight: Component;
// }

// export const Header: React.FC<HeaderProps> = React.memo(props => {
//   const {colors} = useTheme();
//   const {isDarkMode} = useMode();

//   const {
//     title,
//     subtitle,
//     titleIcon,
//     isHideDivider,
//     titleTextStyle,
//     backIconColor = !isDarkMode ? undefined : colors.NEUTRAL[900],
//     hideDefaultAccessoryLeft,
//     accessoryLeft,
//     titleMore, // short title in the right title
//     titleMoreStyle = {},
//     isLimitLineNumber,
//     accessoryRight,
//   } = props;
//   const navigation = useNavigation();
//   const styles = makeStyles(colors);

//   const renderDefaultLeftAction = () => {
//     const onPress = () => {
//       navigation?.canGoBack() && navigation?.goBack();
//     };

//     if (!navigation?.canGoBack()) {
//       return null;
//     }

//     if (hideDefaultAccessoryLeft) {
//       return null;
//     }
//     return (
//       <TouchableOpacity onPress={onPress} style={styles.backIconContainer}>
//         <BackIcon />
//       </TouchableOpacity>
//     );
//   };

//   return (
//     <React.Fragment>
//       <TopNavigation
//         {...props}
//         style={[styles.container, props.style]}
//         title={titleProps => (
//           <View style={styles.titleContainer}>
//             {titleIcon && <View style={styles.titleIcon}>{titleIcon}</View>}
//             <Text
//               {...titleProps}
//               style={[
//                 styles.titleText,
//                 titleTextStyle,
//                 isLimitLineNumber && {
//                   maxWidth: wp(70),
//                 },
//               ]}
//               numberOfLines={isLimitLineNumber ? 1 : null}
//               ellipsizeMode="middle">
//               {title}
//             </Text>
//             {titleMore ? (
//               <Text style={[styles.titleMore, titleMoreStyle]}>
//                 {titleMore}
//               </Text>
//             ) : null}
//           </View>
//         )}
//         subtitle={
//           subtitle
//             ? subtitleProps => (
//                 <Text {...subtitleProps} style={styles.subtitleText}>
//                   {subtitle}
//                 </Text>
//               )
//             : null
//         }
//         accessoryLeft={accessoryLeft || renderDefaultLeftAction}
//         accessoryRight={accessoryRight || null}
//       />
//       {isHideDivider === false && !isDarkMode && <Divider />}
//     </React.Fragment>
//   );
// });

// Header.propTypes = {
//   alignment: PropTypes.string,
//   title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
//   titleIcon: PropTypes.element,
//   subtitle: PropTypes.string,
//   hideDefaultAccessoryLeft: PropTypes.bool,
//   accessoryLeft: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
//   accessoryRight: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
//   isHideDivider: PropTypes.bool,
//   backIconColor: PropTypes.string,
//   titleTextStyle: PropTypes.object,
//   isLimitLineNumber: PropTypes.bool,
// };
// Header.defaultProps = {
//   alignment: 'center',
//   isHideDivider: true,
//   hideDefaultAccessoryLeft: false,
//   isLimitLineNumber: false,
// };
// const makeStyles = colors =>
//   StyleSheet.create({
//     container: {
//       backgroundColor: 'transparent',
//     },
//     titleContainer: {
//       flexDirection: 'row',
//       alignItems: 'center',
//     },
//     titleText: {
//       ...TEXT_STYLES.H4,
//       fontSize: moderateScale(18),
//       color: colors.NEUTRAL[900],
//       fontWeight: '700',
//     },
//     subtitleText: {
//       ...TEXT_STYLES.CAPTION_LARGE,
//       color: colors.NEUTRAL[800],
//     },
//     titleIcon: {
//       marginRight: 5,
//     },
//     titleMore: {
//       marginLeft: 4,
//       ...TEXT_STYLES.BODY_MEDIUM,
//       color: colors.NEUTRAL[500],
//     },
//     backIconContainer: {
//       padding: 6,
//       borderWidth: 2,
//       backgroundColor: colors.NEUTRAL[1000],
//       borderRadius: 36,
//     },
//   });
