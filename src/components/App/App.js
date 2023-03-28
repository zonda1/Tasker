import React, { Component } from 'react';
import TabsPanel from '../TabsPanel/TabsPanel';
import TaskList from '../TaskList/TaskList';
import './App.css';

const TASKS = [
  {
    id: 1,
    title: 'Food',
    body: 'make dinner',
    isDone: false,
    isArchived: false,
  },
  {
    id: 2,
    title: 'Study',
    body: 'do some homework',
    isDone: true,
    isArchived: false,
  },
  { id: 3, title: 'Sport', body: 'go to swimming pool', isArchived: true },
  { id: 4, title: 'Book', body: 'read book', isArchived: true },
];

const TASKS_STATUS = {
  active: { isDone: false, isArchived: false },
  done: { isDone: true, isArchived: false },
  archived: { isArchived: true },
};

const LINKS = ['Active', 'Done', 'Archived'];
const BUTTONS = ['Edit', 'Deleate', 'Done', 'Archive'];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: TASKS,
      filterBy: 'active',
    };
  }

  static isEqual(obj1, obj2) {
    const props1 = Object.getOwnPropertyNames(obj1);
    const props2 = Object.getOwnPropertyNames(obj2);

    if (props1.length !== props2.length) {
      return false;
    }

    for (let i = 0; i < props1.length; i += 1) {
      const prop = props1[i];

      if (obj1[prop] !== obj2[prop]) {
        return false;
      }
    }
    return true;
  }

  static checkTask = (task, buttonsArr) => {
    if (task.isDone === true && task.isArchived === false) {
      return [...buttonsArr.slice(0, 2), ...buttonsArr.slice(-1)];
    } else if (task.isArchived === true) {
      return [...buttonsArr.slice(0, 2), 'Unarchive'];
    } else {
      return buttonsArr;
    }
  };

  getFilteredTasks = () =>
    this.state.tasks.filter((t) => {
      const obj =
        t.isDone !== undefined
          ? { isDone: t.isDone, isArchived: t.isArchived }
          : { isArchived: t.isArchived };
      // console.log('getFilteredTasks worked');
      return App.isEqual(obj, TASKS_STATUS[this.state.filterBy]);
    });

  changeFilter = (filter) => {
    this.setState({ filterBy: filter });
  };

  moveArchive = (id) => {
    this.setState((state) => {
      const res = state.tasks.find((el) => el.id == id);
      const otherRes = state.tasks.filter((el) => el.id != id);
      
      //check if archived
      if (res.isDone === undefined) {
        res.isDone = false;
        res.isArchived = false;
        const newState = [...otherRes, res];
        return { tasks: newState };
      }

      //check if done or if active
      if (res.isDone || res.isDone === false) {
        delete res.isDone;
        res.isArchived = true;
        const newState = [...otherRes, res];
        return { tasks: newState };
      }
    });
  };
  moveToDone = (id) => {
    this.setState((state) => {
      const res = state.tasks.find((el) => el.id == id);
      const otherRes = state.tasks.filter((el) => el.id != id);
      res.isDone = true;
      res.isArchived = false;
      const newState = [...otherRes, res];
      return { tasks: newState };
    });
  };

  render() {
    const filteredTasks = this.getFilteredTasks();
    console.log(filteredTasks);

    const filteredButtons = filteredTasks.length
      ? App.checkTask(filteredTasks[0], BUTTONS)
      : [];
    // console.log(filteredButtons);

    return (
      <div className='wrapper'>
        <div className='task-table'>
          <h1>Tasker</h1>
          <TabsPanel links={LINKS} change={this.changeFilter}></TabsPanel>
          {filteredTasks.length ? (
            <TaskList
              tasks={filteredTasks}
              buttons={filteredButtons}
              move_arch={this.moveArchive}
              move_done={this.moveToDone}
            ></TaskList>
          ) : (
            <div>
              <h2>There're no {this.state.filterBy} tasks</h2>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default App;
