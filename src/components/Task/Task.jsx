import React from 'react';
import MyButton from '../UI/MyButton/MyButton';

const Task = ({ task, number, buttons, move_arch, move_done, del, edit }) => {
  const { title, body, id } = task;

  const getTaskId = (e) => {
    const target = e.currentTarget;
    const taskId = target.id;
    const buttonName = target.name;
    switch (buttonName) {
      case 'Unarchive':
      case 'Archive':
        move_arch(taskId);
        break;
      case 'Done':
        move_done(taskId);
        break;
      case 'Delete':
        del(taskId);
        break;
      case 'Edit':
        edit(taskId);
        break;
      default:
        break;
    }
  };

  return (
    <li className='task-item'>
      <div className='task-item__descr'>
        <h2>
          <span>{number}. </span>
          {title}
        </h2>
        <p>{body}</p>
      </div>
      <div className='task-item__buttons'>
        {buttons.map((button, index) => (
          <MyButton id={id} key={index} name={button.name} className='btn btn-primary' style={{width:'120px'}} onClick={getTaskId}>
            <i className={`bi ${button.class}`}> {button.name}</i>
          </MyButton>
        ))}
      </div>
    </li>
  );
};

export default Task;
