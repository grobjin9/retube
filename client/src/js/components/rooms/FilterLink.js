import React from 'react';

const FilterLink = ({ title, filter, label, icon, active }) => {
  const linkActiveClass = active ? "rooms__filter-link--active" : "";

  return (
    <a href="#" data-filter={filter} className={"rooms__filter-link clearfix " + linkActiveClass}>
      <div className="rooms__filter-title">
        { title }
        { label ? <span class="label label-info rooms__filter-info">{ label }</span> : '' }
      </div>
      <div className="rooms__filter-icon">
        <i class={`fa ${icon}`} aria-hidden="true"></i>
      </div>
    </a>
  );
};

FilterLink.propTypes = {
  title: React.PropTypes.string.isRequired,
  filter: React.PropTypes.string.isRequired,
  label: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.string]),
  icon: React.PropTypes.string.isRequired,
  active: React.PropTypes.bool.isRequired
};

export default FilterLink;