import React from 'react';
import {Input as I, InputProps} from '@ui-kitten/components';
import {StyleSheet, View, Text, StyleProp} from 'react-native';
import {hp} from '@utils/responsive';
import {useTheme} from '@react-navigation/native';
import PropTypes from 'prop-types';
import {CAPTION_TYPE} from '@constants/input';

interface InputAppProps {
  style: StyleProp;
  textStyle: StyleProp;
  labelStyle: StyleProp;
  caption: String;
  captionType?: String;
}

export const InputApp: React.FC<InputProps & InputAppProps> = React.forwardRef(
  (props, ref) => {
    const {style, textStyle, labelStyle, caption, captionType} = props;
    const refInput = ref;
    const {colors} = useTheme();
    const styles = makeStyles(colors);

    const renderCaption = () => {
      if (caption) {
        switch (captionType) {
          case CAPTION_TYPE.ERROR:
            return (
              <View>
                <Text
                  style={[
                    styles.textCaption,
                    {color: colors.SEMANTIC.ERROR[500]},
                  ]}>
                  {/* {caption} */}
                </Text>
              </View>
            );
          case CAPTION_TYPE.WARNING:
            return (
              <View>
                <Text
                  style={[
                    styles.textCaption,
                    {color: colors.SEMANTIC.WARNING[500]},
                  ]}>
                  {/* {caption} */}
                </Text>
              </View>
            );

          default:
            return (
              <View>
                <Text
                  style={[
                    styles.textCaption,
                    {color: colors.SEMANTIC.SUCCESS[500]},
                  ]}>
                  {/* {caption} */}
                </Text>
              </View>
            );
        }
      }
      return null;
    };
    return (
      <I
        ref={refInput}
        style={[styles.styleInput, {...style}]}
        textStyle={[
          styles.textStyle,
          {...textStyle},
          props.editable ? {} : {color: colors.NEUTRAL[500]},
        ]}
        caption={renderCaption}
        styleLabel={[styles.labelStyle, {...labelStyle}]}
        editable={!props.editable && !props.disabled}
        {...props}
      />
    );
  },
);

InputApp.propTypes = {
  value: PropTypes.string,
  onchangeText: PropTypes.func,
  styles: PropTypes.object,
  textStyle: PropTypes.object,
  isError: PropTypes.bool,
  caption: PropTypes.string,
  captionType: PropTypes.string,
  editable: PropTypes.bool,
};

InputApp.defaultProps = {
  editable: true,
};

const makeStyles = colors =>
  StyleSheet.create({
    styleInput: {
      height: 10,
      marginBottom: hp(2),
      borderRadius: 10,
    },
    textStyle: {
      fontSize: 16,
      fontWeight: '500',
      lineHeight: 20,
      color: '#0f0f0f',
      paddingVertical: 5,
    },
    textCaption: {
      fontSize: 30,
      lineHeight: 16,
      fontWeight: '500',
    },
    labelStyle: {
      fontWeight: '600',
      fontSize: 14,
      lineHeight: 16,
      marginBottom: 6,
      color: colors.PRIMARY[900],
    },
  });
