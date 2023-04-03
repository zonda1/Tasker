import React, { Component } from 'react';
import { ThemeContex } from '../../contex/themeContex';
import Form from '../Form/Form';
import Modal from '../Modal/Modal';
import TabsPanel from '../TabsPanel/TabsPanel';
import TaskList from '../TaskList/TaskList';
import MyButton from '../UI/MyButton/MyButton';
import Utils from '../Utils/Utils';
import './App.css';
import MyInput from '../UI/MyInput/MyInput';

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
  { name: 'Edit', styleClass: 'bi-pencil-square' },
  { name: 'Delete', styleClass: 'bi-trash' },
  // { name: 'Done', styleClass: 'bi-check-square' },
  { name: 'Archive', styleClass: 'bi-file-earmark-zip' },
];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: TASKS,
      filterBy: 'active',
      modalView: false,
      theme: 'light',
      editedTaskId: '',
      modalMode: '',
      query: '',
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

  moveToDoneOrToActive = (checked, id) => {
    this.setState((state) => {
      const res = state.tasks.find((el) => el.id == id);
      const otherRes = state.tasks.filter((el) => el.id != id);
      if (checked) {
        res.isDone = true;
      } else {
        res.isDone = false;
      }

      return { tasks: [...otherRes, res] };
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

  getEditedTaksId = (id) => {
    this.toggleModal();
    this.setState({ editedTaskId: id, modalMode: 'edit' });
  };

  editTask = (newTitle, newBody) => {
    const { tasks, editedTaskId } = this.state;
    const editedTask = tasks.find((t) => t.id == editedTaskId);
    const editedTaskIndex = tasks.indexOf(editedTask);
    editedTask.title = newTitle;
    editedTask.body = newBody;
    const newTasks = [
      ...tasks.slice(0, editedTaskIndex),
      editedTask,
      ...tasks.slice(editedTaskIndex + 1),
    ];
    this.setState({ tasks: [...newTasks], modalView: false });
  };

  toggleTheme = () => {
    this.setState(({ theme }) => ({
      theme: theme === 'light' ? 'dark' : 'light',
    }));
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps === this.props && prevState === this.state) return;
    document.querySelector('.wrapper').dataset.theme = this.state.theme;
    document.querySelector('.task-table').dataset.theme = this.state.theme;
    document.body.dataset.theme = this.state.theme;
    // localStorage.setItem('items', JSON.stringify(this.state.tasks));
  }

  componentDidMount() {
    // const items = JSON.parse(localStorage.getItem('items'));
    // if (items) {
    //   this.setState({ tasks: items });
    // }
  }

 

  render() {
    const filteredTasks = this.getFilteredTasks();

    const getFilteredByQuery= filteredTasks.filter((t) =>
      t.title.toLowerCase().includes(this.state.query)
    );

    const filteredButtons = filteredTasks.length
      ? Utils.checkTask(filteredTasks[0], BUTTONS)
      : [];

    return (
      <ThemeContex.Provider value={this.state.theme}>
        <div data-theme='light' className='wrapper'>
          <div data-theme='light' className='task-table'>
            <h1>Tasker</h1>
            <div className='edit-panel'>
              <MyButton
                className='btn btn-info'
                onClick={() => {
                  this.toggleModal();
                  this.setState({ modalMode: 'create' });
                }}
              >
                <i className='bi bi-plus-lg'></i>
              </MyButton>
              <MyInput
                value={this.state.query}
                placeholder='Search...'
                onChange={e => this.setState({query:e.target.value})}
              ></MyInput>
              <MyButton className='btn btn-info' onClick={this.toggleTheme}>
                {<i className='bi bi-lightbulb-fill'></i>}
              </MyButton>
            </div>
            <Modal visible={this.state.modalView} toggle={this.toggleModal}>
              <Form
                add={this.addTask}
                edit={this.editTask}
                modalMode={this.state.modalMode}
              ></Form>
            </Modal>
            <TabsPanel
              links={LINKS}
              change={this.changeFilter}
              current={this.state.filterBy}
            ></TabsPanel>
            {getFilteredByQuery.length ? (
              <TaskList
                filterBy={this.state.filterBy}
                tasks={getFilteredByQuery}
                buttons={filteredButtons}
                move_arch={this.moveArchive}
                move_done={this.moveToDoneOrToActive}
                del={this.deleteTask}
                edit={this.getEditedTaksId}
                isChecked={this.state.isChecked}
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
