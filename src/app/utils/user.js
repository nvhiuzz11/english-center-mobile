import {ROLE} from '@constants/user';
import {translate} from '@locales';

export const isParent = role => {
  return role === ROLE.PARENT;
};

export const isStudent = role => {
  return role === ROLE.STUDENT;
};

export const isTeacher = role => {
  return role === ROLE.TEACHER;
};

export const getAvatar = (role, gender) => {
  if (isParent(role)) {
    if (gender === 1) return require('@assets/images/Parent-male-avatar.png');
    else return require('@assets/images/Parent-female-avatar.png');
  }

  if (isStudent(role)) {
    if (gender === 1) return require('@assets/images/Student-male-avatar.png');
    else return require('@assets/images/Student-female-avatar.png');
  }

  if (isTeacher(role)) {
    if (gender === 1) return require('@assets/images/Teacher-male-avatar.png');
    else return require('@assets/images/Teacher-female-avatar.png');
  }
};

export const getGender = gender => {
  return gender === 1 ? translate('Male') : translate('Female');
};
