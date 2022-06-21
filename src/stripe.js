import React from 'react';
import { Image,KeyboardAvoidingView,ScrollView,TextInput,ActivityIndicator,TouchableOpacity,Dimensions,StyleSheet, Text, View } from 'react-native';
import { Container, Components, Content, Form, Label,DatePicker, Item, Icon, Input, Button, Left } from 'native-base';

import BaseUrl from '../config/path.js';

var windowWidth = Dimensions.get('window').width
export default class Stripe extends React.Component {

  constructor(props){
    super(props);
    this.state={
      card: '',
      cvc: '',
      expiry: '',
      show_error: false,
      error_message: '',
      status: false
    }
  }

  componentDidMount(){
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
          username: this.state.user_name,
          email: this.state.email,
          full_name: this.state.full_name,
          password: this.state.password,
          phone: this.state.phone_no
        })
      })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson)
        this.setState({error_message: responseJson.result.message, status: responseJson.status, show_error: true})
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
    if(this.state.email === '' || this.state.full_name === '' || this.state.user_name === '' || this.state.password === '' || this.state.phone_no === ''){
      this.setState({error_message: 'All Fields are required', show_error: true})
    }else{
      this.signup_request()
    }
  }

  signup = () =>{
    console.log("SIgnup")
    this.form_validation()
  }

  forgot_password = () =>{
    console.log("start Contest")
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <View style={{flex:12}}>
          <View style={{flex:1}}>
            <TouchableOpacity onPress={() => navigate('Login')} style={styles.header}>
              <Image source={require('../assets/left.png')} style={{height: 25,width:25}} />
              <Text style={{ fontSize: 20}}>Login</Text>
            </TouchableOpacity>
          </View>
          <View style={{flex:11}}>
            <View style={styles.heading}>
              <Image
                source={require('../assets/app-icon.png')}
                style={styles.icon}
              />
            </View>
            <View style={{flex:1.5}}>
              <Text style={{marginLeft: 20,fontSize: 22, fontWeight: 'bold'}}>Payment</Text>
              <Text style={{marginLeft: 22,fontSize: 18}}>Enter Your stripes details</Text>
            </View>
            <View style={styles.heading}>
              <Image
                source={require('../assets/payment-cards.png')}
                style={styles.payment_icon}
              />
            </View>
            <View style={{flex:5,justifyContent: "center", alignItems: 'center'}}>
              {this.show_error_message()}
              
              <Form>
                <Item style={{width:windowWidth-45}} floatingLabel>
                  <Icon active name='ios-card' style={{ color: 'grey' }} />
                  <Label style={{ color: 'grey' }}>CARD</Label>
                  <Input style={styles.inputField}  onChangeText={(text) => this.setState({ card: text })} />
                </Item>
                <Item style={{width:windowWidth-45}} floatingLabel>
                  <Icon active name='ios-person' style={{ color: 'grey' }} />
                  <Label style={{ color: 'grey' }}>CVC</Label>
                  <Input style={styles.inputField}  onChangeText={(text) => this.setState({ cvc: text })} />
                </Item>
                
              </Form>
            </View>
            <View  style={{flex:3.5, justifyContent: 'flex-start', alignItems: 'center'}}>
              <View style={{flex:2,justifyContent: 'center', alignItems: 'center'}}>
                <TouchableOpacity style={styles.contest_button} onPress={this.signup}>
                  <Text style={{color: 'white', fontSize: 18}}>
                      Pay
                    </Text>
                </TouchableOpacity>
              </View>
          
              <View style={{flex:1.5,justifyContent: 'center', alignItems: 'center'}}>            
              </View>
            </View>
          </View>
        </View>
          
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
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    height: 50,
    width: 50
  },
  payment_icon:{
    height: 50,
    width: windowWidth-40
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
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
    backgroundColor: '#3D77DA',
    width: windowWidth-45,
    marginTop: 15,
    borderRadius:10
  }
});
