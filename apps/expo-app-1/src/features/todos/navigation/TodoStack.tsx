import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';

import TodoAddEdit from '../screens/TodoAddEdit';
import TodoAdd from '../screens/TodoAdd';
import TodoEdit from '../screens/TodoEdit';
import TodoList from '../screens//TodoList';

import { TodoStackParamList } from './types';

const Stack = createStackNavigator<TodoStackParamList>();

const TodoNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="TodoList" screenOptions={{ headerShown: false }}>
      <Stack.Screen key="TodoList" name="TodoList" component={TodoList} options={{ title: 'Todo list' }} />
      <Stack.Screen key="TodoAddEdit" name="TodoAddEdit" component={TodoAddEdit} />
      <Stack.Screen key="TodoAdd" name="TodoAdd" component={TodoAdd} options={{ title: 'Todo add' }} />
      <Stack.Screen key="TodoEdit" name="TodoEdit" component={TodoEdit} options={{ title: 'Todo edit' }} />
    </Stack.Navigator>
  );
};

export type TodoScreenNavigationProp = StackNavigationProp<TodoStackParamList>;

export default TodoNavigator;
