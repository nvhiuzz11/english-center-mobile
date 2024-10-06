const {parseISO, format} = require('date-fns');

export const formatDateFromISOs = date => {
  return format(parseISO(date), 'dd-MM-yyyy');
};
