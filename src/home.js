import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import { StatusBar,ImageBackground,AsyncStorage,Image,ActivityIndicator,TouchableOpacity,Dimensions,StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import SideMenu  from './side_menu.js';


var windowWidth = Dimensions.get('window').width

const MyStatusBar = ({backgroundColor, ...props}) => (
  <View style={[styles.statusBar, { backgroundColor }]}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
);

class Home extends React.Component {
  constructor(props){
    super(props);
    this.state={
      isLoading: false,
      user_login: false,
    }
  }

  user_data = async() =>{
    var tokken = await AsyncStorage.getItem('token')
    if(tokken != null){
      this.setState({isLoading:false})
    }

  }

  componentDidMount(){

  }


  show_button = (navigate) =>{
    if(this.state.user_login){
      return(
        <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
          <TouchableOpacity onPress={() => this.start_contest(navigate)}>
            <Image source={require('../assets/btn-start-contest.png')} style={{height: 30,width:windowWidth-190}} />
          </TouchableOpacity>
        </View>
      )
    }else{
      return(
        <View style={{flex:1,justifyContent:'center', alignItems: 'center'}}>
          <TouchableOpacity onPress={() => navigate('Login')} >
            <Image source={require('../assets/btn-login.png')} style={{height: 30,width:windowWidth-190}} />

          </TouchableOpacity>
        </View>
      )
    }
  }

  render() {
    const { navigate } = this.props.navigation;
    if(this.state.isLoading){
      return(
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
          <ActivityIndicator/>
        </View>
      )
    }else{
      return (
        <View style={styles.container}>
           <MyStatusBar backgroundColor="#5E8D48" barStyle="light-content" />
          <View style={{flex:2,width: windowWidth,flexDirection: 'row', backgroundColor:'black'}}>
            <View style= {{flex:0.7,justifyContent: 'center',alignItems: 'flex-start'}} >
              <TouchableOpacity onPress={() => this.props.navigation.toggleDrawer()}>
                <Image source={require('../assets/menu.png')} style={{marginLeft: 15,height:25,width:25}} />
              </TouchableOpacity>
            </View>
            <View style={{flex:1.3,justifyContent: 'center',alignItems: 'flex-start'}}>
              <Text style={{fontSize:22,color:'white'}}>Dashboard</Text>
            </View>

          </View>
          <View style={{flex:10}}>
            <View style={{flex:4,width: windowWidth}}>
              <View style={{flex:1.5,justifyContent:'center',alignItems: 'center'}}>
                <View style={{flex:0.5}}></View>
                <TouchableOpacity style={styles.login_btn} onPress={() => this.props.navigation.navigate("Reminder")} >
                  <Text style={{color: 'white',fontSize: 22}}>Reminders</Text>
                </TouchableOpacity>
              </View>
              <View style={{flex:1.5,flexDirection:'row'}}>
                <View style={{flex:0.7,justifyContent:'center',alignItems: 'flex-end'}}>
                  <TouchableOpacity onPress={() => this.props.navigation.navigate('Completed')}>
                    <Text style={{color: 'grey',fontSize: 22}}>Completed</Text>
                  </TouchableOpacity>
                </View>
                <View style={{flex:0.1,justifyContent:'center',alignItems: 'center'}}>
                  <Text style={{color: 'grey',fontSize: 22}}>|</Text>
                </View>
                <View style={{flex:0.7,justifyContent:'center',alignItems: 'flex-start'}}>
                  <TouchableOpacity onPress={() => this.props.navigation.navigate('UnCompleted')}>
                    <Text style={{color: 'black',fontSize: 22}}>Incompleted</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={{flex:7}}>
              <Image
                source={require('../assets/winner-bg.jpg')}
                style={{
                  flex:7,
                  height :null,
                  width: null,
                  resizeMode: 'cover'
                }}
              />
            </View>

          </View>

        </View>
      );
    }
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
    backgroundColor: '#FF0048',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30
  },

  icon:{
    height: 50,
    width: 50
  }

});

const HomeSrc=createDrawerNavigator()
export  function HomeScreensNonManager() {
  return(
 
    <HomeSrc.Navigator drawerContent={props=><SideMenu {...props}/>} initialRouteName="Home">
      <HomeSrc.Screen name="Home" component={Home} options={{headerShown:false}}/>
    </HomeSrc.Navigator>
  
  )
}
export default HomeScreensNonManager
