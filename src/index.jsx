import React from 'react';
import { render } from 'react-dom';
import todoApp from './reducers.js';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

const store = createStore (todoApp);

const FilterLink = ({
  filter,
  currentFilter,
  children
}) => {
  if (currentFilter === filter) {
    return <span>{children}</span>
  };

  return (
    <a  href='#'
        onClick={e => {
          e.preventDefault();
          store.dispatch({
            type: 'SET_VISIBILITY_FILTER',
            filter
          })
        }}>
        {children}
    </a>
  )
}

const getVisibleTodos = (
  todos,
  filter
) => {
  switch (filter) {
    case 'SHOW_ALL':
      return todos;
    break;
    case 'SHOW_COMPLETED':
      return todos.filter (
        t => t.completed
      )
    break;
    case 'SHOW_ACTIVE':
      return todos.filter (
        t => !t.completed
      )
    break;
  }
}


const Todo = ({
  onClick,
  completed,
  text
}) => (
  <li
    onClick={onClick}
    style={{
      textDecoration: completed ? 'line-through':''
    }}>
    {text}
  </li>
);

const TodoList = ({
    todos,
    onTodoClick
}) => (
  <ul>
    {todos.map (todo =>
      <Todo
        key={todo.id}
        {...todo}
        onClick={() => onTodoClick(todo.id)}>
      </Todo>
    )}
  </ul>
);

var counter = 0;
const App = React.createClass ({
  dispatch () {
    const text = this.input.value;
    store.dispatch ({type: 'ADD_TODO', text: text, id: counter++});
    this.input.value = '';
  },

  render () {
    let { visibilityFilter, todos } = this.props;
    let visibleTodos = getVisibleTodos (todos, visibilityFilter);

    return (
      <div>
        <input ref={node => {this.input = node;}}/>
        <button onClick={this.dispatch}>Add Todo</button>
        <TodoList
          todos={visibleTodos}
          onTodoClick={id =>

            store.dispatch ({
              type: 'TOGGLE_TODO',
              id
            })
          }/>
        <p>
          Show:
          {' '}
          <FilterLink currentFilter={visibilityFilter} filter='SHOW_ALL'>All</FilterLink>
          {' '}
          <FilterLink currentFilter={visibilityFilter} filter='SHOW_ACTIVE'>Active</FilterLink>
          {' '}
          <FilterLink currentFilter={visibilityFilter} filter='SHOW_COMPLETED'>Completed</FilterLink>
        </p>
        </div>
    );
  }
})

const renderer = function () {
  render (
    <Provider store={store}>
      <App {...store.getState()}/>
    </Provider>,
    document.getElementById('app')
  );
}
store.subscribe (renderer);
renderer();
