import React, {Component} from 'react';
import {
	View, 
	Text,
	StyleSheet,
	TouchableOpacity,
	Dimensions,
	Switch
}from 'react-native';

const { heigth, width } = Dimensions.get('window');

export default class TasksList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isEditing: false
		}
	}
	
	render() {
		return(
			<View style={styles.container}>
				<Switch/>
				<Text style={styles.text}> TO DO </Text>
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

	text: {
		fontWeight: '500',
		fontSize: 18,
		marginVertical: 20
	},

	circle: {
		width: 30,
		height: 30,
		borderRadius: 15,
		borderColor: 'red',
		borderWidth: 3,
		marginRight: 20
	}
});