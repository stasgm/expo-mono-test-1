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

  const [value, onChangeText] = useState('');

  const addTodoItem = (value: string) => {
    if (!value) {
      return;
    }

    dispatch(addTodo(value));

    onChangeText('');

    navigation.navigate('TodoList');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <TextInput style={styles.textInput} onChangeText={onChangeText} value={value} placeholder="Add a task to do" />
        <TouchableOpacity style={styles.buttonContainer} onPress={() => addTodoItem(value)}>
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
  textInput: {
    height: 50,
    width: '100%',
    borderColor: theme.border,
    borderWidth: 1,
    borderBottomLeftRadius: 8,
    borderTopLeftRadius: 8,
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

export default TodoAdd;
