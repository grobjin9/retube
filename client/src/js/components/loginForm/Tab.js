import React from 'react';

const Tab = ({ tabName, activeTab, onTabChange}) => {
    const isActive = tabName === activeTab;
    const activeTabNameClass = isActive ? "login-form__title--active" : "";

    return (
        <label className="login-form__tab-label">
            <span className={"login-form__title " + activeTabNameClass}>
              {"sign " + tabName}
            </span>

            <input onChange={onTabChange} type="radio" value={tabName} className="login-form__radio" checked={isActive} />
        </label>
    );
};

Tab.propTypes = {
  tabName: React.PropTypes.string.isRequired,
  activeTab: React.PropTypes.string.isRequired,
  onTabChange: React.PropTypes.func.isRequired
};

export default Tab;
