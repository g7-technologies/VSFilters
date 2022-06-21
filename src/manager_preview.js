import React from 'react';
import { ScrollView,StatusBar,ImageBackground,AsyncStorage,Image,ActivityIndicator,TouchableOpacity,Dimensions,StyleSheet, Text, View } from 'react-native';

import BaseUrl from '../config/path.js';
import { WP } from './responsive.js';

var windowWidth = Dimensions.get('window').width

const MyStatusBar = ({backgroundColor, ...props}) => (
  <View style={[styles.statusBar, { backgroundColor }]}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
);

export default class Preview extends React.Component {
  constructor(props){
    super(props);
    this.state={
      isLoading: true,
      user_login: false,
      item_id: this.props.navigation.state.params.item_id
    }

  }

  set_token = async() =>{
    var tokken = await AsyncStorage.getItem('token')
    await this.setState({token: tokken})
    this.getData()
  }

  getData = () => {
    if(this.state.token){
      try{
        fetch(BasePath+'api/getimage', {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': this.state.token
          },
          body: JSON.stringify({
            reminder_id: this.state.item_id
          })

        })
        .then((response) => response.json())
        .then((responseJson) => {
          this.setState({imgUri:responseJson.result.image,isloading: true})
        })
        .catch((error) =>{
          console.log(error);
        });
      }catch(e){
        console.log('error', e);
      }
    }
  }


  render() {
    const { navigate } = this.props.navigation;

      return (
        <View style={styles.container}>
           <MyStatusBar backgroundColor="#5E8D48" barStyle="light-content" />
          <View style={{flex:2,width: windowWidth,flexDirection: 'row', backgroundColor:'black'}}>
            <View style= {{flex:0.8,justifyContent: 'center',alignItems: 'flex-start'}} >
              <TouchableOpacity onPress={() => this.props.navigation.navigate('ManagerCompleted')}>
                <Image source={require('../assets/left.png')} style={{marginLeft: 15,height:25,width:25}} />
              </TouchableOpacity>
            </View>
            <View style={{flex:1.2,justifyContent: 'center',alignItems: 'flex-start'}}>
              <Text style={{fontSize:22,color:'white'}}>Preview</Text>
            </View>

          </View>
          <View style={{flex:10}}>

            <View style={{display:"flex",alignItems:'center',justifyContent:'center'}}>
            <Image
                  source={{ uri: this.props.navigation.state.params.item_id.image}}
                  style={{
                    height:"100%",
                    width:"100%"


                  }}
                  resizeMode = "contain"
                />
            </View>
            <View style={{flex:4}}></View>

          </View>
        </View>
      );

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 12,
  },
  heading: {
    flex: 0.7,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
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
  login_btn:{
    flex:1,
    width: windowWidth-80,
    backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30
  },

  icon:{
    height: 50,
    width: 50
  }

});
