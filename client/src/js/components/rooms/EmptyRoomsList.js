import React from 'react';

const EmptyRoomsList = () => {
  return (
    <div className="rooms__empty-rooms-list empty-rooms-list">
      <div className="empty-rooms-list__content">
        <i class="fa fa-exclamation-triangle empty-rooms-list__icon" aria-hidden="true"> </i>
        <p className="empty-rooms-list__text">There are no results that match your search</p>
      </div>
    </div>
  );
};

export default EmptyRoomsList;