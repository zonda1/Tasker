import React, { useRef } from 'react';
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
}) => {
  const taskBorders = {
    active: {
      border: '#97cba9',
      background: '',
      opacity: '',
    },
    done: {
      border: '#680747',
      background: '',
      opacity: '',
    },
    archived: {
      border: '#000',
      background: 'rgba(155, 166, 165, 0.3)',
      opacity: '0.4',
    },
  };
  const liEl = useRef(null);
  const { title, body, id } = task;

  const getTaskId = (e) => {
    const target = e.currentTarget;
    const taskId = target.id;
    const buttonName = target.name;
    switch (buttonName) {
      case 'Unarchive':
      case 'Archive':
        liEl.current.classList.add(
          'animate__animated',
          'animate__backOutRight'
        );
        setTimeout(() => {
          liEl.current.classList.remove(
            'animate__animated',
            'animate__backOutRight'
          );
          return move_arch(taskId);
        }, 800);
        break;
      case 'Delete':
        liEl.current.classList.add('animate__animated', 'animate__backOutDown');
        setTimeout(() => del(taskId), 800);
        break;
      case 'Edit':
        edit(taskId);
        break;
      default:
        break;
    }
  };

  return (
    <li
      className='task-item'
      style={{
        borderColor: taskBorders[filterBy].border,
        backgroundColor: taskBorders[filterBy].background,
        opacity: taskBorders[filterBy].opacity,
      }}
      ref={liEl}
    >
      {filterBy !== 'archived' ? (
        <div className='form-check'>
          <input
            className='form-check-input'
            type='checkbox'
            value=''
            id={id}
            checked={filterBy === 'active' ? false : true}
            onChange={(e) => {
              liEl.current.classList.add(
                'animate__animated',
                'animate__backOutLeft'
              );
              setTimeout(() => {
                liEl.current.classList.remove(
                  'animate__animated',
                  'animate__backOutLeft'
                );
                return move_done(e.target.checked, e.target.id);
              }, 800);
            }}
          ></input>
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
