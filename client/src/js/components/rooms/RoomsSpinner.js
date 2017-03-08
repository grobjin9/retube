import React from 'react';
import Spinner from 'react-spinkit';

const RoomsSpinner = () => {
  return (
    <Spinner overrideSpinnerClassName="spinner" spinnerName='circle' noFadeIn/>
  );
};

export default RoomsSpinner;