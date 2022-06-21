import React from 'react';
import { AsyncStorage,Image,ActivityIndicator,TouchableOpacity,Dimensions,StyleSheet, Text, View } from 'react-native';

var windowWidth = Dimensions.get('window').width

export default class Logout extends React.Component {
  constructor(props){
    super(props);
    this.state={
      isLoading: true,
      user_login: false,
    }
    this.user_data()
  }

  user_data = async() =>{
    await AsyncStorage.clear();
  }

  componentDidMount(){
    setTimeout(() => {
      this.props.navigation.replace('Login')
      setTimeout(() => {
        this.props.navigation.replace('Login')
      }, 1000);
    }, 2000);
   
  }
  render() {
    return(
      <View style={{flex: 1,justifyContent: 'center', alignItems: 'center', padding: 20}}>
      </View>
    )
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
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  amount: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: windowWidth-70,
    borderRadius :5,
    backgroundColor: '#FFEDAB',
  },
  data: {
    flex: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading_text:{
    fontSize: 44,
    fontWeight: 'bold'
  },
  amount_text:{
    fontWeight: 'bold',
    fontSize: 70,
    color: '#F6553F'
  },
  contest_data: {
    flex: 2,

  },
  contest_time_heading:{
    flex:1,
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  contest_time_heading1:{
    flex:2,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row'
  },
  contest_button:{
    flex:2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00D144',
    width: windowWidth-60,
    marginTop: 15,
    borderRadius:10
  },
  icon:{
    height: 50,
    width: 50
  }

});
