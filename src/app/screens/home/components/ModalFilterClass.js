import {ResetFilterIcon} from '@assets/icons/resetFilterIcon';
import {translate} from '@locales';
import {useTheme} from '@react-navigation/native';
import {
  Datepicker,
  Radio,
  RadioGroup,
  Select,
  SelectItem,
} from '@ui-kitten/components';
import {isIos} from '@utils/device';
import {hp, wp} from '@utils/responsive';
import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Modalize} from 'react-native-modalize';
import {Portal} from 'react-native-portalize';

export const ModalFilterClass = React.forwardRef((props, ref) => {
  const {colors} = useTheme();
  const styles = makeStyle(colors);

  return (
    <Portal>
      <Modalize
        ref={ref}
        modalHeight={hp(72)}
        withHandle={false}
        modalStyle={styles.modalize}
        childrenStyle={{marginBottom: 20}}
        avoidKeyboardLikeIOS={true}
        keyboardAvoidingBehavior={isIos ? undefined : 'height'}
        HeaderComponent={
          <View style={styles.header}>
            <View style={styles.indicator} />
            <Text style={styles.title}>{translate('Filter class')}</Text>
          </View>
        }
        FooterComponent={
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.applyButton}>
              <Text style={styles.buttonTitle}>
                {translate('Aplly filter')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.resetButton}>
              <ResetFilterIcon color={colors.text} />
            </TouchableOpacity>
          </View>
        }>
        <View style={styles.container}>
          <View style={styles.containerField}>
            <View style={styles.row}>
              <Text style={styles.fieldTitle}>{translate('Age')}</Text>
              <RadioGroup style={styles.radioGroup}>
                <Radio style={styles.radio}>{translate('Increase')}</Radio>
                <Radio style={styles.radio}>{translate('Decrease')}</Radio>
              </RadioGroup>
            </View>
            <View style={styles.row}>
              <Text style={styles.subscription}>{translate('From')}</Text>
              <Select style={styles.select} size="small">
                <SelectItem title="1" />
                <SelectItem title="2" />
                <SelectItem title="3" />
                <SelectItem title="4" />
                <SelectItem title="5" />
                <SelectItem title="6" />
                <SelectItem title="7" />
                <SelectItem title="8" />
              </Select>
              <Text style={styles.subscription}>{translate('To')}</Text>
              <Select style={styles.select} size="small">
                <SelectItem title="1" />
                <SelectItem title="2" />
                <SelectItem title="3" />
                <SelectItem title="4" />
                <SelectItem title="5" />
                <SelectItem title="6" />
                <SelectItem title="7" />
                <SelectItem title="8" />
              </Select>
            </View>
          </View>

          <View style={styles.containerField}>
            <View style={styles.row}>
              <Text style={styles.fieldTitle}>{translate('Time start')}</Text>
              <RadioGroup style={styles.radioGroup}>
                <Radio style={styles.radio}>{translate('Increase')}</Radio>
                <Radio style={styles.radio}>{translate('Decrease')}</Radio>
              </RadioGroup>
            </View>
            <View style={styles.row}>
              <Text style={styles.subscription}>{translate('From')}</Text>
              <Datepicker size="small" />
              <Text style={styles.subscription}>{translate('To')}</Text>
              <Datepicker size="small" />
            </View>
          </View>

          <View style={styles.containerField}>
            <View style={styles.row}>
              <Text style={styles.fieldTitle}>{translate('Discount')}</Text>
              <RadioGroup style={styles.radioGroup}>
                <Radio style={styles.radio}>{translate('Increase')}</Radio>
                <Radio style={styles.radio}>
                  <Text style={{color: colors.text}}>
                    {translate('Decrease')}
                  </Text>
                </Radio>
              </RadioGroup>
            </View>
            <View style={styles.row}>
              <Text style={styles.subscription}>{translate('From')}</Text>
              <Select style={styles.select}></Select>
              <Text style={styles.subscription} status={'basic'}>
                {translate('To')}
              </Text>
              <Select style={styles.select} size="small"></Select>
            </View>
          </View>

          <View style={styles.containerField}>
            <View style={styles.row}>
              <Text style={styles.fieldTitle}>{translate('Tuition fee')}</Text>
              <RadioGroup style={styles.radioGroup}>
                <Radio style={styles.radio}>{translate('Increase')}</Radio>
                <Radio style={styles.radio}>{translate('Decrease')}</Radio>
              </RadioGroup>
            </View>
            <View style={styles.row}>
              <Text style={styles.subscription}>{translate('From')}</Text>
              <Select style={styles.select} size="small"></Select>
              <Text style={styles.subscription}>{translate('To')}</Text>
              <Select style={styles.select} size="small"></Select>
            </View>
          </View>
          <View style={styles.containerField}>
            <View style={styles.row}>
              <Text style={styles.fieldTitle}>{translate('Center')}</Text>
              <Select style={styles.select} size="small"></Select>
            </View>
          </View>
        </View>
      </Modalize>
    </Portal>
  );
});

const makeStyle = colors =>
  StyleSheet.create({
    modalize: {
      backgroundColor: colors.BACKGROUND_MODALIZE,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
    },
    header: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 12,
    },
    indicator: {
      backgroundColor: colors.PRIMARY[800],
      width: wp(35),
      height: hp(0.7),
      borderRadius: wp(5),
    },
    title: {
      fontSize: 25,
      fontWeight: '800',
      color: colors.text,
      textAlign: 'center',
      marginTop: 18,
    },
    subscription: {
      fontSize: 16,
      marginHorizontal: 20,
      color: colors.text,
    },
    container: {
      marginHorizontal: 15,
    },
    containerField: {
      marginBottom: 20,
      borderTopWidth: 0.5,
      borderBottomWidth: 1,
      borderBottomColor: colors.PRIMARY[100],
      paddingVertical: 5,
    },
    fieldTitle: {
      color: colors.text,
      fontSize: 18,
      fontWeight: '600',
      marginRight: 30,
    },
    selectOption: {},
    row: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    select: {},
    radioGroup: {
      flexDirection: 'row',
      color: colors.text,
    },
    radio: {
      fontSize: 16,
      color: colors.text,
    },
    buttonContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: wp(7),
      marginBottom: hp(2),
    },
    applyButton: {
      flex: 5,
      paddingVertical: 10,
      backgroundColor: colors.SECONDARY[600],
      alignItems: 'center',
      borderRadius: 10,
      marginRight: 10,
    },
    resetButton: {
      flex: 1,
      paddingVertical: 10,
      backgroundColor: colors.SECONDARY[300],
      alignItems: 'center',
      borderRadius: 10,
    },
    buttonTitle: {
      fontSize: 16,
      fontWeight: '500',
      color: colors.text,
    },
  });
