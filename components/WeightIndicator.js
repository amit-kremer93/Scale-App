import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Button} from 'react-native-elements';

const WeightIndicator = props => {
  const {
    weightReading,
    isWeightStable,
    navigationInstance,
    userId,
    howManyScalesLeft,
    setHowManyScalesLeft,
    pdfInvoices,
    setPdfInvoices,
  } = props;
  return (
    <View style={styles.container}>
      <View style={styles.linearGradient}>
        <Text style={styles.text}>{weightReading + ' '}KG</Text>
      </View>
      <View style={styles.outerWrapper}>
        <View style={styles.innerWrapper}>
          <Button
            buttonStyle={styles.saveWeightButton}
            title={'צור תעודה חדשה'}
            disabled={!isWeightStable}
            onPress={() =>
              navigationInstance.navigate('InvoiceGenerator', {
                weightReading: weightReading,
                userId: userId,
                howManyScalesLeft: howManyScalesLeft,
                setHowManyScalesLeft: setHowManyScalesLeft,
                pdfInvoices: pdfInvoices,
                setPdfInvoices: setPdfInvoices,
              })
            }
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    color: 'white',
    textAlign: 'center',
    fontSize: 50,
    top: '15%',
  },
  linearGradient: {
    flex: 1,
    backgroundColor: '#1890ff',
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 100,
  },

  saveWeightButton: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    padding: 15,
    backgroundColor: '#722ed1',
  },
  innerWrapper: {
    left: '-50%',
    position: 'relative',
  },
  outerWrapper: {
    left: '50%',
    position: 'absolute',
    bottom: 0,
    marginBottom: -25,
  },
});

export default WeightIndicator;
