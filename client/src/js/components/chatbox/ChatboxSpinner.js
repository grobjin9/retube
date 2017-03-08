import React from 'react';
import Spinner from 'react-spinkit';

const ChatboxSpinner = () => {
  return (
    <Spinner overrideSpinnerClassName="spinner" spinnerName='circle' noFadeIn/>
  );
};

export default ChatboxSpinner;