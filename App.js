import React from 'react';
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
    this.state = {newTodo: ''};
  }

  newTodoController = (value) => {
    this.setState({newTodo: value});
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.appTitle}>To-do app!</Text>
        <View style={styles.card}>
          <TextInput 
            style={styles.input} 
            placeholder="Add item!"
            value={this.state.newTodo}
            onChangeText={this.newTodoController}
            returnKeyType={'send'} 
            
          />
        <ScrollView contentContainerStyle={styles.listContainer}>
          <TasksList/>
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
