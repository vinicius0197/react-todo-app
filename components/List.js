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
	}

	markTask = () => {
		this.props.check(this.props.id);
	}

	displayPrompt = () => {
		Alert.alert(
			'Update task',
			'Do you wish to update this task?',
			[
				{text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
				{text: 'Update', onPress: () => this.props.update(this.props.update_text)},
				{text: 'Remove', onPress: () => this.props.remove(this.props.id)},
			],
			{ cancelable: false }
		)
	}

	render() {
		return(
			<View style={styles.container}>
				<TouchableOpacity onPress={this.markTask} onLongPress={this.displayPrompt}>
					<Text style={this.props.done ? styles.completeTask : styles.incompleteTask}> {this.props.text} </Text>
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