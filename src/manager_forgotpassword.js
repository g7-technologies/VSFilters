import React from 'react';
import { ImageBackground,  Image,KeyboardAvoidingView,ScrollView,TextInput,ActivityIndicator,TouchableOpacity,Dimensions,StyleSheet, Text, View } from 'react-native';
import { Container, Content, Form, Label, Item, Icon, Input, Button, Left } from 'native-base';

import {BasePath} from '../config/path.js';
import Toast from 'react-native-tiny-toast';

var windowWidth = Dimensions.get('window').width
export default class ForgotPassword extends React.Component {

  constructor(props){
    super(props);
    this.state={
      email: '',
      password: '',
      show_error: false,
      error_message: '',
      status: false,
      isLoading:false
    }
  }

  show_error_message = () =>{
    if(this.state.show_error){
      if(this.state.status){
        return(
          <Text style={{color: 'green'}}>{this.state.error_message}</Text>
        )
      }else{
        return(
          <Text style={{color: 'red'}}>{this.state.error_message}</Text>
        )
      }
    }
  }

  reset_password = () =>{
    const formData = new FormData()
    formData.append("email", this.state.email);
    try{
      fetch(`${BasePath}user/manager_forgot_pass.php`, {
          method: 'POST',
          headers: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
          },
          body:formData
        })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({isLoading:false})
        if(responseJson.error == false){
          Toast.show(responseJson.success_msg)
        }
        else{
          Toast.show(responseJson.error_msg)
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
    if(this.state.email === ''){
      this.setState({error_message: 'All Fields are required', show_error: true,isLoading:false})
    }else{
      this.setState({isLoading:true})
      this.reset_password()
    }
  }

  login = () =>{
    this.form_validation()
  }

  forgot_password = () =>{
    console.log("start Contest")
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
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

        <View style={styles.heading}>
          <Text></Text>
        </View>
        </ImageBackground>

          <View style={{flex:2.5,justifyContent: 'flex-end', alignItems: 'center'}}>
            <Text style={{color: 'lightgrey',fontSize:26}}>RESET PASSWORD</Text>
          </View>
          <View style={{flex:7.5,justifyContent: 'center', alignItems: 'center'}}>
            <View style={{flex:2,justifyContent: 'center', alignItems: 'center'}}>
              {this.show_error_message()}
              <View style={{flex:0.5, alignItems: 'center', justifyContent: 'center'}}>
              </View>
              <Form >
                <Item style={{width:windowWidth-55, backgroundColor: 'white'}} rounded>
                  <Input placeholder="Email" style={styles.inputField}  onChangeText={(text) => this.setState({ email: text })} />
                </Item>
              </Form>
            </View>

            <View style={{flex:4,justifyContent: 'center', alignItems: 'center'}}>
              <View style={{fle:1, alignItems: 'center', justifyContent: 'center'}}>
              { this.state.isLoading ?
                <View style={{justifyContent: 'center',alignItems: 'center'}}>
                  <ActivityIndicator />
                </View>
                :
                <TouchableOpacity onPress={this.form_validation}>
                  <Image source={require('../assets/btn-reset-password.png')} style={{height: 55,width:windowWidth-55}} />
                </TouchableOpacity>
              }


              </View>
              <View style={{flex:1, alignItems: 'center', flexDirection:'row', justifyContent: 'center'}}>
                <Text style={{color: 'lightgrey'}}>Back to </Text>
                <TouchableOpacity onPress={() => navigate('Login_Manager')}>
                  <Text style={{color: 'lightgrey',textDecorationLine: 'underline'}}>Login</Text>
                </TouchableOpacity>
              </View>
              <View style={{flex:3.5, alignItems: 'center', justifyContent: 'center'}}>
              </View>
            </View>
          </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 12,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    flex: 0.7,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },
  inputField: {
    height: 50,
    marginHorizontal: 10,
    marginVertical: 5,
    paddingLeft: 10,
    width: windowWidth-45,
    marginHorizontal: 20,

  },
  contest_button:{
    flex:2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00B0F6',
    width: windowWidth-45,
    marginTop: 15,
    borderRadius:10
  },
  icon:{
    height: 50,
    width: 50
  }

});
