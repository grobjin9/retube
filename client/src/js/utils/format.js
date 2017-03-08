const DAYS = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export const formatMessageDate = (date) => {
  const day = date.getDate();
  const month = MONTHS[date.getMonth()];

  return day + ' ' + month;
};

export const formatRoomsList = (list) => {
  return list.map(room => ({...room, users: 0}));
};