import React from 'react';
import { ImageBackground,AsyncStorage,Image, KeyboardAvoidingView,ScrollView,TextInput,ActivityIndicator,TouchableOpacity,Dimensions,StyleSheet, Text, View } from 'react-native';
import {Picker, Container, Content, Form, Label, Item, Icon, Input, Button, Left } from 'native-base';
import {BasePath} from '../config/path.js';
import Toast from 'react-native-tiny-toast'
import { WP } from './responsive';


var windowWidth = Dimensions.get('window').width
export default class Login extends React.Component {
  constructor(props){
    super(props);
    this.state={
      email: '',
      password: '',
      show_error: false,
      error_message: '',
      isLoading: false,
      company_id: 0,
      company_array: [],
    }
  }

  componentDidMount(){
  }

  show_error_message = () =>{
    if(this.state.show_error){
      return(
        <View>
        <Text style={{color: 'red',textAlign: 'center'}}>{this.state.error_message}</Text>
        </View>
      )
    }
  }
  getCompany = async () =>{
    try{
      fetch(BaseUrl+'api/company', {
        method: 'GET',
        mode: 'same-origin',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      .then((response) => response.json())
      .then((responseJson) => {
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
  storedate = async (response) =>{
    const { navigate } = this.props.navigation;

    try{
      await AsyncStorage.setItem('id', response.id);
      await AsyncStorage.setItem('role', '1');
      await AsyncStorage.setItem('full_name', response.name);
      this.props.navigation.replace('HomeScreen')
    }catch(e){
      console.log(e)
    }

  }

  login_request = () =>{
    this.props.navigation.replace('HomeScreen')
    return
    const formData = new FormData()
    formData.append('email', this.state.email);
    formData.append('password', this.state.password);
    try{
      fetch(`${BasePath}user/login.php`, {
        method: 'POST',
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
        body:formData
      })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({isLoading: false})
        if(responseJson.error == true){
          Toast.show(responseJson.error_msg)
        }
        else{

          this.storedate(responseJson)
        }
        if(responseJson.status){
          this.setState({isLoading: false})

        }else{
          this.setState({isLoading: false, error_message: responseJson.result.message, show_error: true})
        }
      })
      .catch((error) =>{
        console.log(error);
      });
    }catch(e){
      console.log('error', e);
    }
  }

  form_validation = () => {
    if(this.state.email === '' || this.state.password === ''){
      this.setState({isLoading: false,error_message: 'All Fields are required', show_error: true})
    }else{
      this.login_request()
    }
  }

  login = () =>{
    this.setState({isLoading : true})
    this.form_validation()
  }

  forgot_password = () =>{

  }

  render() {
    const { navigate } = this.props.navigation;
    var company_array = this.state.company_array;
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <ImageBackground
          source={require('../assets/blue-bg1.jpg')}
          style={{
            flex:3,
            width: windowWidth,
          }}
          imageStyle={{
            resizeMode: 'cover'
          }}
        >
          <View style={{flex:1.5,alignItems: 'flex-start', justifyContent: 'center'}}>

          </View>

          <View style={{flex:1.5}}></View>
        </ImageBackground>
        <View style={{flex:2.5,justifyContent: 'center', alignItems: 'center'}}>
          <Image
            style={{
              height :WP('30'),
              width: WP('30')
            }}
            resizeMode = "contain"
            source={require('../assets/logo.png')}
          />
        </View>
        <View style={{flex:3,justifyContent: 'center', alignItems: 'center'}}>
        {this.show_error_message()}



        <View style={{paddingBottom:10}}>

           
              <TextInput style={styles.inputField}
                onChangeText={value => this.setState({email: value})}
                value={this.state.email}
                textAlign={'center'}
                onFocus = {value => this.setState({show_error:''})}
                underlineColorAndroid='transparent'
                placeholder='Hello@greatsimple.com'
                placeholderTextColor="#767676"
              />
              <TextInput style={styles.inputField}
                onChangeText={value => this.setState({password: value})}
                value={this.state.password}
                onFocus = {value => this.setState({show_error:''})}
                textAlign={'center'}
                underlineColorAndroid='transparent'
                placeholder='Password'
                secureTextEntry={true}
                placeholderTextColor="#767676"
              />
            
            </View>

        </View>
        <View style={{flex:0.7,backgroundColor:'yellow'}}>
        </View>
          <View style={{flex:3}}>
          <View style={{flex:2,justifyContent: 'center',alignItems: 'center'}}>
          <TouchableOpacity onPress={() =>this.props.navigation.navigate('ForgotPassword')}>
            <Text style={{color: 'blue',fontSize: 18,textDecorationLine: 'underline'}}>Forgot Password?</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() =>this.props.navigation.replace('Login_Manager')}>
          <Text style={{color: 'blue',fontSize: 18,textDecorationLine: 'underline',marginTop:3}}>Login as manager</Text>
          </TouchableOpacity>
          </View>

          <View style={{flex:0.1}}>
          </View>
            { this.state.isLoading ?
              <View style={{flex:1,justifyContent: 'center',alignItems: 'center'}}>
                <ActivityIndicator />
              </View>
              :
              <TouchableOpacity style={styles.login_btn} onPress={this.login}>
                <Text style={{color: 'white',fontSize: 22}}>LOGIN</Text>
              </TouchableOpacity>
            }
            <View style={{flex:0.5}}>
            </View>
          </View>
          <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>


          </View>
      </ScrollView>
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
    height: 50,
    width: windowWidth-80,
    marginTop: 10,
    backgroundColor: 'lightgrey'
  },
  login_btn:{
    flex:1.3,
    width: windowWidth-80,
    backgroundColor: '#FF0048',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 40
  },
  signup_btn:{
    flex:1.5,
    width: windowWidth-80,
    backgroundColor: 'lightgreen',
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
