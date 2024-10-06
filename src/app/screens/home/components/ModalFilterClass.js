import {ResetFilterIcon} from '@assets/icons/resetFilterIcon';
import {translate} from '@locales';
import {useTheme} from '@react-navigation/native';
import {
  CheckBox,
  Datepicker,
  Radio,
  RadioGroup,
  Select,
  SelectItem,
} from '@ui-kitten/components';
import {isIos} from '@utils/device';
import {formatMoney} from '@utils/input';
import {hp, wp} from '@utils/responsive';
import React, {useState} from 'react';
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
  const {centers, onApplyFilter, onReset} = props;
  const {colors} = useTheme();
  const styles = makeStyle(colors);

  const [selectedCenterIndex, setSelectedCenterIndex] = useState(null);
  const [selectedAgeFrom, setSelectedAgeFrom] = useState(null);
  const [selectedAgeTo, setSelectedAgeTo] = useState(null);
  const [selectedFromDate, setSelectedFromDate] = useState(null);
  const [selectedToDate, setSelectedToDate] = useState(null);
  const [selectedFromFee, setSelectedFromFee] = useState(null);
  const [selectedToFee, setSelectedToFee] = useState(null);
  const [isDiscountChecked, setIsDiscountChecked] = useState(false);

  const dataAge = [
    3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  ];

  const dataFee = [50000, 200000, 500000, 1000000, 1500000];

  const handleApplyFilter = () => {
    console.log('selectedCenter', centers[selectedCenterIndex?.row]);
    console.log('selectedAgeFrom', dataAge[selectedAgeFrom?.row]);
    console.log('selectedAgeTo', dataAge[selectedAgeTo?.row]);

    console.log('selectedFromDate', selectedFromDate?.toISOString());
    console.log('selectedToDate', selectedToDate?.toISOString());

    console.log('selectedFromFee', dataFee[selectedFromFee?.row]);
    console.log('selectedToFee', dataFee[selectedToFee?.row]);

    console.log('isDiscountChecked', isDiscountChecked);

    onApplyFilter(
      centers[selectedCenterIndex?.row]?.id,
      dataAge[selectedAgeFrom?.row],
      dataAge[selectedAgeTo?.row],
      selectedFromDate?.toISOString(),
      selectedToDate?.toISOString(),
      dataFee[selectedFromFee?.row],
      dataFee[selectedToFee?.row],
      isDiscountChecked,
    );
  };

  const handleResetFilters = () => {
    setSelectedCenterIndex(null);
    setSelectedAgeFrom(null);
    setSelectedAgeTo(null);
    setSelectedFromDate(null);
    setSelectedToDate(null);
    setSelectedFromFee(null);
    setSelectedToFee(null);
    setIsDiscountChecked(false);
    onReset();
  };

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
            <TouchableOpacity
              style={styles.applyButton}
              onPress={handleApplyFilter}>
              <Text style={styles.buttonTitle}>
                {translate('Aplly filter')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.resetButton}
              onPress={handleResetFilters}>
              <ResetFilterIcon color={colors.text} />
            </TouchableOpacity>
          </View>
        }>
        <View style={styles.container}>
          <View style={styles.containerField}>
            <View style={styles.row}>
              <Text style={styles.fieldTitle}>{translate('Ages')}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.subscription}>{translate('From')}</Text>
              <Select
                style={styles.select}
                size="small"
                selectedIndex={selectedAgeFrom}
                onSelect={index => setSelectedAgeFrom(index)}
                value={dataAge[selectedAgeFrom?.row]}>
                {Array.from({length: 18}, (_, i) => i + 3).map(age => (
                  <SelectItem key={age} title={String(age)} />
                ))}
              </Select>
              <Text style={styles.subscription}>{translate('To')}</Text>
              <Select
                style={styles.select}
                size="small"
                selectedIndex={selectedAgeTo}
                onSelect={index => setSelectedAgeTo(index)}
                value={dataAge[selectedAgeTo?.row]}>
                {Array.from({length: 18}, (_, i) => i + 3).map(age => (
                  <SelectItem key={age} title={String(age)} />
                ))}
              </Select>
            </View>
          </View>

          <View style={styles.containerField}>
            <View style={styles.row}>
              <Text style={styles.fieldTitle}>{translate('Time start')}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.subscription}>{translate('From')}</Text>

              <Datepicker
                size="small"
                date={selectedFromDate} // Bind the selected date to state
                onSelect={nextDate => setSelectedFromDate(nextDate)} // Update state on date change
              />
              <Text style={styles.subscription}>{translate('To')}</Text>
              <Datepicker
                size="small"
                date={selectedToDate} // Bind the selected date to state
                onSelect={nextDate => setSelectedToDate(nextDate)} // Update state on date change
              />
            </View>
          </View>

          <View style={styles.containerField}>
            <View style={styles.row}>
              <Text style={styles.fieldTitle}>{translate('Discount')}</Text>
              <CheckBox
                checked={isDiscountChecked} // Bind the checkbox to the state
                onChange={nextChecked => setIsDiscountChecked(nextChecked)} // Update the state on change
              />
            </View>
          </View>

          <View style={styles.containerField}>
            <View style={styles.row}>
              <Text style={styles.fieldTitle}>{translate('Tuition fee')}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.subscription}>{translate('From')}</Text>
              <Select
                style={[styles.select, {width: 120}]}
                size="small"
                selectedIndex={selectedFromFee}
                onSelect={index => setSelectedFromFee(index)}
                value={formatMoney(dataFee[selectedFromFee?.row])}>
                <SelectItem title="50,000" />
                <SelectItem title="200,000" />
                <SelectItem title="500,000" />
                <SelectItem title="1,000,000" />
                <SelectItem title="1,500,000" />
                <SelectItem title="2,000,000" />
              </Select>
              <Text style={styles.subscription}>{translate('To')}</Text>
              <Select
                style={[styles.select, {width: 120}]}
                size="small"
                selectedIndex={selectedToFee}
                onSelect={index => setSelectedToFee(index)}
                value={formatMoney(dataFee[selectedToFee?.row])}>
                <SelectItem title="50,000" />
                <SelectItem title="200,000" />
                <SelectItem title="500,000" />
                <SelectItem title="1,000,000" />
                <SelectItem title="1,500,000" />
                <SelectItem title="2,000,000" />
              </Select>
            </View>
          </View>
          <View style={styles.containerField}>
            <View style={styles.row}>
              <Text style={styles.fieldTitle}>{translate('Center')}</Text>
              <Select
                style={[styles.select, {width: 200}]}
                size="small"
                placeholder="Select Center"
                selectedIndex={selectedCenterIndex}
                onSelect={index => setSelectedCenterIndex(index)}
                value={
                  selectedCenterIndex !== null
                    ? `Cơ sở ${centers[selectedCenterIndex.row].id} - ${
                        centers[selectedCenterIndex.row].name
                      }`
                    : ''
                }>
                {centers.map((center, index) => (
                  <SelectItem
                    key={center.id}
                    title={`Cơ sở ${center.id} - ${center.name}`}
                  />
                ))}
              </Select>
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
    select: {
      width: 100,
    },
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
