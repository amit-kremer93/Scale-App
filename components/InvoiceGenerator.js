import React, { useEffect, useState } from 'react';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import { View, StyleSheet, ScrollView, Text, PermissionsAndroid, Platform } from 'react-native';
import { Button, Input, Switch } from 'react-native-elements';
import CheckBox from '@react-native-community/checkbox';
import storage from '@react-native-firebase/storage';
import * as constants from './Constants';
import Toast from 'react-native-toast-message';

const InvoiceGenerator = ({ route, navigation }) => {
	const { weightReading, userId, howManyScalesLeft, setHowManyScalesLeft, pdfInvoices, setPdfInvoices, truckList } = route.params;
	const [manualTruckInputSelected, setManualTruckInputSelected] = useState(true);
	const [tareWeight, setTareWeight] = useState('');
	const [netWeight, setNetWeight] = useState(0);
	const [buttonLoading, setButtonLoading] = useState(false);
	const [scalerName, setScalerName] = useState('');
	const [scalerPhone, setScalerPhone] = useState('');
	const [originAddress, setOriginAddress] = useState('');
	const [destinationAddress, setDestinationAddress] = useState('');
	const [driverName, setDriverName] = useState('');
	const [vehicleNumber, setVehicleNumber] = useState('');
	const [materialType, setMaterialType] = useState('');
	const [moreInfo, setMoreInfo] = useState('');

	useEffect(() => {
		let localTareWeight = tareWeight;
		if (['', 0].includes(tareWeight)) {
			localTareWeight = 0;
		}
		let netWeight = weightReading - localTareWeight;
		setNetWeight(netWeight);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [tareWeight]);

	const requestWriteToFilePermission = async () => {
		setButtonLoading(true);
		try {
			const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE, {
				title: 'נדרשת גישה לקבצים',
				message: 'על מנת להפיק תעודה האפליקציה זקוקה לרשות לשמור קבצים',
				buttonNeutral: 'שאל אותי אחר כך',
				buttonNegative: 'חסום',
				buttonPositive: 'אפשר',
			});
			if (granted === PermissionsAndroid.RESULTS.GRANTED) {
				generateInvoiceWithParameters();
			} else {
				navigation.goBack();
				setButtonLoading(false);
			}
		} catch (err) {
			navigation.goBack();
			setButtonLoading(false);
		}
	};

	const generateInvoiceWithParameters = () => {
		let scalingObj = {
			DATE_NOW: getCurrentDate(),
			HOUR_NOW: getCurrentTime(),
			SCALER_NAME: scalerName.toString(),
			SCALER_PHONE: scalerPhone.toString(),
			ORIGIN: originAddress.toString(),
			DESTINATION: destinationAddress.toString(),
			MATERIAL_TYPE: materialType.toString(),
			MORE_INFO: moreInfo.toString(),
			VEHICLE_NUMBER: vehicleNumber.toString(),
			DRIVER_NAME: driverName.toString(),
			TOTAL_WEIGHT: weightReading.toString(),
			NET_WEIGHT: netWeight.toString(),
			TARE_WEIGHT: tareWeight.toString(),
		};
		let newInvoice = constants.generateHTMLFromJSON(scalingObj);
		console.log(scalingObj);
		createInvoiceAsPDFAndUpload(newInvoice).then(() => {
			navigation.goBack();
			setButtonLoading(false);
		});
	};

	const getCurrentDate = () => {
		let day = new Date().getDate();
		let month = new Date().getMonth() + 1;
		let year = new Date().getFullYear();
		return day + '-' + month + '-' + year;
	};

	const getCurrentTime = () => {
		let hours = new Date().getHours();
		let min = new Date().getMinutes();
		let sec = new Date().getSeconds();
		return hours + ':' + min + ':' + sec;
	};

	const createInvoiceAsPDFAndUpload = async (newInvoice) => {
		let options = {
			html: newInvoice,
			fileName: 'invoice',
			directory: 'Documents',
		};

		let file = await RNHTMLtoPDF.convert(options);
		let invoiceSubTitle = getCurrentDate() + '-' + getCurrentTime();
		const reference = storage().ref('/PDFInvoices/' + userId + '/' + invoiceSubTitle + '.pdf');
		await reference.putFile(file.filePath);
		await reference
			.getDownloadURL()
			.then((downloadLink) => {
				let invoiceMap = {
					name: netWeight + ' KG',
					subtitle: invoiceSubTitle,
					uri: downloadLink,
				};
				setPdfInvoices((pdfInvoices) => [invoiceMap].concat(pdfInvoices));
				setHowManyScalesLeft(howManyScalesLeft - 1);
				Toast.show({
					type: 'success',
					position: 'bottom',
					text1: 'התעודה נשמרה!',
					text2: 'עכשיו ניתן להציג אותה בדף הראשי',
					visibilityTime: 3000,
					autoHide: true,
					topOffset: 30,
					bottomOffset: 40,
				});
			})
			.catch((err) => {
				console.log('Error: ', err);
				Toast.show({
					type: 'error',
					position: 'bottom',
					text1: 'אופס...',
					text2: 'נראה שקרתה תקלה..',
					visibilityTime: 3000,
					autoHide: true,
					topOffset: 30,
					bottomOffset: 40,
				});
			});
	};

	const handleVehicleCheckBoxChanged = (truckNumber) => {
		setVehicleNumber(truckNumber);
		setTareWeight(truckList[truckNumber]);
	};
	return (
		<View style={styles.outerContainer}>
			<ScrollView>
				<View style={styles.innerContainer}>
					<Text style={styles.mainLabels}>פרטי השוקל</Text>
					<Input
						label={'שם השוקל'}
						rightIcon={{
							type: 'Fontisto',
							name: 'person',
						}}
						labelStyle={{
							textAlign: 'right',
						}}
						onChangeText={(e) => setScalerName(e)}
					/>
					<Input
						label={'מספר טלפון'}
						rightIcon={{
							type: 'Fontisto',
							name: 'phone',
						}}
						labelStyle={{
							textAlign: 'right',
						}}
						keyboardType={'numeric'}
						onChangeText={(e) => setScalerPhone(e)}
					/>
					<Input
						label={'כתובת המקור'}
						rightIcon={{
							type: 'Fontisto',
							name: 'location-pin',
						}}
						labelStyle={{
							textAlign: 'right',
						}}
						onChangeText={(e) => setOriginAddress(e)}
					/>
					<Input
						label={'כתובת היעד'}
						rightIcon={{
							type: 'Fontisto',
							name: 'location-pin',
						}}
						labelStyle={{
							textAlign: 'right',
						}}
						onChangeText={(e) => setDestinationAddress(e)}
					/>
					<Text style={styles.mainLabels}>פרטי הרכב</Text>
					<Input
						label={'שם הנהג'}
						rightIcon={{
							type: 'Fontisto',
							name: 'person',
						}}
						labelStyle={{
							textAlign: 'right',
						}}
						onChangeText={(e) => setDriverName(e)}
					/>
					<View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row', alignContent: 'space-between', width: '100%', marginVertical: 20 }}>
						<Text style={[{ fontSize: 16 }, manualTruckInputSelected ? null : { fontWeight: 'bold' }]} onPress={() => setManualTruckInputSelected(false)}>
							בחר מתוך רשימה
						</Text>
						<Switch
							style={{ marginHorizontal: 20 }}
							value={manualTruckInputSelected}
							onValueChange={() => {
								setManualTruckInputSelected(!manualTruckInputSelected);
								setTareWeight('');
							}}
						/>
						<Text style={[{ fontSize: 16 }, manualTruckInputSelected ? { fontWeight: 'bold' } : null]} onPress={() => setManualTruckInputSelected(true)}>
							הכנס רכב ידנית
						</Text>
					</View>
					{manualTruckInputSelected ? (
						<Input
							label={'מספר רכב'}
							rightIcon={{
								type: 'Fontisto',
								name: 'chevron-left',
							}}
							labelStyle={{
								textAlign: 'right',
							}}
							onChangeText={(e) => setVehicleNumber(e)}
						/>
					) : (
						<View style={{ flexDirection: 'column', alignContent: 'flex-start', justifyContent: 'center', alignItems: 'flex-end', width: '100%', borderColor: '#e6e5ea', borderWidth: 2, borderRadius: 20, marginBottom: 30, padding: 20 }}>
							{Object.keys(truckList).map((truck) => (
								<View key={truck} style={{ flexDirection: 'row', marginVertical: 10 }}>
									<Text style={{ fontSize: 16, marginRight: 10 }}>{truck}</Text>
									<CheckBox value={truck == vehicleNumber} onValueChange={() => handleVehicleCheckBoxChanged(truck)} />
								</View>
							))}
						</View>
					)}

					<Input
						label={'משקל טרה (ק״ג)'}
						rightIcon={{
							type: 'Fontisto',
							name: '10k',
						}}
						labelStyle={{
							textAlign: 'right',
						}}
						keyboardType={'numeric'}
						onFocus={() => setTareWeight('')}
						disabled={!manualTruckInputSelected ? true : false}
						onChangeText={(e) => setTareWeight(e)}>
						{tareWeight}
					</Input>
					<Text style={styles.mainLabels}>פרטי המטען</Text>
					<Input
						label={'סוג החומר'}
						rightIcon={{
							type: 'Fontisto',
							name: 'chevron-left',
						}}
						labelStyle={{
							textAlign: 'right',
						}}
						onChangeText={(e) => setMaterialType(e)}
					/>
					<Input
						label={'פרטים נוספים'}
						rightIcon={{
							type: 'Fontisto',
							name: 'chevron-left',
						}}
						labelStyle={{
							textAlign: 'right',
						}}
						onChangeText={(e) => setMoreInfo(e)}
					/>
					<Button
						loading={buttonLoading}
						buttonStyle={styles.saveNewInvoiceButton}
						title={' שמור '}
						onPress={() => {
							Platform.OS == 'android' ? requestWriteToFilePermission() : generateInvoiceWithParameters();
						}}
					/>
				</View>
			</ScrollView>
		</View>
	);
};

export default InvoiceGenerator;
const styles = StyleSheet.create({
	outerContainer: {
		flex: 1,
	},
	innerContainer: {
		flex: 1,
		justifyContent: 'flex-start',
		alignItems: 'center',
		padding: 30,
	},
	pdf: {
		width: 300,
		height: 400,
	},
	mainLabels: {
		fontWeight: 'normal',
		fontSize: 20,
		paddingBottom: 10,
	},
	saveNewInvoiceButton: {
		marginHorizontal: 100,
		padding: 10,
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
		borderBottomLeftRadius: 20,
		borderBottomRightRadius: 20,
		backgroundColor: '#52c41a',
	},
});
