import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, SafeAreaView } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';

import { TodoScreenNavigationProp } from '../navigation/TodoStack';
import { TodoStackParamList } from '../navigation/types';
import { addTodo, editTodo, fetchTodo, removeTodo, selectError, selectStatus, setTodoStatus } from '../store';

import { useAppDispatch, useAppSelector } from '../../../store';
import { styles } from '../../../styles';
import { Todo } from '../types';

type ProfileScreenRouteProp = RouteProp<TodoStackParamList, 'TodoAddEdit'>;

const TodoEdit = () => {
  const navigation = useNavigation<TodoScreenNavigationProp>();
  const route = useRoute<ProfileScreenRouteProp>();
  const index = route.params?.id;

  const dispatch = useAppDispatch();

  const status = useAppSelector(selectStatus);
  const error = useAppSelector(selectError);
  // const list = useAppSelector((state) => state.todos.list);
  // const taskToUpdate = list.find((todo) => todo.id === index);

  const [title, onChangeTitle] = useState('');
  const [description, onChangeDescription] = useState('');
  const [todoItem, setTodoItem] = useState<Todo>();

  const fetchData = async (id: string) => {
    try {
      const item = await dispatch(fetchTodo(id)).unwrap();
      item && setTodoItem(item);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    if (!index) {
      return;
    }

    fetchData(index);
  }, [index]);

  const addOrUpdateTodoItem = () => {
    if (!todoItem?.title) {
      return;
    }
    if (todoItem) {
      dispatch(editTodo({ ...todoItem, description, title }));
    } else {
      dispatch(addTodo(title, description));
    }

    onChangeTitle('');
    onChangeDescription('');

    navigation.navigate('TodoList');
  };

  const deleteTodoItem = () => {
    if (!todoItem) {
      return;
    }

    dispatch(removeTodo(todoItem.id));

    navigation.navigate('TodoList');
  };

  return (
    <SafeAreaView style={styles.container}>
      {status === 'loading'
        ? (
          <View style={styles.innerContainer}>
            <Text style={styles.textCaption}>Loading</Text>
          </View>
        )
        : (status === 'error')
          ?
          (
            <View style={styles.innerContainer}>
              <Text style={styles.textCaption}>{JSON.stringify(error)}</Text>
            </View>
          )
          :
          (<View style={styles.innerContainer}>
            <View style={styles.inputContainer}>
              <Text style={styles.textCaption}>Title:</Text>
              <TextInput style={styles.textInput} onChangeText={onChangeTitle} value={title} placeholder='Title' />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.textCaption}>Description:</Text>
              <TextInput style={styles.textInput} onChangeText={onChangeDescription} value={description} placeholder='Description' />
            </View>
            <TouchableOpacity style={styles.buttonContainer} onPress={addOrUpdateTodoItem}>
              <AntDesign name="save" size={24} color="white" />
              <Text style={styles.buttonText}>{todoItem ? 'Update' : 'Add new'} task</Text>
            </TouchableOpacity>
            {todoItem &&
              <TouchableOpacity style={styles.buttonContainer} onPress={deleteTodoItem}>
                <AntDesign name="delete" size={24} color="white" />
                <Text style={styles.buttonText}>Delete task</Text>
              </TouchableOpacity>
            }
          </View>
          )}
      <View style={styles.innerContainer}>
        <TouchableOpacity style={styles.buttonContainer} onPress={() => navigation.navigate('TodoList')}>
          <AntDesign name="arrowleft" size={24} color="white" />
          <Text style={styles.buttonText}>Back to List</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default TodoEdit;
