import React from 'react';
import Spinner from 'react-spinkit';

const LoadSpinner = ({ isLoading, isActive, isDone}) => {
  return (
    <div className="load-spinner">
      <Spinner overrideSpinnerClassName="spinner" spinnerName='circle' noFadeIn/>
    </div>
  );
};

export default LoadSpinner;