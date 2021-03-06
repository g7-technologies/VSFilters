import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {NavigationActions} from 'react-navigation';
import {ScrollView,AsyncStorage, TouchableOpacity, Text,Image, View,StyleSheet,ImageBackground} from 'react-native';
import { Linking } from 'expo';
import { WP } from './responsive';

class SideMenu extends Component {

  navigateToScreen = (route) => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);
  }
  static navigationOptions = { header: null };

  constructor(props){
    super(props);
    this.state={
      isLoading: true,
      reminder: '',
    }
    this.set_token()
  }

  set_token = async() =>{
    var tokken = await AsyncStorage.getItem('token')
    await this.setState({token: tokken})
    this.getData()
  }

  getData = (id) => {
    if(this.state.token){
      try{
        fetch(BasePath+'api/remindercheck', {
          method: 'POST',
          credentials: 'include',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': this.state.token
          }
        })
        .then((response) => response.json())
        .then((responseJson) => {
          this.setState({reminder: responseJson.result.reminder.reminder,isLoading: true})
        })
        .catch((error) =>{
          console.log(error);
        });
      }catch(e){
        console.log('error', e);
      }
    }
  }

  set_reminder = () => {
    if(this.state.reminder == 1){
      return(
        <View style={{marginLeft: 5,justifyContent: 'center',alignItems: 'center', backgroundColor: 'grey', height:20,width:20,borderRadius: 20/2}}>
        <Text style={{fontSize: 12,color: 'white'}}>{this.state.reminder}</Text>
        </View>
      )
    }
  }


  signout = async() =>{
    await AsyncStorage.clear()
    this.props.navigation.replace('Login')
  }
  linking =()=>{
    Linking.openURL('mailto:support@vsfilters.com')

  }

  render () {
    const { navigate } = this.props.navigation;
    if(this.state.isLoading){
      return (
          <View style={styles.mainContainer}>
            <View style={{flex:3, alignItems: 'center',justifyContent: 'center'}}>
              <Image
                  style={{
                    height :WP('30'),
                    width: WP('30')
                  }}
                  resizeMode = "contain"
                  source={require('../assets/logo.png')}
                />
            </View>
            <View style={{ flex:9, backgroundColor: '#E6E7E9', alignItems: 'center',justifyContent: 'center'}}>
              <View style={{flex:5, alignItems: 'center',justifyContent: 'center'}}>

                <View style={styles.itemContainer}>

                  <TouchableOpacity onPress={() => this.props.navigation.navigate('ManagerHomeScreen')}>
                    <Text style={styles.itemText}>Dashboard</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.itemContainer}>
                  <TouchableOpacity style={{flexDirection: 'row'}} onPress={() => this.props.navigation.navigate('ManagerReminder')}>
                    <Text style={styles.itemText}>Reminders</Text>
                    {this.set_reminder()}
                  </TouchableOpacity>
                </View>
                <View style={styles.itemContainer}>
                  <TouchableOpacity onPress={() => this.props.navigation.navigate('ManagerHistory')}>
                    <Text style={styles.itemText}>History</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.itemContainer}>
                  <TouchableOpacity onPress={() => this.props.navigation.navigate('ManagerCompleted')}>
                    <Text style={styles.itemText}>Task Completed</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.itemContainer}>
                  <TouchableOpacity onPress={()=>this.props.navigation.navigate('Logout')}>
                    <Text style={styles.itemText}>Logout</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.itemContainer}>
                  <TouchableOpacity onPress={this.linking}>
                    <Text style={styles.itemText}>Support</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={{flex:4, alignItems: 'center',justifyContent: 'center'}}>
              </View>

            </View>

          </View>
      );
    }else{
      return null;
    }
  }
}

SideMenu.propTypes = {
  navigation: PropTypes.object
};
const styles = StyleSheet.create({

  mainContainer:{
    flex: 10,
    flexDirection: 'column',
    width: '100%',

  },
  itemContainer:{
    flex: 1,
    justifyContent: 'center',
    width: 150,
    alignItems: 'flex-start',
    borderBottomWidth: 1,
    borderColor: 'green'
  },
  itemText: {
    color: 'grey',
    fontSize: 16,
    fontWeight: 'bold'
  },
  iconImage: {
    width: 20
  }
});
export default SideMenu;
