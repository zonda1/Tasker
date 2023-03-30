import React, { Component } from 'react';
import FormError from '../FormError/FormError';
import MyButton from '../UI/MyButton/MyButton';
import MyInput from '../UI/MyInput/MyInput';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      body: '',
      formError: '',
      titleValid: false,
      formValid: false,
    };
  }

  createPost = (e) => {
    e.preventDefault();
    if (this.state.formValid) {
      const newPost = {
        id: Date.now(),
        title: this.state.title,
        body: this.state.body,
        isDone: false,
        isArchived: false,
      };
      console.log(newPost);
      this.props.add(newPost);
      this.setState({ title: '', body: '', formValid: false });
    }
  };

  handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value }, () => {
      this.validateField(name, value);
    });
  };

  validateField(fieldName, value) {
    let fieldValidationError = this.state.formError;
    let titleValid = this.state.titleValid;

    if (fieldName === 'title') {
      titleValid = value.length >= 2;
      fieldValidationError = titleValid ? '' : ' is too short';
    }

    this.setState(
      { formError: fieldValidationError, titleValid: titleValid },
      this.validateForm
    );
  }

  validateForm() {
    this.setState({ formValid: this.state.titleValid });
  }

  errorClass(error) {
    return error.length === 0 ? '' : 'has-error';
  }

  render() {
    return (
      <form>
        <div className='panel panel-default'>
          <FormError formError={this.state.formError}></FormError>
        </div>
        <div className={`form-group ${this.errorClass(this.state.formError)}`}>
          <label htmlFor='title'>Title</label>
          <MyInput
            type='text'
            name='title'
            requiered
            placeholder='Task title'
            value={this.state.title}
            onChange={this.handleUserInput}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='body'>Description</label>
          <MyInput
            type='text'
            name='body'
            placeholder='Task body'
            value={this.state.body}
            onChange={this.handleUserInput}
          />
        </div>
        <MyButton
          type='sumbit'
          disabled={!this.state.formValid}
          onClick={this.createPost}
          className='btn btn-primary'
        >
          Add task
        </MyButton>
      </form>
    );
  }
}

export default Form;
