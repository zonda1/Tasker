import React from 'react';
import Task from '../Task/Task';
import './TaskList.css';

const TaskList = ({ tasks,buttons,move_arch,move_done }) => {
  return (
    <div>
      <div className='task-panel'>
        <ul className='task-list'>
          {tasks.map((task,index) => (
            <Task key={task.id} number={index+1} id={task.id} task={task} buttons={buttons} move_arch={move_arch} move_done={move_done}></Task>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TaskList;
