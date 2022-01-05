import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';

import TodoAdd from '../screens/Todo/TodoAdd';
import TodoEdit from '../screens/Todo/TodoEdit';
import TodoList from '../screens/Todo/TodoList';

import { TodoStackParamList } from './types';

const Stack = createStackNavigator<TodoStackParamList>();

const TodoNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="TodoList" screenOptions={{ headerShown: false }}>
      <Stack.Screen key="To" name="TodoList" component={TodoList} options={{ title: 'Todo list' }} />
      <Stack.Screen key="TodoAdd" name="TodoAdd" component={TodoAdd} options={{ title: 'Todo add' }} />
      <Stack.Screen key="To" name="TodoEdit" component={TodoEdit} options={{ title: 'Todo edit' }} />
    </Stack.Navigator>
  );
};

export type TodoScreenNavigationProp = StackNavigationProp<TodoStackParamList>;

export default TodoNavigator;
