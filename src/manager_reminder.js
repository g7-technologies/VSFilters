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

export default class Reminders extends React.Component {
  constructor(props){
    super(props);
    this.state={
      isLoading: true,
      user_login: false,
      initialArr:[1],
    }
    this.set_token()
  }

  set_token = async() =>{
    var tokken = await AsyncStorage.getItem('Manager_id')
    await this.setState({token: tokken})
    this.getData()
  }

  getData = () => {
    if(this.state.token){
      const formData = new FormData()
      formData.append("id", this.state.token);
      try{
        fetch(`${BasePath}manager_recent_reminders.php`, {
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
            this.setState({initialArr:[]})
            this.setState({initialArr:responseJson.recent_reminders,isloading: true})
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

  show_complete = (data) =>{
    if(data.status == "Completed"){
      return(
        <View style={{flexDirection: 'row',}}>
          <Text style={{fontSize:WP('4'),color:'red',textAlign: 'center'}}>Status: </Text>
          <Text style={{textDecorationLine: 'underline',fontSize:WP('4'),color:'red',textAlign: 'center'}} onPress={() => this.props.navigation.navigate('ManagerPreview',{item_id: data.id})}>Complete </Text>
        </View>
      )
    }else{
      return(
        <View style={{flexDirection: 'row',}}>
          <Text style={{fontSize:WP('4'),color:'red',textAlign: 'center'}}>Status: </Text>
          <Text style={{textDecorationLine: 'underline',fontSize:WP('4'),color:'red',textAlign: 'center'}} onPress={() => this.props.navigation.navigate('ManagerUpload',{item_id: data.id})}>InComplete</Text>
        </View>
      )

    }
  }

  render_reminders = () =>{
    if (this.state.isloading && this.state.initialArr.length > 0){
      return this.state.initialArr.map((item) => {
      return(
        <View style={{flex:1,justifyContent:'center',alignItems: 'center'}}>
          <View style = {{display:'flex',elevation:1,backgroundColor:"#fff",borderRadius:WP('5'),padding:WP('5'),margin:5,shadowOpacity:0.2}}>

          <Text style={{fontSize:WP('5')}}>You have reminder from Admin</Text>
          <Text style={{fontSize:WP('4'),color: 'red'}}>Message: {item.task_title}</Text>
          <Text style={{fontSize:WP('4'),color:'red'}}>Time: {item.created_at}</Text>
          {this.show_complete(item)}
          <Text style={{fontSize:WP('4'),color:'red'}}>Address: {item.property}</Text>

          </View>

        </View>
      )
    })

    }else if (this.state.isloading && this.state.initialArr.length == 0){
      <View style={{flex:1,justifyContent:'center',alignItems: 'center'}}>
          <Text style={{fontSize:22}}>No reminder Exist</Text>
        </View>
    }else{
      return null;
    }
  }

  render() {
    const { navigate } = this.props.navigation;

      return (
        <View style={styles.container}>
           <MyStatusBar backgroundColor="#5E8D48" barStyle="light-content" />
          <View style={{flex:2,width: windowWidth,flexDirection: 'row', backgroundColor:'black'}}>
            <View style= {{flex:0.8,justifyContent: 'center',alignItems: 'flex-start'}} >
              <TouchableOpacity onPress={() => this.props.navigation.goBack(null)}>
                <Image source={require('../assets/left.png')} style={{marginLeft: 15,height:25,width:25}} />
              </TouchableOpacity>
            </View>
            <View style={{flex:1.2,justifyContent: 'center',alignItems: 'flex-start'}}>
              <Text style={{fontSize:22,color:'white'}}>Reminders</Text>
            </View>

          </View>

          {this.state.initialArr.length != 0
            ?

          <View style={{flex:10}}>
            <ScrollView >

                {this.render_reminders()}

            </ScrollView>
          </View>
          :
          <View style = {{flex:10 ,alignItems:'center',justifyContent:'center'}}>
          <Image
          source = {require('../assets/noIncompletedTasks.png')}
          resizeMode = "contain"
          style = {{height:WP('20'),width:WP('20')}}
          />
          <Text style = {{color:"#000",fontWeight:'bold',fontSize:WP('5'),alignSelf:'center',marginTop:WP('3')}}>No Reminders!</Text>
        </View>
  }
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
