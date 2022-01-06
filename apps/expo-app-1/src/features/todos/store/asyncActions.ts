import { createAsyncThunk } from "@reduxjs/toolkit"
import { AxiosError } from "axios"

import { IErrorMessage } from "../../../services/api/types"
import { todosApi } from "../api"
import { Todo } from "../types"

// thunk
const fetchTodos = createAsyncThunk<Todo[], void, { rejectValue: IErrorMessage }>(
  'todos/fetchAll',
  async (_, thunkApi) => {
    try {
      const response = await todosApi.getAll()
      if (response.success) {
        return response.data

      }
      // TODO infer data type
      return thunkApi.rejectWithValue(response.data as IErrorMessage)
    } catch (err) {
      return thunkApi.rejectWithValue({ error: err.message } as IErrorMessage)
    }
  }
)

const fetchTodo = createAsyncThunk<Todo, string, { rejectValue: IErrorMessage }>(
  'todos/fetchById',
  async (id: string, thunkApi) => {
    try {
      const response = await todosApi.get(id)

      if (response.success) {
        return response.data
      }

      throw response.data;
      // TODO infer data type
      // return thunkApi.rejectWithValue(response.data as IErrorMessage)
    } catch (err) {
      const error: AxiosError<IErrorMessage> = err;
      if (!error.response) {
        throw err
      }
      return thunkApi.rejectWithValue(error.response.data)
      // return thunkApi.rejectWithValue({ error: err.message } as IErrorMessage)
    }
  }
)

export { fetchTodo, fetchTodos }
