import {COST_STATUS} from '@constants/request';
import {translate} from '@locales';
const {parseISO, format} = require('date-fns');

export const isOnlyWhitespace = str => {
  return /^\s*$/.test(str);
};

export const isExactPhoneNumber = str => {
  return /^0\d{9}$/.test(str);
};

export const isExactEmail = str => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str);
};

export const formatDateFromISO = date => {
  return format(parseISO(date), 'dd-MM-yyyy');
};

export const formatMoney = number => {
  return new Intl.NumberFormat('en-US').format(number);
};

export const removeVietnameseTones = str => {
  return str
    .normalize('NFD') // Chuyển đổi thành các ký tự tổ hợp
    .replace(/[\u0300-\u036f]/g, '') // Xóa các dấu tổ hợp
    .replace(/đ/g, 'd') // Thay thế 'đ' thành 'd'
    .replace(/Đ/g, 'D'); // Thay thế 'Đ' thành 'D'
};

export const calculateAge = birthDateString => {
  const birthDate = new Date(birthDateString);
  const currentDate = new Date();

  let age = currentDate.getFullYear() - birthDate.getFullYear();
  const monthDiff = currentDate.getMonth() - birthDate.getMonth();

  return age;
};

export const formatTimeISO = number => {
  const isoDate = '2024-09-24T21:12:59.891Z';
  const date = new Date(isoDate);

  const hours = date.getUTCHours().toString().padStart(2, '0');
  const minutes = date.getUTCMinutes().toString().padStart(2, '0');

  const day = date.getUTCDate().toString().padStart(2, '0');
  const month = (date.getUTCMonth() + 1).toString().padStart(2, '0'); // Tháng bắt đầu từ 0
  const year = date.getUTCFullYear();

  const formattedTime = `${hours}:${minutes} ${day}-${month}-${year}`;

  return formattedTime;
};

export const getDayOfWeek = dateNumber => {
  switch (dateNumber) {
    case 2:
      return translate('Monday');
    case 3:
      return translate('Tuesday');
    case 4:
      return translate('Wednesday');
    case 5:
      return translate('Thurday');
    case 6:
      return translate('Friday');
    case 7:
      return translate('Saturday');
    case 8:
      return translate('Sunday');
  }
};

export const getCostStatus = status => {
  switch (status) {
    case COST_STATUS.PENDING:
      return translate('Unpaid');
    case COST_STATUS.DONE:
      return translate('Completed');
    case COST_STATUS.DEBT:
      return translate('Still owe money');
  }
};

export const getWageStatus = status => {
  switch (status) {
    case COST_STATUS.PENDING:
      return translate('Unpaid');
    case COST_STATUS.DONE:
      return translate('Paid');
  }
};

const getLastName = fullName => {
  const nameParts = fullName.trim().split(' ');
  return nameParts[nameParts.length - 1];
};

export const sortStudentsByFirstName = classData => {
  // Sắp xếp học sinh trong mỗi lớp
  classData.forEach(classItem => {
    classItem.students.sort((a, b) => {
      const lastNameA = getLastName(a.name).toLowerCase();
      const lastNameB = getLastName(b.name).toLowerCase();
      return lastNameA.localeCompare(lastNameB);
    });
  });

  return classData;
};

export const formatDateTMDToDMY = dateString => {
  const [year, month, day] = dateString.split('-');
  return `${day}-${month}-${year}`;
};
