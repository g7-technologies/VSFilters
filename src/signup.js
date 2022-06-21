import React from 'react';
import { BackHandler,ImageBackground,Image,KeyboardAvoidingView,ScrollView,TextInput,ActivityIndicator,TouchableOpacity,Dimensions,StyleSheet, Text, View } from 'react-native';
import { Picker ,Container, Components, Content, Form, Label, Item, Icon, Input, Button, Left } from 'native-base';

import { NavigationActions } from 'react-navigation';


import BaseUrl from '../config/path.js';
import SideMenu from './side_menu.js';


var windowWidth = Dimensions.get('window').width
export default class Signup extends React.Component {

  constructor(props){
    super(props);
    this.state={
      email: '',
      password: '',
      name: '',
      phone_no: '',
      address: '',
      show_error: false,
      error_message: '',
      status: false,
      isLoading: false,
      company_id: 0,
      company_array: [],
    }
  }
  componentDidMount(){
    this.getCompany();
  }
  getCompany = async () =>{
    try{
      fetch(BasePath+'api/company', {
        method: 'GET',
        mode: 'same-origin',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson)
        this.setState({
          company_array: responseJson.result.data
        })
      })
      .catch((error) =>{
        console.log(error);
      });
    }catch(e){
      console.log('error', e);
    }
  }

  componentWillUnmount(){
    var navigate = this.props.navigation
    BackHandler.addEventListener('hardwareBackPress', this.props.navigation.push("Login"));
  }

  handleBackButton(navigate){
    navigate.navigate("Login")
  }
  show_error_message = () =>{
    if(this.state.show_error){
      if(this.state.status){
        return(
          <Text style={{color: 'green',textAlign: 'center'}}>{this.state.error_message}</Text>
        )
      }else{
        return(
          <Text style={{color: 'red',textAlign: 'center'}}>{this.state.error_message}</Text>
        )
      }
    }
  }

  signup_request = () =>{
    console.log("SIgnup Request")
    try{
      fetch(BasePath+'api/user/signup', {
        method: 'POST',
        mode: 'same-origin',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: JSON.stringify({
          email: this.state.email,
          full_name: this.state.name,
          password: this.state.password,
          phone: this.state.phone_no,
          address: this.state.address,
          company_id: this.state.company_id
        })
      })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson)
        this.setState({isLoading: false,error_message: responseJson.result.message, status: responseJson.status, show_error: true})
      })
      .catch((error) =>{
        console.log(error);
      });
    }catch(e){
      console.log('error', e);
    }
  }

  form_validation = () => {
    console.log("FOrm Validation")
    if(this.state.email === '' || this.state.name === ''|| this.state.company_id == 0 || this.state.password === '' || this.state.phone_no === ''){
      this.setState({isLoading: false,error_message: 'All Fields are required', show_error: true})
    }else{
      this.signup_request()
    }
  }

  signup = () =>{
    console.log("SIgnup")
    this.setState({isLoading : true})
    this.form_validation()
  }

  forgot_password = () =>{
    console.log("start Contest")
  }

  render() {
    const { navigate } = this.props.navigation;
    var company_array = this.state.company_array;

    return (
      <View style={styles.container}>

          <ImageBackground
            source={require('../assets/bg.jpg')}
            style={{
              flex:15.5,
              width: windowWidth,
            }}
            imageStyle={{
              resizeMode: 'cover'
            }}
          >
            <View style={{flex:1.5}}>

            </View>
            <View style={{flex:2.5,justifyContent: 'center', alignItems: 'center'}}>
              <Image
                style={{
                  height :130,
                  width: 130
                }}
                source={require('../assets/logo.png')}
              />
            </View>
            <View style={{flex:7.5,justifyContent: 'center', alignItems: 'center'}}>
              <View style={{flex:1.5,justifyContent: 'center',alignItems: 'center'}}>
                <Text style={{color: 'grey',fontSize:30}}>Create Account</Text>
              </View>
              <View style={{flex:6.5,justifyContent: 'center',alignItems: 'center'}}>
                <KeyboardAvoidingView behavior="padding" enabled keyboardVerticalOffset={300}>
                  {this.show_error_message()}
                  <Picker
                    selectedValue={this.state.company_id}
                    mode="dropdown"
                    placeholder="Select Company"
                    style={styles.inputField}
                    onValueChange={(itemValue, itemIndex) => this.setState({company_id: itemValue})}>
                    {company_array.map((company) =>
                      <Picker.Item label={company.company_name} value={company.id} key={company.id} />
                    )
                    }
                  </Picker>
                  <Form>
                     <TextInput style={styles.inputField}
                      onChangeText={value => this.setState({name: value})}
                      value={this.state.name}
                      textAlign={'center'}
                      underlineColorAndroid='transparent'
                      placeholder='Name'
                      placeholderTextColor="#767676"
                    />

                    <TextInput style={styles.inputField}
                      onChangeText={value => this.setState({phone_no: value})}
                      value={this.state.phone_no}
                      textAlign={'center'}
                      underlineColorAndroid='transparent'
                      placeholder='Phone No'
                      keyboardType='phone-pad'
                      placeholderTextColor="#767676"
                    />
                    <TextInput style={styles.inputField}
                      onChangeText={value => this.setState({email: value})}
                      value={this.state.email}
                      textAlign={'center'}
                      underlineColorAndroid='transparent'
                      placeholder='Hello@greatsimple.com'
                      placeholderTextColor="grey"
                    />
                    <TextInput style={styles.inputField}
                      onChangeText={value => this.setState({password: value})}
                      value={this.state.password}
                      textAlign={'center'}
                      underlineColorAndroid='transparent'
                      placeholder='Password'
                      secureTextEntry={true}
                      placeholderTextColor="#767676"
                    />
                    <TextInput style={styles.inputField}
                      onChangeText={value => this.setState({address: value})}
                      value={this.state.address}
                      textAlign={'center'}
                      underlineColorAndroid='transparent'
                      placeholder='Address'
                      placeholderTextColor="#767676"
                    />
                  </Form>
                </KeyboardAvoidingView>
              </View>
            </View>
            <View style={{flex:4,justifyContent: 'center', alignItems: 'center'}}>
                <View style={{flex:0.7}}>
                </View>
              <View style={{flex:2}}>
                { this.state.isLoading ?
                  <View style={{justifyContent: 'center',alignItems: 'center'}}>
                    <ActivityIndicator />
                  </View>
                  :
                  <TouchableOpacity style={styles.login_btn} onPress={this.signup}>
                    <Text style={{color: 'white',fontSize: 22}}>Create Account</Text>
                  </TouchableOpacity>
                }
                <View style={{flex:0.7}}>
                </View>
              </View>

              <View style={{flex:1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                <Text style={{color: 'grey'}}>Already have an account? </Text>
                <TouchableOpacity onPress={() => navigate('Login')}>
                  <Text style={{color: '#FF0048',textDecorationLine: 'underline'}}>Sign in</Text>
                </TouchableOpacity>
              </View>
              <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
              </View>
            </View>
          </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header:{
    flex:1,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    flexDirection : 'row'
  },
  heading: {
    flex: 0.7,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  container: {
    flex: 12,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputField: {
    height: 30,
    width: windowWidth-80,
    marginTop: 10,
    backgroundColor: 'white'
  },
  login_btn:{
    flex:1.3,
    width: windowWidth-80,
    backgroundColor: '#FF0048',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 40
  },
  contest_button:{
    flex:2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00B0F6',
    width: windowWidth-45,
    marginTop: 15,
    borderRadius:10,
    height: 50
  },
  icon:{
    height:50,
    width: 50
  }
});
