import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Link } from 'react-router';
import { roomShowUpActiveAnimation } from '../../utils/animationSettings';
import { emojify } from 'react-emojione';
import Tag from './Tag';

const Room = ({_id, name, description, favorite, deletable, tags, roomOnClick, tagOnClick, favoriteOnClick, deleteOnClick}) => {
  const favoriteButtonClass = favorite ? 'room__favorite--active' : '';

  const renderDeleteButton = () => {
    return (
      <div className="room__delete">
        <i class="room__delete-icon fa fa-trash-o" aria-hidden="true"></i>
      </div>
    );
  };

  const handleClick = (e) => {
    const target = e.target;

    const isTagButton = target.classList.contains('room__tag');
    const isFavoriteButton = target.classList.contains('room__favorite') || target.classList.contains('room__favorite-icon');
    const isDeleteButton = target.classList.contains('room__delete') || target.classList.contains('room__delete-icon');

    if (isTagButton || isFavoriteButton || isDeleteButton) e.preventDefault();

    if (isTagButton) {
      tagOnClick(target.textContent);
    } else if (isFavoriteButton) {
      favoriteOnClick(_id, favorite);
    } else if (isDeleteButton) {
      deleteOnClick(_id, favorite);
    } else {
      roomOnClick(_id, name);
    }

  };

  return (
    <ReactCSSTransitionGroup component="div" className="rooms__room room room--active" {...roomShowUpActiveAnimation}>
      <Link to={`/rooms/${_id}`} onClickCapture={handleClick} className="room__link clearfix">

        <div className="clearfix">
          <div className="room__data-block">
            <div className="room__name">{ emojify(name, { styles: { display: 'inline'} }) }</div>
            <div className="room__description">{ emojify(description, { styles: { display: 'inline'} }) }</div>
            { deletable && renderDeleteButton() }
            <div className={"room__favorite " + favoriteButtonClass}>
              <i class={`room__favorite-icon fa fa-star${favorite ? '' : '-o'}`} aria-hidden="true"></i>
            </div>
          </div>
        </div>


        <div className="room__tags-block">
          <ul className="room__tags clearfix">
            { tags.map(tag => <Tag key={tag} title={tag}/>) }
          </ul>
        </div>
      </Link>
    </ReactCSSTransitionGroup>
  );
};

Room.propTypes = {
  _id: React.PropTypes.string.isRequired,
  name: React.PropTypes.string.isRequired,
  description: React.PropTypes.string.isRequired,
  favorite: React.PropTypes.bool.isRequired,
  deletable: React.PropTypes.bool.isRequired,
  tags: React.PropTypes.array.isRequired,
  tagOnClick: React.PropTypes.func.isRequired,
  roomOnClick: React.PropTypes.func.isRequired,
  deleteOnClick: React.PropTypes.func.isRequired
};

export default Room;