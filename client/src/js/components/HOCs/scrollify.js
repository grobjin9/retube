import React from 'react';
import {getCoords, pauseEvent} from '../../utils/dom';

function scrollify(ComposedComponent, options = {}) {

  let defaults = {
    renderRepass: false,
    adjustPosition: true,
    styles: {
      list: {
        position: "relative",
        width: "100%",
        overflow: "hidden"
      },
      thumb: {
        position: "absolute",
        right: "2px",
        top: "0",
        width: "6px",
        height: "40px",
        backgroundColor: "rgba(85,85,85,.3)",
        borderRadius: "4px",
        cursor: "pointer",
        zIndex: "1000"
      }
    },
    updateFrom: "bottom",
    onRerender: null
  };

  let settings = {
    renderRepass: options.renderRepass || defaults.renderRepass,
    styles: (() => {
      let styles = {};

      if (options.styles) {
        styles.list = options.styles.list ? {...defaults.styles.list, ...options.styles.list} : defaults.styles.list;
        styles.thumb = options.styles.thumb ? {...defaults.styles.thumb, ...options.styles.thumb} : defaults.styles.thumb;
      } else {
        styles.list = defaults.styles.list;
        styles.thumb = defaults.styles.thumb;
      }

      return styles;
    })(),
    classNames: (() => {
      let classNames = {};

      if (options.classNames) {
        classNames.list = options.classNames.list ? options.classNames.list : "";
        classNames.thumb = options.classNames.thumb ? options.classNames.thumb : ""
      } else {
        classNames.list = "";
        classNames.thumb = "";
      }

      return classNames;
    })(),
    updateFrom: options.updateFrom || defaults.updateFrom,
    handleOnBottom: options.handleOnBottom || null,
    handleOnTop: options.handleOnTop || null,
    adjustPosition: options.adjustPosition || defaults.adjustPosition,
    onRerender: options.onRerender || defaults.onRerender
  };

  class Scroller extends React.Component {

    constructor(props) {
      super(props);

      this._lastScrollHeight = null;

      this.listOnScroll = this.listOnScroll.bind(this);
      this.thumbOnMouseDown = this.thumbOnMouseDown.bind(this);
      this.adjustPosition = this.adjustPosition.bind(this);
    }

    componentDidMount() {
      const {thumb, scrollableElement: {list}} = this;

      list.style.marginRight = "-17px";

      list.addEventListener('scroll', this.listOnScroll);
      thumb.addEventListener('mousedown', this.thumbOnMouseDown);
    }

    componentDidUpdate() {
      const {thumb, scrollableElement: {list}, scroller} = this;

      thumb.style.display = list.scrollHeight <= scroller.offsetHeight ? "none" : "block";

      if (options.onRerender) {
        options.onRerender(list, thumb);
      }

      if (settings.renderRepass) {
        list.scrollTop = 0;
        thumb.style.top = "0px";
      }

      if (settings.adjustPosition) {
        this.adjustPosition();
      }

    }

    listOnScroll() {
      const {list} = this.scrollableElement;
      const {thumb, scroller} = this;
      const thumbHeight = parseInt(window.getComputedStyle(thumb)['height']);

      const fromTop = list.scrollTop / ( list.scrollHeight - list.offsetHeight );

      thumb.style.top = fromTop * (scroller.offsetHeight - thumbHeight) + 'px';

      if (fromTop === 0 && settings.handleOnTop) {
        settings.handleOnTop();
      } else if (fromTop === 1 && settings.handleOnBottom) {
        settings.handleOnBottom();
      }
    }

    thumbOnMouseDown(e) {
      const {list} = this.scrollableElement;
      const {thumb, scroller, listOnScroll} = this;
      const shiftY = e.pageY - getCoords(thumb).top;

      pauseEvent(e);
      list.removeEventListener('scroll', this.listOnScroll);

      document.onmousemove = function (e) {
        pauseEvent(e);

        const max = list.offsetHeight - thumb.offsetHeight;
        let move = e.pageY - getCoords(scroller).top - shiftY,
          moveRatio = move / ( scroller.offsetHeight - thumb.offsetHeight);

        if (move <= 0) {
          move = 0;
          moveRatio = 0;

          if (settings.handleOnTop) settings.handleOnTop();

        } else if (move >= max) {
          move = max;
          moveRatio = 1;

          if (settings.handleOnBottom) settings.handleOnBottom();
        }

        thumb.style.top = move + 'px';
        list.scrollTop = moveRatio * (list.scrollHeight - scroller.offsetHeight);
      };

      document.onmouseup = () => {
        list.addEventListener('scroll', listOnScroll);

        document.onmousemove = document.onmouseup = null;
      };

    }

    adjustPosition() {
      const {thumb, scrollableElement: {list}, scroller} = this;
      const thumbHeight = parseInt(window.getComputedStyle(thumb)['height']);
      const fromTop = list.scrollTop / ( list.scrollHeight - list.offsetHeight );

      thumb.style.top = fromTop * (scroller.offsetHeight - thumbHeight) + 'px';

      if (settings.updateFrom === "top") {
        this.scrollableElement.list.scrollTop = this.scrollableElement.scrollHeight - this._lastScrollHeight;
      }
    }

    render() {

      if (this.scrollableElement) {
        this._lastScrollHeight = this.scrollableElement.list.scrollHeight;
      }

      return (
        <div
          ref={scroller => this.scroller = scroller}
          style={settings.styles.list}
          className={`${settings.classNames.list}`}
        >
          <div
            ref={thumb => this.thumb = thumb}
            style={settings.styles.thumb}
            className={`${settings.classNames.thumb}`}>
          </div>

          <ComposedComponent ref={scrollableElement => this.scrollableElement = scrollableElement} {...this.props} />
        </div>
      );
    }
  }

  return Scroller;
}

export default scrollify;