import React from 'react';
import { connect } from 'react-redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import SearchField from '../components/rooms/SearchField';
import NewChatroomForm from '../components/rooms/NewChatroomForm';
import RoomsFilter from '../components/rooms/RoomsFilter';
import RoomsList from '../components/rooms/RoomsList';
import socket from '../utils/socket';
import { slideDownAnimation, fadeAnimation } from '../utils/animationSettings';
import {
  fetchRoomsRequest,
  fetchPartialRoomsRequest,
  fetchByTagRequest,
  fetchPartialByTagRequest,
  createRoomRequest,
  deleteRoomRequest,
  setVisibilityFilter,
  toggleRoomFavoriteRequest
} from '../actions/roomsActions';

class Rooms extends React.Component {

  static onEnter(nextState, replace) {
    const { pathname } = nextState.location;

    socket.connect(() => {
      replace(pathname);
    });

  }

  static renderCover() {
    return (
      <ReactCSSTransitionGroup component="div" {...fadeAnimation}>
        <div className="rooms__cover"></div>
      </ReactCSSTransitionGroup>
    );
  }

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
    fetchRoomsRequest: React.PropTypes.func.isRequired,
    fetchByTagRequest: React.PropTypes.func.isRequired,
    createRoomRequest: React.PropTypes.func.isRequired,
    deleteRoomRequest: React.PropTypes.func.isRequired,
    fetchPartialRoomsRequest: React.PropTypes.func.isRequired,
    fetchPartialByTagRequest: React.PropTypes.func.isRequired,
    toggleRoomFavoriteRequest: React.PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      hideCreateNewChatForm: true,
      hideFilterList: true,
      query: ''
    };

    this._active = false;
    this.timer = null;
    this.lastTimeValue = null;

    this.searchFieldOnChange = this.searchFieldOnChange.bind(this);
    this.toggleNewChatForm = this.toggleNewChatForm.bind(this);
    this.toggleFilter = this.toggleFilter.bind(this);
    this.selectFilter = this.selectFilter.bind(this);
    this.newChatroomOnSubmit = this.newChatroomOnSubmit.bind(this);
    this.renderSearchList = this.renderSearchList.bind(this);
    this.onQueryChange = this.onQueryChange.bind(this);
  }

  componentDidMount() {
    this.props.fetchRoomsRequest();
  }

  componentDidUpdate() {
    if (!this._active) this._active = true;
  }

  onQueryChange(text) {
    this.setState({
      query: text
    });
  }

  searchFieldOnChange(text) {
    const { rooms: { visibilityFilter }, setVisibilityFilter } = this.props;
    const newState = {
      query: ''
    };

    if (visibilityFilter === 'favorites' || visibilityFilter === 'by_me') {
      setVisibilityFilter('all');
    }

    if (!this.state.hideFilterList) {
      newState.hideFilterList = true;
    }

    this.setState(newState);

    this.props.fetchByTagRequest(text);

    this.setState({query: text});
  }

  toggleNewChatForm() {
    this.setState({
      hideCreateNewChatForm: !this.state.hideCreateNewChatForm,
      hideFilterList: true
    });
  }

  toggleFilter() {
    this.setState({
      hideFilterList: !this.state.hideFilterList
    });
  }

  selectFilter(filter) {
    const { rooms: { visibilityFilter }, fetchByTagRequest, fetchRoomsRequest, setVisibilityFilter } = this.props;
    const { query } = this.state;

    if (filter === visibilityFilter) return;

    setVisibilityFilter(filter);

    this.setState({
      hideFilterList: true
    });

    if (filter === 'favorites' || filter === 'by_me') {
      this.setState({
        query: ''
      });

      fetchRoomsRequest(filter);
    } else if (query.length) {
      fetchByTagRequest(query);
    } else {
      fetchRoomsRequest(filter);
    }
  }

  newChatroomOnSubmit(data) {
    this.props.createRoomRequest(data);

    setTimeout(() => this.toggleNewChatForm(), 350);
  }

  renderSearchList() {
    const { hideCreateNewChatForm, query } = this.state;

    if (hideCreateNewChatForm) {
      return <SearchField delay={500} query={query ? query : ''} searchFieldOnChange={this.searchFieldOnChange}/>;
    } else {
      return 'Create group chat';
    }
  }

  render() {
    const { rooms: { list, count, visibilityFilter }, user: { favoriteRoomsCount } } = this.props;
    const { hideCreateNewChatForm, hideFilterList } = this.state;
    const activeHideCreateNewChatFormClass = !this.state.hideCreateNewChatForm ? 'rooms__control-box--active45' : '';

    return (
      <div className="row expand-height">
        <div className="col-md-4 nopad expand-height">
          <section className="rooms">

            { !hideFilterList && Rooms.renderCover() }

            <div className="rooms__header">

              <RoomsFilter
                hidden={hideCreateNewChatForm}
                hiddenDropdown={hideFilterList}
                currentFilter={visibilityFilter}
                onOpen={this.toggleFilter}
                onFilterClick={this.selectFilter}
                totalRooms={count}
                favoriteRoomsCount={favoriteRoomsCount}
              />

              <div
                onClick={this.toggleNewChatForm}
                className={"rooms__control-box rooms__control-box--right " + activeHideCreateNewChatFormClass}
              >
                <button type="button" className="rooms__control-box-btn rooms__control-box-btn--cross"> </button>
              </div>

              { this.renderSearchList() }
            </div>

            <ReactCSSTransitionGroup component="div" {...slideDownAnimation}>
              { !hideCreateNewChatForm && <NewChatroomForm formOnSubmit={this.newChatroomOnSubmit}/> }
            </ReactCSSTransitionGroup>

            <RoomsList {...this.props} onQueryChange={this.onQueryChange} query={this.state.query} />

          </section>
        </div>
        <div className="col-md-8 nopad expand-height">
          { ( list.length || this._active ) ? this.props.children : "" }
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ rooms, user, chatroom: { id: chatroomId }}) => ({ rooms, user, chatroomId });

export default connect(mapStateToProps, {
  fetchRoomsRequest,
  fetchByTagRequest,
  createRoomRequest,
  deleteRoomRequest,
  fetchPartialRoomsRequest,
  fetchPartialByTagRequest,
  toggleRoomFavoriteRequest,
  setVisibilityFilter
})(Rooms);