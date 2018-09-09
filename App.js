import React from 'react';
import uuidv1 from 'uuid/v1';

import {AsyncStorage} from 'react-native'

import './ReactotronConfig'

import { 
  AppRegistry, 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  Dimensions,
  ScrollView 
} from 'react-native';

import TasksList from './components/List'

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newTodoItem: '',
      todos: {},
      newItem: false,
    };
  }

  newTodoController = (value) => {
    this.setState({newTodoItem: value});
  }

  // This function is no longer necessary
  _loadData = async () => {
    try{
      const getData = await AsyncStorage.getItem('todos');
      const parseData = JSON.parse(getData);
      this.setState({newItem: false});
      this.setState({todos: parseData});
    }catch(error){
      console.log(error);
    }
  }

  _storeData = async() => {
    try{
      let previousData;
      try{
        previousData = await AsyncStorage.getItem('todos');
      }catch(error){
        console.log(error);
      }
      const ID = uuidv1();

      const parsedPreviousData = JSON.parse(previousData);
      parsedPreviousData[ID] = this.state.newTodoItem;
      
      console.log(parsedPreviousData);

      await AsyncStorage.setItem('todos', JSON.stringify(parsedPreviousData));
      this.state.newTodoItem = '';

      this.setState({todos: parsedPreviousData});

    }catch(error){
      console.log(error);
    }
  }

  addItem = () => {
    this._storeData();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.appTitle}>To-do app!</Text>
        <View style={styles.card}>
          <TextInput 
            style={styles.input} 
            placeholder="Add item!"
            value={this.state.newTodoItem}
            onChangeText={this.newTodoController}
            onSubmitEditing={this.addItem}
            returnKeyType={'send'}
          />
        <ScrollView contentContainerStyle={styles.listContainer}>
          {Object.values(this.state.todos).map( todo => <TasksList text={todo}/> )}
        </ScrollView>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#01b9f5',
    alignItems: 'center',
  },
  appTitle: {
    color: '#fff',
    fontSize: 36,
    marginTop: 60,
    marginBottom: 30,
    fontWeight: '300'
  },
  card: {
    backgroundColor: '#fff',
    flex: 1,
    width: Dimensions.get('window').width - 25,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10
  },
  input: {
    padding: 20,
    borderBottomColor: '#bbb',
    borderBottomWidth: 1,
    fontSize: 24
  },
  listContainer: {
    alignItems: 'center',
  }
});
