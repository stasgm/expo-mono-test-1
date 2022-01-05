import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { RootState } from '.';
import { todosApi } from '../services/api/todos';
import { IErrorMessage } from '../services/api/types';

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

type TodosState = {
  // status: "loading" | "idle";
  loading: boolean;
  error: string | null;
  list: Todo[];
};

const initialState = {
  list:
    [
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
    ] as Todo[],
  loading: false,
  error: null,
} as TodosState;

// thunk
const fetchTodos = createAsyncThunk<Todo[], undefined, { rejectValue: IErrorMessage } >(
  'todos/fetchAll',
  async (undefined, thunkApi) => {
    const response = await todosApi.getAll()
    if (response.success) {
      return response.data

    }
    // TODO infer data type
    return thunkApi.rejectWithValue(response.data as IErrorMessage)
  }
)

// Slice
const slice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    // addTodos(state, action: PayloadAction<Todo[]>) {
    //   state.list = action.payload
    // },
    removeTodos(state) {
      state.list = [];
    },
    addTodo: {
      reducer: (state, action: PayloadAction<Todo>) => {
        state.list.unshift(action.payload);
      },
      prepare: (title: string, description?: string) => ({
        payload: {
          id: uuidv4(),
          title,
          description,
          status: TodoStatus.OPEN,
        } as Todo,
      }),
    },
    removeTodo(state, action: PayloadAction<string>) {
      const index = state.list.findIndex((todo) => todo.id === action.payload);
      state.list.splice(index, 1);
    },
    setTodoStatus(state, action: PayloadAction<{ status: TodoStatus; id: string }>) {
      const index = state.list.findIndex((todo) => todo.id === action.payload.id);
      state.list[index].status = action.payload.status;
    },
    editTodo(state, action: PayloadAction<Todo>) {
      const index = state.list.findIndex((todo) => todo.id === action.payload.id);
      state.list[index] = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTodos.pending, (state) => {
      state.loading = true;
      state.error = null;
    }),
    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      state.list = action.payload;
      state.loading = false;
      state.error = null;
    }),
    builder.addCase(fetchTodos.rejected, (state, { payload }) => {
      if (payload) {
        state.error = payload.error;
      };
      state.loading = false;
    });
  },
});

// selectors
export const selectLoading = (state: RootState) => state.todos.loading;

// Actions
export const { removeTodos, addTodo, removeTodo, editTodo, setTodoStatus } = slice.actions;

// Async Actions
export { fetchTodos };

// Reducer
export default slice.reducer;
