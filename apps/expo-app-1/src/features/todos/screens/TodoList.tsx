import { useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  RefreshControl,
} from 'react-native';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';

import { TodoScreenNavigationProp } from '../navigation/TodoStack';
import { fetchTodos, removeTodo, removeTodos, selectStatus, setTodoStatus } from '../store';
import { Todo, TodoStatus } from '../types';

import { useAppDispatch, useAppSelector } from '../../../store';
import { styles } from '../../../styles';
import { deviceWidth } from '../../../constants';

const TodoList = () => {
  const navigation = useNavigation<TodoScreenNavigationProp>();

  const dispatch = useAppDispatch();

  const list = useAppSelector((state) => state.todos.list);
  const status = useAppSelector(selectStatus);

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
    try {
      const resp = await dispatch(fetchTodos()).unwrap();

      Toast.show({
        type: 'info',
        text1: 'Loaded!'
      });
    } catch (err) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: err.message
      });
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={list}
        keyExtractor={(_, index) => index.toString()}
        refreshControl={<RefreshControl refreshing={status === 'loading'} title="Loading..." />}
        ItemSeparatorComponent={() => <View style={{ borderBottomWidth: StyleSheet.hairlineWidth }} />}
        renderItem={({ item }) => (
          <View style={localStyles.todoItem}>
            <TouchableOpacity onPress={() => toggleTaskStatus(item)} style={localStyles.todoDescription}>
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
              <Text style={[localStyles.todoItemText, item.status === TodoStatus.DONE ? localStyles.todoItemDone : null]}>
                {item.title}
              </Text>
            </TouchableOpacity>
            <View style={localStyles.itemButtonsContainer}>
              <TouchableOpacity onPress={() => navigation.navigate('TodoAddEdit', { id: item.id })}>
                <AntDesign name="edit" size={30} color="black" style={localStyles.itemButton} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteTask(item)}>
                <AntDesign name="delete" size={30} color="#dc3545" style={localStyles.itemButton} />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      <View style={styles.innerContainer}>
        <TouchableOpacity style={styles.buttonContainer} onPress={fetchData} disabled={status === 'loading'}>
          <AntDesign name="sync" size={24} color="white" />
          <Text style={styles.buttonText}>Load from server</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonContainer} onPress={deleteTasks} disabled={status === 'loading'}>
          <AntDesign name="delete" size={24} color="white" />
          <Text style={styles.buttonText}>Delete todos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonContainer} onPress={() => navigation.navigate('TodoAddEdit')} disabled={status === 'loading'}>
          <AntDesign name="plus" size={24} color="white" />
          <Text style={styles.buttonText}>Add new todo</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const localStyles = StyleSheet.create({
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
});

export default TodoList;
