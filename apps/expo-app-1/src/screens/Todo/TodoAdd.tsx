import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, Dimensions, SafeAreaView } from 'react-native';
import { addTodo } from '../../store/todos';
import { AntDesign } from '@expo/vector-icons';
import { useAppDispatch } from '../../store';
import { useNavigation } from '@react-navigation/core';
import { TodoScreenNavigationProp } from '../../navigation/TodoStack';
import { theme } from '../../constants/constants';

const { width } = Dimensions.get('window');

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
  inputContainer: {
    width: '100%',
    flexDirection: 'column',
  },
  textInput: {
    marginVertical: 5,
    height: 50,
    width: '100%',
    borderColor: theme.border,
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 10,
    fontSize: 17,
  },
  textCaption: {
    marginHorizontal: 5,
    marginVertical: 5,
    textTransform: 'uppercase',
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

export default TodoAdd;
