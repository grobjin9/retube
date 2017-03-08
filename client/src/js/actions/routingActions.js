import * as constants from '../constants/routingConstants';

export const reroute = (method, nextUrl) => {
  return {
    type: constants.ROUTING,
    payload: {
      method,
      nextUrl
    }
  };
};

