import { combineReducers } from 'redux';
import expect from 'expect';

const todos = function (state = [], action = {type: null}) {

    switch (action.type) {
      case 'ADD_TODO':
        return [
          ...state,
          {
            id: action.id,
            text: action.text,
            completed: false
          }
        ]

      break;
      case 'TOGGLE_TODO':
      console.log (action)
        return state.map (
           (item) => {
             console.log ('i', item);
            if (item.id !== action.id) {
              return item;
            }

            console.log ('r', state, !item.completed, item.completed);
            return Object.assign (item, {completed: !item.completed})
          }
        )
      break;
      default:
        return state;
    }
};

const visibilityFilter = function (state = 'SHOW_ALL', action = { type: null }) {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter;
    break;
    default: return state;
  }
};

const showState = function (state = [], action) {
  console.log (JSON.stringify(state));
  return state;
}

const todoApp = combineReducers ({
  todos,
  visibilityFilter,
  showState
});

export default todoApp;

// Tests
expect (todos()).toEqual ([]).toEqual ([]);
expect (visibilityFilter ()).toEqual ('SHOW_ALL');
