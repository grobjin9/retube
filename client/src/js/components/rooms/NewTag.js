import React from 'react';

class NewTag extends React.Component {
  
  static propTypes = {
    onTagRemoveLast: React.PropTypes.func.isRequired,
    highlightLastTag: React.PropTypes.bool.isRequired,
    onTagCreate: React.PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      stage: 2
    };

    this.tagOnKeyDown = this.tagOnKeyDown.bind(this);
    this.tagOnBlur = this.tagOnBlur.bind(this);
  }

  tagOnKeyDown(e) {
    const val = this.tag.value;
    const { stage } = this.state;
    const { onTagRemoveLast, highlightLastTag } = this.props;

    if (e.keyCode === 8 && !val) {

      this.setState({
        state: this.state.stage--
      });

      onTagRemoveLast(this.state.stage);

      if (stage === 0) {
        this.setState({
          stage: 2
        });
      }

      setTimeout(() => {
        document.querySelector('.new-cr-form__tag-container--new > .new-cr-form__tag-new').focus();
      }, 0);

    } else if (e.keyCode === 13) {
      const { onTagCreate } = this.props;

      if (!val || val.includes(' ')) return;

      onTagCreate(val);

      setTimeout(() => {
        document.querySelector('.new-cr-form__tag-container--new > .new-cr-form__tag-new').focus();
      }, 0);

    } else if (highlightLastTag) {
      this.setState({
        stage: 2
      });

      onTagRemoveLast(2);
    }
  }

  tagOnBlur() {
    if (this.tag.value) this.props.onTagCreate(this.tag.value);
  }

  render() {
    return (
      <li className="new-cr-form__tag-container new-cr-form__tag-container--new">
        <input onKeyDown={this.tagOnKeyDown}
               onBlur={this.tagOnBlur}
               ref={t => this.tag = t}
               type="text"
               className="new-cr-form__tag-new"
               placeholder="tag here"
        />
      </li>
    );
  }
}

export default NewTag;