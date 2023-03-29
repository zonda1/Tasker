import React, { Component } from 'react';
import MyButton from '../UI/MyButton/MyButton';
import MyInput from '../UI/MyInput/MyInput';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      body: '',
    };
  }

  createPost = () => {
    const newPost = {
      id: Date.now(),
      title: this.state.title,
      body: this.state.body,
      isDone: false,
        isArchived: false 
    };
    console.log(newPost);
    this.props.add(newPost);
    this.setState({ title: '', body: '' });
  };

  render() {
    return (
      <div className='add__block'>
        <MyInput
          type='text'
          placeholder='Task title'
          value={this.state.title}
          onChange={(e) => this.setState({ title: e.target.value })}
        />
        <MyInput
          type='text'
          placeholder='Task body'
          value={this.state.body}
          onChange={(e) => this.setState({ body: e.target.value })}
        />
        <MyButton onClick={this.createPost}>Add task</MyButton>
      </div>
    );
  }
}

export default Form;
