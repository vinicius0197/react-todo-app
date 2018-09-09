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
      todos: [],
      newItem: false,
    };
  }

  newTodoController = (value) => {
    this.setState({newTodoItem: value});
  }

  _loadData = async () => {
    try{
      const getData = await AsyncStorage.getItem('todo');
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
        previousData = await AsyncStorage.getItem('todo');
      }catch(error){
        console.log(error);
      }
      const ID = uuidv1();
      const parsedPreviousData = JSON.parse(previousData);
      newObject = {
        id: ID,
        text: this.state.newTodoItem,
      }
      parsedPreviousData.push(newObject);
      
      console.log(parsedPreviousData);

      await AsyncStorage.setItem('todo', JSON.stringify(parsedPreviousData));
      this.state.newTodoItem = '';
      this.setState({todos: parsedPreviousData});

    }catch(error){
      console.log(error);
    }
  }

  addItem = () => {
    this._storeData();
  }

  componentDidMount() {
    // Initialize previous to-do items in list
    this._loadData();
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
          {Object.values(this.state.todos).map( todo => <TasksList key={todo.id} text={todo.text}/> )}
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
