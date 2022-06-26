import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { ListItem, Icon, Overlay, Button, Input, Image, FAB } from 'react-native-elements';

const TrucksList = ({ route, navigation }) => {
	const { truckList, updateTruckList } = route.params;

	const [isAddingNewTruck, setIsAddingNewTruck] = useState(false);
	const [newTruckPlateNumber, setNewTruckPlateNumber] = useState('');
	const [newTruckTare, setNewTruckTare] = useState('');

	const handleAddNewTruck = () => {
		let truckListCopy = Object.assign({}, truckList);
		truckListCopy[newTruckPlateNumber] = newTruckTare;
		truckList[newTruckPlateNumber] = newTruckTare;
		updateTruckList(truckListCopy);
		setIsAddingNewTruck(false);
	};

	return (
		<View style={styles.truckListScrollView}>
			<ScrollView onPress={() => console.log('yay')}>
				{truckList
					? Object.keys(truckList).map((plateNumber) => (
							<ListItem.Swipeable disabled={true} style={styles.item} rightContent={<Button title='Delete' icon={{ name: 'delete', color: 'white' }} buttonStyle={{ minHeight: '100%', backgroundColor: 'red' }} />} key={plateNumber} bottomDivider='bottomDivider' onPress={() => console.log('')}>
								<Icon name='truck' color='black' type='material-community' />
								<ListItem.Content style={{ width: '100%' }}>
									<ListItem.Title>{plateNumber}</ListItem.Title>
								</ListItem.Content>
								<ListItem.Content />
								<ListItem.Content>
									<ListItem.Title>{truckList[plateNumber]} KG</ListItem.Title>
								</ListItem.Content>
							</ListItem.Swipeable>
					  ))
					: null}
				{isAddingNewTruck ? (
					<ListItem>
						<Icon name='check-circle' color='green' type='material-community' onPress={handleAddNewTruck} />
						<ListItem.Input placeholder='רכב' textAlign='left' onChangeText={(number) => setNewTruckPlateNumber(number)} />
						<ListItem.Input placeholder='משקל טרה (ק״ג)' textAlign='center' keyboardType='numeric' onChangeText={(weight) => setNewTruckTare(weight)} />
					</ListItem>
				) : null}
			</ScrollView>
			<FAB style={styles.shareButton} color={'#722ed1'} icon={<Icon name='ambulance' color='white' type='material-community' />} onPress={() => setIsAddingNewTruck(true)} />
		</View>
	);
};

export default TrucksList;

const styles = StyleSheet.create({
	truckListScrollView: {
		flex: 1,
	},
	item: {
		flex: 1,
		backgroundColor: 'red',
	},
	shareButton: {
		position: 'absolute',
		right: 20,
		bottom: 20,
	},
});
