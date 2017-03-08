import React from 'react';

const Tag = ({ title }) => {
  return (
    <div className="room__tag">
      {title}
    </div>
  );
};

Tag.propTypes = {
  title: React.PropTypes.string.isRequired
};

export default Tag;