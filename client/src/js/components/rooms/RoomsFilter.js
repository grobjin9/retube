import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import FilterLink from './FilterLink';
import { fadeAnimation } from '../../utils/animationSettings';

const RoomsFilter = ({ hidden, hiddenDropdown, currentFilter, totalRooms, favoriteRoomsCount, onOpen, onFilterClick }) => {
  
  const filters = {
    "all": {
      title: "Show all",
      icon: "fa-list",
      label: totalRooms,
      type: "sort"
    },
    "date_desc": {
      title: "Newest first",
      icon: "fa-arrow-circle-up",
      type: "sort"
    },
    "date_asc": {
      title: "Oldest first",
      icon: "fa-arrow-circle-down",
      type: "sort"
    },
    "popular": {
      title: "Popular first",
      icon: "fa-fire",
      type: "sort"
    },
    "favorites": {
      title: "Favorites",
      icon: "fa-star",
      label: favoriteRoomsCount,
      type: "filter"
    },
    "by_me": {
      title: "Rooms by me",
      icon: "fa-user-circle-o",
      label: "",
      type: "filter"
    }
  };
  
  const filterContainerStyle = {
    display: hidden ? 'block' : 'none'
  };

  const handleFilterClick = (e) => {
    e.preventDefault();

    const target = e.target.closest('.rooms__filter-link');

    if (target.dataset && target.dataset.filter) onFilterClick(target.dataset.filter);
  };
  
  const renderFilterLinks = () => {
    let prevFilterType = null;

    return Object.keys(filters).map((filter, index) => {
        if (filters[filter].type !== prevFilterType) {

          prevFilterType = filters[filter].type;

          return [
            <p className="rooms__filter-sep">{filters[filter].type}</p>,
            <FilterLink key={filter} filter={filter} {...filters[filter]} active={currentFilter === filter}/>
          ];
        }

        return [
          <FilterLink key={filter} filter={filter} {...filters[filter]} active={currentFilter === filter}/>
        ];
      }
    );
  };

  const renderFilterList = () => {
    return (
      <ReactCSSTransitionGroup onClick={handleFilterClick} component="div" className="rooms__filter-list" {...fadeAnimation}>
        { renderFilterLinks() }
      </ReactCSSTransitionGroup>
    );
  };

  return (
    <div style={filterContainerStyle} className="rooms__filter-container">
      <div onClick={onOpen} className="rooms__control-box rooms__control-box--plain rooms__control-box--left" >
        <i class="fa fa-cog rooms__control-box-btn rooms__control-box-btn--coq" aria-hidden="true"></i>
      </div>

      { !hiddenDropdown && renderFilterList() }
    </div>
  );
};

RoomsFilter.propTypes = {
  hidden: React.PropTypes.bool.isRequired,
  onOpen: React.PropTypes.func.isRequired,
  onFilterClick: React.PropTypes.func.isRequired,
  totalRooms: React.PropTypes.number.isRequired
};

export default RoomsFilter;