import React from 'react';
import MyButton from '../UI/MyButton/MyButton';

const Task = ({ task, number, buttons, move_arch, move_done,del }) => {
  const { title, body, id } = task;

  const getTaskId = (e) => {
    const target = e.target;
    const taskId = target.id;
    const buttonName = target.innerHTML;
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
          <MyButton id={id} key={index} onClick={getTaskId}>
            {button}
          </MyButton>
        ))}
      </div>
    </li>
  );
};

export default Task;
