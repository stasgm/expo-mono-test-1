import React, { useState } from 'react';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import {View, Text, TouchableOpacity, TextInput, SafeAreaView, Dimensions } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import { TodoScreenNavigationProp } from '../navigation/TodoStack';
import { TodoStackParamList } from '../navigation/types';
import { editTodo, removeTodo } from '../store';

import { useAppDispatch, useAppSelector } from '../../../store';
import { styles } from '../../../styles';

type ProfileScreenRouteProp = RouteProp<TodoStackParamList, 'TodoEdit'>;

const TodoEdit = () => {
  const navigation = useNavigation<TodoScreenNavigationProp>();
  const route = useRoute<ProfileScreenRouteProp>();
  const index = route.params.id;

  const dispatch = useAppDispatch();
  const list = useAppSelector((state) => state.todos.list);
  const taskToUpdate = list.find((todo) => todo.id === index);

  const [title, onChangeTitle] = useState(taskToUpdate?.title);
  const [description, onChangeDescription] = useState(taskToUpdate?.description || '');

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
        <View style={styles.inputContainer}>
          <Text style={styles.textCaption}>Title:</Text>
          <TextInput style={styles.textInput} onChangeText={onChangeTitle} value={title} placeholder='Title' />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.textCaption}>Description:</Text>
          <TextInput style={styles.textInput} onChangeText={onChangeDescription} value={description} placeholder='Description' />
        </View>
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

export default TodoEdit;
