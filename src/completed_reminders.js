import React from 'react';
import { ScrollView,StatusBar,ImageBackground,AsyncStorage,Image,ActivityIndicator,TouchableOpacity,Dimensions,StyleSheet, Text, View } from 'react-native';

import {BasePath} from '../config/path.js';
import { WP } from './responsive.js';


var windowWidth = Dimensions.get('window').width

const MyStatusBar = ({backgroundColor, ...props}) => (
  <View style={[styles.statusBar, { backgroundColor }]}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
);

export default class Completed extends React.Component {
  constructor(props){
    super(props);
    this.state={
      isLoading: false,
      user_login: false,
    }
    this.set_token()
  }

  set_token = async() =>{
    var tokken = await AsyncStorage.getItem('id')
    await this.setState({token: tokken})
    this.getData()
  }

  getData = () => {
    if(this.state.token){
      const formData = new FormData()
      formData.append("id", this.state.token);
      try{
        fetch(`${BasePath}completed_task.php`, {
          method: 'POST',
          headers: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
          },
          body:formData
        })
        .then((response) => response.json())
        .then((responseJson) => {
          if(responseJson.error == false){
            this.setState({initialArr:responseJson.completed,isloading: true})

          }
        })
        .catch((error) =>{
          console.log(error);
        });
      }catch(e){
        console.log('error', e);
      }
    }
  }

  render_reminders = () =>{
    if(this.state.isloading && this.state.initialArr){
      return this.state.initialArr.map((item) => {
        return(
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Preview',{item_id: item})}>
          <View style={{flex:1,justifyContent:'center',alignItems: 'center'}}>
          <View style = {{display:'flex',elevation:1,backgroundColor:"#fff",borderRadius:WP('5'),padding:WP('5'),margin:5,shadowOpacity:0.2}}>
          <Text style={{fontSize:WP('5')}}>{item.task_title}</Text>
          <Text style={{fontSize:WP('4'),color:'green'}}>Status: {item.is_complete == 1 ? "Completed":"Not Completed"}</Text>
          <Text style={{fontSize:WP('4'),color: 'green'}}>Date: {item.completed_on}</Text>
          <View style={{flexDirection:'row',flex:1}}>
            <Text style={{fontSize:WP('4'),color: 'green'}}>Duration: {item.duration} Month</Text>
            <View style={{justifyContent:'flex-end',flex:1,alignItems:'flex-end'}}>
              <Image source={require('../assets/tick.png')} style={{height:20,width:20}}/>
            </View>
          </View>

          </View>

        </View>
        </TouchableOpacity>


        )
      })
    }
  }

  render() {
    const { navigate } = this.props.navigation;

      return (
        <View style={styles.container}>
           <MyStatusBar backgroundColor="#5E8D48" barStyle="light-content" />
          <View style={{flex:2,width: windowWidth,flexDirection: 'row', backgroundColor:'black'}}>
            <View style= {{flex:0.5,justifyContent: 'center',alignItems: 'flex-start'}} >
              <TouchableOpacity onPress={() => this.props.navigation.navigate('Home')}>
                <Image source={require('../assets/left.png')} style={{marginLeft: 15,height:25,width:25}} />
              </TouchableOpacity>
            </View>
            <View style={{flex:1.5,justifyContent: 'center',alignItems: 'flex-start'}}>
              <Text style={{fontSize:22,color:'white'}}>Completed Reminders</Text>
            </View>

          </View>
          <View style={{flex:10}}>
            <View style={{flex:6,width: windowWidth}}>

              <View style={{flex:4.5}}>
                <ScrollView>
                  {this.render_reminders()}
                </ScrollView>
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
