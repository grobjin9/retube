import React from 'react';

import NewChatroomFormTags from './NewChatroomFormTags';
import NewChatroomErrorNotifier from './NewChatroomErrorNotifier';
import { validateNewRoomCreation } from '../../utils/validations';

class NewChatroomForm extends React.Component {

  static propTypes = {
    formOnSubmit: React.PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      name: '',
      description: '',
      tags: ['react'],
      highlightLastTag: false,
      errors: {}
    };

    this.inputOnChange = this.inputOnChange.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.onTagRemove = this.onTagRemove.bind(this);
    this.onTagRemoveLast = this.onTagRemoveLast.bind(this);
    this.onTagCreate = this.onTagCreate.bind(this);
  }

  inputOnChange(e) {
    const { name, value } = e.target;

    this.setState({
      [name]: value
    });
  }

  validateForm(e) {
    e.preventDefault();

    const { isValid, errors } = validateNewRoomCreation(this.state);

    if (isValid) {
      const { name, description, tags } = this.state;

      this.props.formOnSubmit({name, description, tags});
    } else {
      this.setState({errors});
    }
  }

  onTagRemove(tagName) {
    this.setState({
      tags: this.state.tags.filter(tag => tag !== tagName),
      highlightLastTag: false
    });
  }

  onTagCreate(tagName) {
    this.setState({
      tags: this.state.tags.filter(tag => tag !== tagName).concat(tagName),
      highlightLastTag: false
    });
  }

  onTagRemoveLast(stage) {
    if (!this.state.tags.length) return;

    if (stage === 0) {
      let tagsTemp = [...this.state.tags];

      tagsTemp.pop();

      this.setState({
        tags: tagsTemp,
        highlightLastTag: false
      });
    } else if (stage === 1) {
      this.setState({
        highlightLastTag: true
      });
    } else if (stage === 2) {
      this.setState({
        highlightLastTag: false
      });
    }
  }

  render() {
    const { name, description, tags, highlightLastTag } = this.state;
    const { name: nameError, description: descriptionError, tags: tagsError} = this.state.errors;

    return (
      <div>
        <div className="rooms__new-cr-form new-cr-form">
          <form onSubmit={this.validateForm} className="new-cr-form__body">

            <div className="form-group new-cr-form__form-group">
              <input
                name="name"
                value={name}
                onChange={this.inputOnChange}
                type="text"
                className="form-control"
                placeholder="Give it a name"
              />
            </div>
            <NewChatroomErrorNotifier error={nameError} />

            <div className="form-group new-cr-form__form-group">
              <input
                name="description"
                value={description}
                onChange={this.inputOnChange}
                type="text"
                className="form-control"
                placeholder="Enter a description"
              />
            </div>
            <NewChatroomErrorNotifier error={descriptionError} />

            <NewChatroomFormTags
              onTagRemove={this.onTagRemove}
              onTagRemoveLast={this.onTagRemoveLast}
              onTagCreate={this.onTagCreate}
              tags={tags}
              highlightLastTag={highlightLastTag}
            />
            <NewChatroomErrorNotifier error={tagsError} />

            <button class="btn btn-success" type="submit">Create</button>
          </form>
        </div>
      </div>
    );
  }
}

export default NewChatroomForm;