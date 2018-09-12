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
      updateValue: false,
      onUpdate: false,
      updateText: '',
      updateId: '',
    };
    this.checkItems = this.checkItems.bind(this);
  }

  newTodoController = (value) => {
    this.setState({newTodoItem: value});
  }

  newUpdateController = (value) => {
    this.setState({updateText: value});
  }

  renderUpdateInput = (id, text) => {
    this.setState({onUpdate: true});
    this.setState({updateText: text});
    this.setState({updateId: id});
    console.log(id);
    console.log(text);
  }

  deleteUpdateInput = () => {
    this.setState({onUpdate: false});
    this._updateData(this.state.updateText);
    console.log(this.state.updateText);
  }

  /*
    @desc Updates the 'completed' field in the to-do Object as true or false
    @params {valor:string} ID of the element to be updated
  */
  checkItems = async (valor) => {
    let values = await this._loadData();
    let index = values.findIndex( x => x.id === valor );
    values[index].completed = !values[index].completed;
    this.setState({updateValue: true});
    try{
      await AsyncStorage.setItem('todo', JSON.stringify(values));
    } catch(error) {
      console.log(error);
    }
    console.log(values);
  }

  /*
    @desc Updates data currently saved in AsyncStorage
    @params {string} New item to be saved in To-do list
  */
  _updateData = async (text) => {
    let values = await this._loadData();
    let index = values.findIndex( x => x.id == this.state.updateId);
    values[index].text = text;

    this.setState({todos: values});

    try{
      await AsyncStorage.setItem('todo', JSON.stringify(values));
    } catch(error){
      console.log(error);
    }

    this.setState({updateId: ''});
    this.setState({updateText: ''});
    console.log('data updated.');
  }

  /*
    @desc Loads data currently saved in AsyncStorage
    @returns {{id:string, text:string, completed:boolean}[]} Array of objects
  */
  _loadData = async () => {
    try{
      const getData = await AsyncStorage.getItem('todo');
      if(getData === null) {
        return "";
      }
      const parseData = JSON.parse(getData);
      this.setState({newItem: false});
      this.setState({todos: parseData});

      return parseData;
    }catch(error){
      console.log(error);
    }
  }

  /*
    @desc Appends new to-do item to existing Array and saves it to AsyncStorage
  */
  _storeData = async() => {
    try{
      let previousData = await this._loadData();
      if(previousData === null) {
        let list = [];
        previousData = await AsyncStorage.setItem('todo', JSON.stringify(list));
      }
      const ID = uuidv1();
      newObject = {
        id: ID,
        text: this.state.newTodoItem,
        completed: false,
      }
      previousData.push(newObject);

      await AsyncStorage.setItem('todo', JSON.stringify(previousData));
      this.state.newTodoItem = '';
      this.setState({todos: previousData});

    }catch(error){
      console.log(error);
    }
  }

  /*
    @desc Removes item from AsyncStorage and this.state.todos
    @params {item_id:string} ID from the to-do item to be removed
  */
  _removeItem = async (item_id) => {
    let todo = this.state.todos;
    let id = todo.findIndex(x => x.id === item_id);
    todo.splice(id, 1);
    this.setState({todos: todo});

    try{
      await AsyncStorage.setItem('todo', JSON.stringify(todo));
    }catch(error){
      console.log(error);
    }

    console.log('Removing item...');
  }

  componentDidMount() {
    // Calls _loadData to initialize to-do items saved in Async Storage
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
          onSubmitEditing={this._storeData}
          returnKeyType={'send'}
        />

        <View>
          {this.state.onUpdate &&
            <TextInput
              autoFocus={true}
              onChangeText={this.newUpdateController}
              value={this.state.updateText}
              onSubmitEditing={this.deleteUpdateInput}/>
          }
        </View>
   
        <ScrollView contentContainerStyle={styles.listContainer}>
          {this.state.todos && Object.values(this.state.todos).map( todo => <TasksList 
            check={this.checkItems} 
            id={todo.id}
            done={todo.completed}
            key={todo.id}
            text={todo.text}
            update_text={todo.text}
            complete={todo.completed} 
            remove={this._removeItem} 
            load={this._loadData}
            update={this.renderUpdateInput}
          /> )}
        </ScrollView>
      
        </View>

      </View>
    );
  }
}

/*
  Defines style for App
*/
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
