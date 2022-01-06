import { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { AntDesign } from '@expo/vector-icons';

import { addTodo } from '../store';
import { TodoScreenNavigationProp } from '../navigation/TodoStack';

import { useAppDispatch } from '../../../store';
import { styles } from '../../../styles';

const TodoAdd = () => {
  const navigation = useNavigation<TodoScreenNavigationProp>();

  const dispatch = useAppDispatch();

  const [title, onChangeTitle] = useState('');
  const [description, onChangeDescription] = useState('');

  const addTodoItem = () => {
    if (!title) {
      return;
    }

    dispatch(addTodo(title, description));

    onChangeTitle('');
    onChangeDescription('');

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
        <TouchableOpacity style={styles.buttonContainer} onPress={addTodoItem}>
          <AntDesign name="plus" size={24} color="white" />
          <Text style={styles.buttonText}>Add task</Text>
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

export default TodoAdd;
