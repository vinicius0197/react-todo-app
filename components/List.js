import React, {Component} from 'react';
import AsyncStorage from 'react-native'

import {
	View, 
	Text,
	StyleSheet,
	TouchableOpacity,
	Dimensions,
	Alert
}from 'react-native';

const { heigth, width } = Dimensions.get('window');

export default class TasksList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isEditing: false,
			isDone: false,
		}
	}

	markTask = () => {
		this.setState(prevState => {
			return{
				isDone: !prevState.isDone
			}
		})
	}

	displayPrompt = () => {
		Alert.alert(
			'Remove task?',
			'Do you wish to remove this task?',
			[
				{text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
				{text: 'Remove', onPress: () => this.props.remove(this.props.id)},
			],
			{ cancelable: false }
		)
	}

	render() {
		return(
			<View style={styles.container}>
				<TouchableOpacity onPress={this.markTask} onLongPress={this.displayPrompt}>
					<Text style={this.state.isDone ? styles.completeTask : styles.incompleteTask}> {this.props.text} </Text>
				</TouchableOpacity>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		width: width - 50,
		borderBottomColor: '#bbb',
		borderBottomWidth: StyleSheet.hairlineWidth,
		flexDirection: 'row',
		alignItems: 'center'
	},

	incompleteTask: {
		fontWeight: '500',
		fontSize: 18,
		marginVertical: 20
	},

	completeTask: {
		fontWeight: '500',
		fontSize: 18,
		marginVertical: 20,
		color: '#D3D3D3',
		textDecorationLine: 'line-through'
	}
});