import React from 'react';
import MyButton from '../UI/MyButton/MyButton';

const Task = ({
  task,
  number,
  buttons,
  move_arch,
  move_done,
  del,
  edit,
  filterBy,
  isChecked
}) => {
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
      // case 'Done':
      //   move_done(taskId);
      //   break;
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
      {filterBy !== 'archived' ? (
        <div className='form-check'>
          <input
            className='form-check-input'
            type='checkbox'
            value=''
            id={id}
            checked={filterBy==='active'?false:true}
            onChange={e=>move_done(e.target.checked,e.target.id)}
          ></input>
          {/* <label class='form-check-label' for='flexCheckDefault'>
          Default checkbox
        </label> */}
        </div>
      ) : (
        ''
      )}

      <div className='task-item__descr'>
        <h2>
          <span>{number}. </span>
          {title}
        </h2>
        <p>{body}</p>
      </div>
      <div className='task-item__buttons'>
        {buttons.map((button, index) => (
          <MyButton
            id={id}
            key={index}
            name={button.name}
            className='btn btn-primary'
            style={{ width: '70px' }}
            onClick={getTaskId}
          >
            <i className={`bi ${button.styleClass}`}></i>
          </MyButton>
        ))}
      </div>
    </li>
  );
};

export default Task;
