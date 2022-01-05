import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

export interface Todo {
  id: string;
  title: string;
  description: string;
  status: TodoStatus;
}

export enum TodoStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

const initialState = [
  {
    id: uuidv4(),
    title: 'Add api request',
    description: 'for all endpoints',
    status: TodoStatus.OPEN,
  },
  {
    id: uuidv4(),
    title: 'Create add\\edit component',
    description: 'Join edit and add screens in one',
    status: TodoStatus.OPEN,
  },
  {
    id: uuidv4(),
    title: 'Add todo',
    description: 'todo list',
    status: TodoStatus.DONE,
  },
  {
    id: uuidv4(),
    title: 'Create a new project',
    description: 'for testing',
    status: TodoStatus.IN_PROGRESS,
  },
] as Todo[];

// Slice
const slice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodos: (_state, action: PayloadAction<Todo[]>) => action.payload,
    removeTodos: () => [],
    addTodo: {
      reducer: (state, action: PayloadAction<Todo>) => {
        state.push(action.payload);
      },
      prepare: (description: string) => ({
        payload: {
          id: uuidv4(),
          description,
          status: TodoStatus.OPEN,
        } as Todo,
      }),
    },
    removeTodo(state, action: PayloadAction<string>) {
      const index = state.findIndex((todo) => todo.id === action.payload);
      state.splice(index, 1);
    },
    setTodoStatus(state, action: PayloadAction<{ status: TodoStatus; id: string }>) {
      const index = state.findIndex((todo) => todo.id === action.payload.id);
      state[index].status = action.payload.status;
    },
    editTodo(state, action: PayloadAction<Todo>) {
      const index = state.findIndex((todo) => todo.id === action.payload.id);
      state[index] = action.payload;
    },
  },
});

// Actions
export const { addTodos, removeTodos, addTodo, removeTodo, editTodo, setTodoStatus } = slice.actions;

// Reducer
export default slice.reducer;
