import React from 'react';
import RoomsSpinner from './RoomsSpinner';
import EmptyRoomsList from './EmptyRoomsList';
import Room from './Room';
import RoomActive from './RoomActive';
import scrollify from '../HOCs/scrollify';

class RoomsList extends React.Component {

  static propTypes = {
    user: React.PropTypes.shape({
      id: React.PropTypes.string.isRequired,
      username: React.PropTypes.string.isRequired,
      avatar: React.PropTypes.string.isRequired,
      favoriteRoomsCount: React.PropTypes.number.isRequired
    }),
    rooms: React.PropTypes.shape({
      visibilityFilter: React.PropTypes.string.isRequired,
      list: React.PropTypes.arrayOf(React.PropTypes.object),
      count: React.PropTypes.number.isRequired,
      done: React.PropTypes.bool.isRequired,
      isLoading: React.PropTypes.bool.isRequired,
      error: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.bool])
    }),
    chatroomId: React.PropTypes.string,
    query: React.PropTypes.string
  };

  constructor(props) {
    super(props);

    this.favoriteOnClick = this.favoriteOnClick.bind(this);
    this.deleteOnClick = this.deleteOnClick.bind(this);
    this.tagOnClick = this.tagOnClick.bind(this);
    this.roomOnClick = this.roomOnClick.bind(this);
    this.renderRooms = this.renderRooms.bind(this);
    this.roomsListOnScroll = this.roomsListOnScroll.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    return  nextProps.query !== this.props.query ||
            nextProps.rooms.visibilityFilter !== this.props.rooms.visibilityFilter ||
            nextProps.rooms.list.length !== this.props.rooms.list.length ||
            nextProps.rooms.isLoading !== this.props.rooms.isLoading ||
            nextProps.user.favoriteRoomsCount !== this.props.user.favoriteRoomsCount ||
            nextProps.chatroomId !== this.props.chatroomId;
  }

  componentDidUpdate(prevProps) {
    if (prevProps.query !== this.props.query) {
      this.list.scrollTop = 0;
    }
  }

  favoriteOnClick(roomId, isFavorite) {
    const { toggleRoomFavoriteRequest } = this.props;

    toggleRoomFavoriteRequest(roomId, isFavorite);
  }

  deleteOnClick(roomId, isFavorite) {
    const confirmation = confirm(`Are you sure you want to permanently delete room ${roomId}?`);

    if (confirmation) this.props.deleteRoomRequest(roomId, isFavorite);
  }

  tagOnClick(text) {
    const { onQueryChange } = this.props;

    onQueryChange(text);

    this.props.fetchByTagRequest(text);
  }

  roomOnClick(id, name) {
    //  Room clicked event
  }

  renderRooms() {
    const { rooms: { list }, chatroomId, user: {id: userId, username} } = this.props;

    if (list.length) {
      return list.map(room => {
        const isSelected = room._id === chatroomId;
        const isDeletable = room.creator_id === userId || username === 'admin';

        return (
          isSelected ?
            <RoomActive
              key={room._id}
              roomOnClick={this.roomOnClick}
              tagOnClick={this.tagOnClick}
              favoriteOnClick={this.favoriteOnClick}
              deleteOnClick={this.deleteOnClick}
              deletable={isDeletable}
              {...room}
            /> :
            <Room
              key={room._id}
              roomOnClick={this.roomOnClick}
              tagOnClick={this.tagOnClick}
              favoriteOnClick={this.favoriteOnClick}
              deleteOnClick={this.deleteOnClick}
              deletable={isDeletable}
              {...room}
            />
        );
      });
    } else {
      return <EmptyRoomsList />;
    }
  }

  roomsListOnScroll() {
    const { rooms: { done }, query, fetchPartialRoomsRequest, fetchPartialByTagRequest } = this.props;
    const bottom = this.list.scrollTop === this.list.scrollHeight - this.list.offsetHeight;

    if (bottom && !done && query.length) {
      fetchPartialByTagRequest(query);
      return;
    }

    if (bottom && !done) {
      fetchPartialRoomsRequest(query);
    }
  }

  render() {
    const { isLoading, done, list } = this.props.rooms;
    const isInitialRender = isLoading && !list.length;

    return (
      <div onScroll={this.roomsListOnScroll} ref={l => this.list = l} className="rooms__list">
        { isInitialRender ? <RoomsSpinner /> : this.renderRooms() }
        { !done && <div className="rooms__load-indicator" style={{visibility: isLoading ? "visible" : "hidden"}}>
            { !isInitialRender ? <RoomsSpinner /> : '' }
          </div> }
      </div>
    );
  }
}

export default scrollify(RoomsList, {
  classNames: {
    list: "scroller",
    thumb: "scroller__thumb"
  }
});