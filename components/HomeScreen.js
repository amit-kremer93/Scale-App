import React, {useState, useEffect} from 'react';
import {ScrollView, StatusBar, StyleSheet, View, Keyboard} from 'react-native';

import {SafeAreaProvider} from 'react-native-safe-area-context';
import {
  ListItem,
  Icon,
  Overlay,
  Button,
  Input,
  Text,
  Image,
} from 'react-native-elements';
import WeightIndicator from './WeightIndicator';
import firestore from '@react-native-firebase/firestore';
import database from '@react-native-firebase/database';
import * as constants from './Constants';

const HomeScreen = ({navigation}) => {
  const [overlayVisible, setOverlayVisible] = useState(true);
  const [weightReading, setWeightReading] = useState('N/A');
  const [isWeightStable, setIsWeightStable] = useState(false);
  const [pdfInvoices, setPdfInvoices] = useState([]);
  const [howManyScalesLeft, setHowManyScalesLeft] = useState(-1);
  const [isLoading, setIsLoading] = useState(false);
  const [isUserFound, setIsUserFound] = useState(true);
  const [userID, setUserID] = useState('');

  useEffect(() => {
    firestore()
      .collection(constants.USERS_DB)
      .doc(userID)
      .update({howManyScalesLeft: howManyScalesLeft})
      .then(() => {
        console.log('Scale counter updated!');
      })
      .catch(err => {
        console.log(err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [howManyScalesLeft]);

  useEffect(() => {
    firestore()
      .collection(constants.USERS_DB)
      .doc(userID)
      .update({invoices: pdfInvoices})
      .then(() => {
        console.log('Invoices array updated!');
      })
      .catch(err => {
        console.log(err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pdfInvoices]);

  useEffect(() => {
    const onChange = database()
      .ref('/')
      .on('value', snapshot => {
        let values = snapshot.val();
        handleRTValuesChanged(values);
      });
    return () => {
      database().ref('/').off('value', onChange);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [howManyScalesLeft]);

  const handleRTValuesChanged = values => {
    setWeightReading(values.weight);
    if (howManyScalesLeft > 0 || howManyScalesLeft < -1) {
      setIsWeightStable(true);
    } else {
      setIsWeightStable(false);
    }
  };
  const performLoginWithUserId = async () => {
    setIsLoading(true);
    setIsUserFound(true);
    firestore()
      .collection(constants.USERS_DB)
      .doc(userID)
      .get()
      .then(snapshot => {
        if (snapshot.exists) {
          let userData = snapshot.data();
          console.log(userData);
          setPdfInvoices(userData.invoices ? userData.invoices : []);
          setHowManyScalesLeft(
            userData.howManyScalesLeft ? userData.howManyScalesLeft : 0,
          );
          setOverlayVisible(false);
        } else {
          // there is no user. show red error
          setIsUserFound(false);
        }
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <SafeAreaProvider>
      <StatusBar backgroundColor={'#1890ff'} />
      <Overlay isVisible={overlayVisible} onBackdropPress={Keyboard.dismiss}>
        <View style={styles.loginOverlay}>
          <Image
            source={require('./Images/truck.png')}
            containerStyle={{width: 100, height: 100}}
          />
          <Text style={styles.loginOverlayTextWelcome}>ברוך הבא!</Text>
          <Text style={styles.loginOverlayTextPlease}>
            אנא הכנס את קוד המשתמש:
          </Text>
          <Input
            placeholder="קוד משתמש "
            rightIcon={{
              type: 'AntDesign',
              name: 'verified-user',
            }}
            style={styles.loginOverlayText}
            onChangeText={e => setUserID(e)}
          />
          <Button
            buttonStyle={styles.loginButton}
            title="התחבר"
            onPress={performLoginWithUserId}
            loading={isLoading}
          />
          {isUserFound ? null : (
            <Text style={styles.userNorFoundText}>המשתמש לא קיים</Text>
          )}
        </View>
      </Overlay>
      <View style={styles.container}>
        <View style={styles.weightIndicator}>
          <WeightIndicator
            weightReading={weightReading}
            isWeightStable={isWeightStable}
            navigationInstance={navigation}
            userId={userID}
            howManyScalesLeft={howManyScalesLeft}
            setHowManyScalesLeft={setHowManyScalesLeft}
            pdfInvoices={pdfInvoices}
            setPdfInvoices={setPdfInvoices}
          />
        </View>
        <Text
          style={
            styles.howManyleftText
          }>{`נשארו לך עוד ${howManyScalesLeft} שקילות`}</Text>
        <View style={styles.pdfScrollView}>
          <ScrollView>
            {pdfInvoices
              ? pdfInvoices.map((l, i) => (
                  <ListItem
                    key={i}
                    bottomDivider="bottomDivider"
                    onPress={() =>
                      navigation.navigate('InvoiceViewer', {uri: l.uri})
                    }>
                    <Icon name={'file-copy'} />
                    <ListItem.Content>
                      <ListItem.Title>{l.name}</ListItem.Title>
                      <ListItem.Subtitle>{l.subtitle}</ListItem.Subtitle>
                    </ListItem.Content>
                  </ListItem>
                ))
              : null}
          </ScrollView>
        </View>
      </View>
    </SafeAreaProvider>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pdfScrollView: {
    flex: 3,
  },
  weightIndicator: {
    flex: 1,
  },
  loginOverlay: {
    alignItems: 'center',
    padding: 20,
  },
  loginOverlayTextWelcome: {
    fontSize: 20,
    margin: 5,
  },
  loginOverlayTextPlease: {
    fontSize: 15,
    margin: 5,
  },
  userNorFoundText: {
    marginTop: 20,
    color: 'red',
  },
  loginButton: {
    padding: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  howManyleftText: {
    color: '#1890ff',
    alignSelf: 'center',
    marginTop: 30,
  },
});
