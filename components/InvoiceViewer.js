import React, {useState} from 'react';
import Pdf from 'react-native-pdf';
import {StyleSheet, View} from 'react-native';
import {FAB, Icon} from 'react-native-elements';
import Share from 'react-native-share';

const InvoiceViewer = ({route, navigation}) => {
  const {uri} = route.params;
  const [localUri, setLocalUri] = useState('');

  const handleOnSharePressed = () => {
    const options = {
      url: `file://${localUri}`,
    };
    Share.open(options)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <View>
      <Pdf
        source={{
          uri: uri,
          cache: true,
        }}
        onLoadComplete={(numberOfPages, filePath) => {
          console.log('file path: ', filePath);
          setLocalUri(filePath);
        }}
        onPageChanged={(page, numberOfPages) => {}}
        onError={error => {
          console.log(error);
        }}
        onPressLink={uri => {
          console.log(`Link presse: ${uri}`);
        }}
        style={styles.pdf}
      />
      <FAB
        style={styles.shareButton}
        color={'#722ed1'}
        icon={<Icon name="share" color="white" />}
        onPress={handleOnSharePressed}
      />
    </View>
  );
};

export default InvoiceViewer;

const styles = StyleSheet.create({
  pdf: {
    width: '100%',
    height: '100%',
  },
  shareButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
  },
});
