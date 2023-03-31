import React, { Component } from 'react';
import { ThemeContex } from '../../contex/themeContex';
import Form from '../Form/Form';
import Modal from '../Modal/Modal';
import TabsPanel from '../TabsPanel/TabsPanel';
import TaskList from '../TaskList/TaskList';
import MyButton from '../UI/MyButton/MyButton';
import Utils from '../Utils/Utils';
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
  { id: 4, title: 'Book', body: 'read a book', isArchived: true },
  {
    id: 5,
    title: 'Walk',
    body: 'take a walk',
    isDone: true,
    isArchived: false,
  },
  { id: 6, title: 'Market', body: 'buy some fruits', isArchived: true },
  {
    id: 7,
    title: 'Sport',
    body: 'play football',
    isDone: true,
    isArchived: false,
  },
  {
    id: 8,
    title: 'Travel',
    body: 'go to resort this summer',
    isDone: false,
    isArchived: false,
  },
];

const TASKS_STATUS = {
  active: { isDone: false, isArchived: false },
  done: { isDone: true, isArchived: false },
  archived: { isArchived: true },
};

const LINKS = ['Active', 'Done', 'Archived'];
const BUTTONS = [
  { name: 'Edit', class: 'bi-pencil-square' },
  { name: 'Delete', class: 'bi-trash' },
  { name: 'Done', class: 'bi-check-square' },
  { name: 'Archive', class: 'bi-file-earmark-zip' },
];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: TASKS,
      filterBy: 'active',
      modalView: false,
      theme: 'light',
    };
  }

  getFilteredTasks = () =>
    this.state.tasks.filter((t) => {
      const obj =
        t.isDone !== undefined
          ? { isDone: t.isDone, isArchived: t.isArchived }
          : { isArchived: t.isArchived };
      return Utils.isEqual(obj, TASKS_STATUS[this.state.filterBy]);
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
        //check if done or if active
      } else {
        delete res.isDone;
        res.isArchived = true;
      }
      const newState = [...otherRes, res];
      return { tasks: newState };
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

  deleteTask = (id) => {
    this.setState((state) => {
      const newState = state.tasks.filter((el) => el.id != id);
      return { tasks: newState };
    });
  };

  toggleModal = () => {
    this.setState((state) => ({ modalView: !state.modalView }));
  };

  addTask = (post) => {
    this.setState({ tasks: [...this.state.tasks, post] });
    this.setState({ modalView: false });
  };

  editTask = (id) => {
    const newTaskTitle = prompt("Let's make new title");
    const newTaskBody = prompt("Let's make new description");
    const { tasks } = this.state;
    const editedTask = tasks.find((t) => t.id == id);
    editedTask.title = newTaskTitle;
    editedTask.body = newTaskBody;
    this.setState({ tasks });
  };

  toggleTheme = () => {
    this.setState(({ theme }) => ({
      theme: theme === 'light' ? 'dark' : 'light',
    }));
    console.log(this.context);
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps === this.props && prevState === this.state) return;
    document.querySelector('.wrapper').dataset.theme = this.state.theme;
    document.querySelector('.task-table').dataset.theme = this.state.theme;
    document.body.dataset.theme = this.state.theme;
    console.log(this.context);
    localStorage.setItem('items', JSON.stringify(this.state.tasks));
  }

  componentDidMount() {
    const items = JSON.parse(localStorage.getItem('items'));
    if (items) {
      this.setState({ tasks: items });
    }
  }

  render() {
    const filteredTasks = this.getFilteredTasks();

    const filteredButtons = filteredTasks.length
      ? Utils.checkTask(filteredTasks[0], BUTTONS)
      : [];

    return (
      <ThemeContex.Provider value={this.state.theme}>
        <div data-theme='light' className='wrapper'>
          <div data-theme='light' className='task-table'>
            <h1>Tasker</h1>
            <div className='edit-panel'>
              <MyButton class='btn btn-info' onClick={this.toggleModal}>
                <i class='bi bi-plus-lg'></i>
              </MyButton>
              <MyButton class='btn btn-info' onClick={this.toggleTheme}>
                {<i class='bi bi-lightbulb-fill'></i>}
              </MyButton>
            </div>
            <Modal visible={this.state.modalView} toggle={this.toggleModal}>
              <Form add={this.addTask}></Form>
            </Modal>
            <TabsPanel links={LINKS} change={this.changeFilter}></TabsPanel>
            {filteredTasks.length ? (
              <TaskList
                tasks={filteredTasks}
                buttons={filteredButtons}
                move_arch={this.moveArchive}
                move_done={this.moveToDone}
                del={this.deleteTask}
                edit={this.editTask}
              ></TaskList>
            ) : (
              <div>
                <h2>There're no {this.state.filterBy} tasks</h2>
              </div>
            )}
          </div>
        </div>
      </ThemeContex.Provider>
    );
  }
}

export default App;
