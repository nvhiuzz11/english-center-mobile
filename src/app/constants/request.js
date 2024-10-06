export const REQUEST_TYPE = {
  SEND: 'SEND',
  RECEIVE: 'RECEIVE',
};

export const ATTENDANCE_TYPE = {
  ADD: 'ADD',
  DELETE: 'DELETE',
  UPDATE: 'UPDATE',
};

export const EVALUATE_TYPE = {
  ADD: 'ADD',
  DELETE: 'DELETE',
  UPDATE: 'UPDATE',
};

export const REQUEST_STATUS = {
  PENDING: 1,
  ACCEPT: 2,
  DENY: 3,
  TERMINAL: 4,
};

export const NOTIFICATION_TYPE = {
  REQUEST: 1,
  TRANSACTION: 2,
  REVIEW: 3,
};

export const COST_TYPE = {
  TEACHER_WAGE: 1,
  TUITION_FEE: 2,
  ELECTRONIC_FEE: 3,
  WATER_FEE: 4,
  OTHER_FEE: 5,
};

export const COST_STATUS = {
  PENDING: 1,
  DONE: 2,
  DEBT: 3,
};
