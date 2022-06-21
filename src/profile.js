import React from 'react';
import { Dimensions,TouchableOpacity, Image,StyleSheet, Text, View } from 'react-native';
var windowWidth = Dimensions.get('window').width

export default class Profile extends React.Component {
  constructor(props){
    super(props);
    this.state={
      number: ''
    }
    this.setNumber();
  }

  setNumber = async() =>{
    var random = await Math.floor(Math.random() * (1 - 0 + 1)) + 0
    this.setState({number: random})
  }

  show = () =>{
    if(this.state.number == 1){
      return(
        <Text>Congratulation you are winner</Text>
      )
    }else{
      return(
        <View style={{flex:5, width: windowWidth-40,justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{fontSize:28,fontWeight: 'bold'}}>Sorry did not win today's drawing</Text>
          <Text style={{fontSize:28,fontWeight: 'bold'}}>
            Increase your chances of winning by skipping the ads for just $0.99 / mo!  
          </Text>
          <View style={{flex:2,justifyContent: 'center', alignItems: 'center'}}>
            <TouchableOpacity style={styles.contest_button} >
              <Text style={{color: 'white', fontSize: 18}}>
                  Subscribe
                </Text>
            </TouchableOpacity>
          </View>
          <View style={{flex:2,justifyContent: 'center', alignItems: 'center'}}>
          </View>
        </View>
      )
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{flex:12, justifyContent: 'center', alignItems: 'center'}}>
          <View style={styles.heading}>
            <Image
              source={require('../assets/app-icon.png')}
              style={styles.icon}
            />
          </View>
          <View style={{flex:10}}>
            {this.show()}
            <View style={{flex:5}}>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
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
  contest_button:{
    flex:2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00B0F6',
    width: windowWidth-45,
    marginTop: 15,
    borderRadius:10,
    height: 50
  }
});
