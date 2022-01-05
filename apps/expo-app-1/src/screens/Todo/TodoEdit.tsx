import React, { useState } from 'react';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, SafeAreaView, Dimensions } from 'react-native';

import { TodoScreenNavigationProp } from '../../navigation/TodoStack';
import { TodoStackParamList } from '../../navigation/types';
import { useAppDispatch, useAppSelector } from '../../store';
import { editTodo, removeTodo } from '../../store/todos';
import { AntDesign } from '@expo/vector-icons';
import { theme } from '../../constants/constants';

const { width } = Dimensions.get('window');

type ProfileScreenRouteProp = RouteProp<TodoStackParamList, 'TodoEdit'>;

const TodoEdit = () => {
  const navigation = useNavigation<TodoScreenNavigationProp>();
  const route = useRoute<ProfileScreenRouteProp>();
  const index = route.params.id;

  const dispatch = useAppDispatch();
  const todos = useAppSelector((state) => state.todos);
  const taskToUpdate = todos.find((todo) => todo.id === index);

  const [title, onChangeTitle] = useState(taskToUpdate?.title);
  const [description, onChangeDescription] = useState(taskToUpdate?.description || '');
  onChangeDescription;

  const updateTodoItem = () => {
    if (!title || !taskToUpdate) {
      return;
    }

    dispatch(editTodo({ ...taskToUpdate, description, title }));

    onChangeTitle('');
    onChangeDescription('');

    navigation.navigate('TodoList');
  };

  const deleteTodoItem = () => {
    if (!taskToUpdate) {
      return;
    }

    dispatch(removeTodo(taskToUpdate.id));

    navigation.navigate('TodoList');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <TextInput style={styles.textInput} onChangeText={onChangeTitle} value={title} />
        <TextInput style={styles.textInput} onChangeText={onChangeDescription} value={description} />
        <TouchableOpacity style={styles.buttonContainer} onPress={updateTodoItem}>
          <AntDesign name="save" size={24} color="white" />
          <Text style={styles.buttonText}>Update task</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonContainer} onPress={deleteTodoItem}>
          <AntDesign name="delete" size={24} color="white" />
          <Text style={styles.buttonText}>Delete task</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.innerContainer}>
        <TouchableOpacity style={styles.buttonContainer} onPress={() => navigation.navigate('TodoList')}>
          <AntDesign name="arrowleft" size={24} color="white" />
          <Text style={styles.buttonText}>Back to List</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    width: width,
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
  text: {
    color: theme.text,
    fontSize: 20,
    fontWeight: 'bold',
  },
  textInput: {
    margin: 5,
    height: 50,
    width: '100%',
    borderColor: theme.border,
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 10,
    fontSize: 17,
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

export default TodoEdit;
