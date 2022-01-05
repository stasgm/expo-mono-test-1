import { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  StatusBar,
  RefreshControl,
} from 'react-native';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { addTodos, removeTodo, removeTodos, setTodoStatus, Todo, TodoStatus } from '../../store/todos';
import { TodoScreenNavigationProp } from '../../navigation/TodoStack';
import { useAppDispatch, useAppSelector } from '../../store';
import { deviceWidth, theme } from '../../constants/constants';
import { todosApi } from '../../services/api/todos';

const TodoList = () => {
  const navigation = useNavigation<TodoScreenNavigationProp>();

  const [loading, setLoading] = useState(false);

  const dispatch = useAppDispatch();
  const todos = useAppSelector((state) => state.todos);

  const toggleTaskStatus = (item: Todo) => {
    const status =
      item.status == TodoStatus.OPEN
        ? TodoStatus.IN_PROGRESS
        : item.status === TodoStatus.IN_PROGRESS
        ? TodoStatus.DONE
        : TodoStatus.OPEN;
    dispatch(setTodoStatus({ id: item.id, status }));
  };
  const deleteTask = (item: Todo) => dispatch(removeTodo(item.id));
  const deleteTasks = () => dispatch(removeTodos());
  const fetchData = async () => {
    // dispatch({ type: 'FETCH_INIT' });
    setLoading(true);
    try {
      const result = await todosApi.getAll();
      // console.log('result', result);
      if (result.success) {
        dispatch(addTodos(result.data));
      }
    } catch (error) {
      // dispatch({ type: 'FETCH_FAILURE' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  });

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={todos}
        keyExtractor={(_, index) => index.toString()}
        refreshControl={<RefreshControl refreshing={loading} title="Loading..." />}
        ItemSeparatorComponent={() => <View style={{ borderBottomWidth: StyleSheet.hairlineWidth }} />}
        renderItem={({ item }) => (
          <View style={styles.todoItem}>
            <TouchableOpacity onPress={() => toggleTaskStatus(item)} style={styles.todoDescription}>
              <MaterialIcons
                name={
                  item.status === TodoStatus.DONE
                    ? 'check-circle'
                    : item.status === TodoStatus.IN_PROGRESS
                    ? 'radio-button-on'
                    : 'radio-button-unchecked'
                }
                size={30}
                color={
                  item.status === TodoStatus.DONE
                    ? '#28a745'
                    : item.status === TodoStatus.IN_PROGRESS
                    ? '#0035dd'
                    : '#dc3545'
                }
              />
              <Text style={[styles.todoItemText, item.status === TodoStatus.DONE ? styles.todoItemDone : null]}>
                {item.title}
              </Text>
            </TouchableOpacity>
            <View style={styles.itemButtonsContainer}>
              <TouchableOpacity onPress={() => navigation.navigate('TodoEdit', { id: item.id })}>
                <AntDesign name="edit" size={30} color="black" style={styles.itemButton} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteTask(item)}>
                <AntDesign name="delete" size={30} color="#dc3545" style={styles.itemButton} />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      <View style={styles.innerContainer}>
        <TouchableOpacity style={styles.buttonContainer} onPress={fetchData}>
          <AntDesign name="sync" size={24} color="white" />
          <Text style={styles.buttonText}>Load from server</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonContainer} onPress={deleteTasks}>
          <AntDesign name="delete" size={24} color="white" />
          <Text style={styles.buttonText}>Delete todos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonContainer} onPress={() => navigation.navigate('TodoAdd')}>
          <AntDesign name="plus" size={24} color="white" />
          <Text style={styles.buttonText}>Add new todo</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    backgroundColor: 'white',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'column',
  },
  innerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    width: '90%',
    marginTop: 30,
    marginBottom: 20,
  },
  todoItem: {
    justifyContent: 'space-between',
    alignContent: 'center',
    flexDirection: 'row',
    width: deviceWidth - 20,
    paddingTop: 7,
    paddingBottom: 7,
    paddingLeft: 5,
    paddingRight: 5,
  },
  todoItemText: {
    lineHeight: 22,
    fontSize: 17,
  },
  todoItemDone: {
    textDecorationLine: 'line-through',
  },
  todoDescription: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  itemButtonsContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  itemButton: {
    padding: 4,
  },
  buttonContainer: {
    margin: 10,
    backgroundColor: theme.background,
    borderRadius: 8,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    width: '100%',
  },
  buttonText: {
    margin: 10,
    fontSize: 15,
    color: theme.lightText,
  },
});

export default TodoList;
