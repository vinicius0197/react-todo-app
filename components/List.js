import React, {Component} from 'react';
import {
	View, 
	Text,
	StyleSheet,
	TouchableOpacity,
	Dimensions
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
	
	render() {
		return(
			<View style={styles.container}>
				<TouchableOpacity onPress={this.markTask}>
					<Text style={this.state.isDone ? styles.completeTask : styles.incompleteTask}> TO DO </Text>
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
		color: '#D3D3D3'
	}
});