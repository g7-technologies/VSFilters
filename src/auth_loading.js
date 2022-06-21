import React from 'react';

import { AsyncStorage,ImageBackground,Image,KeyboardAvoidingView,ScrollView,TextInput,ActivityIndicator,TouchableOpacity,Dimensions,StyleSheet, Text, View } from 'react-native';


export default class AuthLoadingScreen extends React.Component {
  constructor() {
    super();
    this._bootstrapAsync();
  }
  _bootstrapAsync = async () => {

    const value = await AsyncStorage.getItem('role');

    if(value == '1'){
      console.log('tenant')
      const userToken = await AsyncStorage.getItem('id');
      this.props.navigation.navigate(userToken ? 'App' : 'Auth');
    }else if(value == '2'){
      console.log('manager')
      const managerToken = await AsyncStorage.getItem('Manager_id');
      this.props.navigation.navigate(managerToken ? 'App1' : 'Auth');
    }
    else{
      console.log('empty')
      this.props.navigation.navigate('bydefault');

    }



  };

  // Render any loading content that you like here
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator size='large' />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});