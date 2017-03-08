import * as constants from '../constants/userConstants';

export const updateUser = function (userData) {
  return {
    type: constants.UPDATE_USER,
    ...userData
  }
};

export const killUser = function () {
  return {
    type: constants.KILL_USER
  };
};

export const updateFavoriteRoomsCount = function (count) {
  return {
    type: constants.UPDATE_FAVORITE_ROOMS_COUNT,
    count
  };
};