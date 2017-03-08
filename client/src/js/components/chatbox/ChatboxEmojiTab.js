import React from 'react';

const ChatboxEmojiTab = ({ icon, title, set, currentSet, onSetChange}) => {
  const activeTabClass = set === currentSet ? 'emoji-bar__tab--active' : '';

  const handleClick = (e) => {
    e.preventDefault();

    if (activeTabClass) return;

    onSetChange(set, title);
  };

  return (
    <a onClick={handleClick} className={"emoji-bar__tab " + activeTabClass}>
      <i class={`fa ${icon} emoji-bar__tab-icon`} aria-hidden="true"></i>
    </a>
  );
};

export default ChatboxEmojiTab;