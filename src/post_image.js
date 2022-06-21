import React from 'react';
import { Alert,Picker,Platform,ScrollView,StatusBar,ImageBackground,AsyncStorage,Image,ActivityIndicator,TouchableOpacity,Dimensions,StyleSheet, Text, View,
  ImageStore,
  ImageEditor,
} from 'react-native';
import { Constants } from 'expo';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import * as ImagePicker from 'expo-image-picker';
import ImgToBase64 from 'react-native-image-base64';
import Toast from 'react-native-tiny-toast'



import {BasePath} from '../config/path.js';

var windowWidth = Dimensions.get('window').width

const MyStatusBar = ({backgroundColor, ...props}) => (
  <View style={[styles.statusBar, { backgroundColor }]}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
);

export default class UploadImage extends React.Component {
  constructor(props){
    super(props);
    this.state={
      pickerSelection :1,
      isLoading: false,
      user_login: false,
      imgUri: null,
      base64_str: null,
      disable_button: false,
      location: null,
      errorMessage: null,
      item_id: this.props.navigation.state.params.item_id
    }
    this.set_token()
  }

  componentDidMount() {
    this._getLocationAsync();

  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      Alert.alert(
        'Permission Error',
        'Please Provide Proper Permissions or Turn on your GPS',
        [
          {text: 'OK', },
        ]
        )
    }else{
      let location = await Location.getCurrentPositionAsync({});
       await this.setState({ location });
    }

  };

  askPermissionsAsync = async () => {
    await Permissions.askAsync(Permissions.CAMERA);
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
  };

  _pickImage = async () => {
    await this.askPermissionsAsync();

        let result = await ImagePicker.launchCameraAsync({
          allowsEditing: false,
          base64: true,
          quality :0.3
        });
        if (!result.cancelled) {
          this.setState({ imgUri: result.uri });
          let imageUri = result ? result.base64: null;
          this.setState({ base64_str:`data:image/jpg;base64,${result.base64}` });



        }else{
        }

  }


  set_token = async() =>{
    var tokken = await AsyncStorage.getItem('id')
    await this.setState({token: tokken})
  }

  save_data = () => {
    this.setState({disable_button: true,isLoading: true})
    if(this.state.base64_str ){
      const formData = new FormData()
      formData.append("id", this.state.item_id);
      formData.append("longitude",this.state.location ? this.state.location.coords.longitude : null );
      formData.append("latitude", this.state.location ? this.state.location.coords.latitude : null);
      formData.append("image",this.state.base64_str);
      formData.append("duration",this.state.pickerSelection);
      try{
        fetch(`${BasePath}save_reminder.php`, {
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
            this.setState({disable_button: false,isLoading: false})
            Alert.alert(
              'Upload Successfull',
              'Reminder uploaded Successfully!',
              [
                {text: 'Cancel', onPress: () => this.props.navigation.navigate('Home'), style: 'cancel'},
                {text: 'OK', onPress: () => this.props.navigation.navigate('Home')},
              ],
              { cancelable: false }
            )

          }else{
            this.setState({disable_button: false,isLoading: false})
            Toast.show("Uploading reminder failed try again!")
          }
        })
        .catch((error) =>{
          console.log("showing error",error);
        });
      }catch(e){
        console.log('error', e);
      }
    }else{
      this.setState({disable_button: false,isLoading: false})
      Alert.alert("Please select image before save!")
    }
  }


  render() {
    const { navigate } = this.props.navigation;

      return (
        <View style={styles.container}>
           <MyStatusBar backgroundColor="#5E8D48" barStyle="light-content" />
          <View style={{flex:2,width: windowWidth,flexDirection: 'row', backgroundColor:'black'}}>
            <View style= {{flex:0.7,justifyContent: 'center',alignItems: 'flex-start'}} >
              <TouchableOpacity onPress={() => this.props.navigation.pop()}>
                <Image source={require('../assets/left.png')} style={{marginLeft: 15,height:25,width:25}} />
              </TouchableOpacity>
            </View>
            <View style={{flex:1.3,justifyContent: 'center',alignItems: 'flex-start'}}>
              <Text style={{fontSize:22,color:'white'}}>Upload Reminder</Text>
            </View>

          </View>
          <View style={{flex:10}}>

            <View style={{flex:8}}>
              <View style={{flex:4,justifyContent: 'center',alignItems: 'center'}}>
                 {this.state.imgUri ?
                <Image ref={(ref) => this.imageView = ref}
                  style={{ width: 250, height: 230,marginTop:30, backgroundColor: '#dddddd' }}
                  source={{ uri: this.state.imgUri }}
                /> : null }
              </View>
              <View style={{flex:2,justifyContent: 'center',alignItems: 'center',marginTop:50}}>
                { this.state.disable_button ?
                  <View style={{justifyContent: 'center',alignItems: 'center', width: windowWidth-80,height: 50,borderRadius: 20,backgroundColor: 'grey'}}>
                    <Text style={{fontSize:22,color:'white'}}>Take Picture</Text>
                  </View>
                :
                  <TouchableOpacity style={{justifyContent: 'center',alignItems: 'center', width: windowWidth-80,height: 50,borderRadius: 20,backgroundColor: 'black'}} onPress={this._pickImage}>
                    <Text style={{fontSize:22,color:'white'}}>Take Picture</Text>
                  </TouchableOpacity>
                }
              </View>
              <View style={{flex:0.5,marginLeft:15,justifyContent:'center',alignSelf:'center', width: "78%"}}>
                 <Text style={{fontWeight:"bold",fontSize:18,alignSelf:'center'}}>Select Duration:</Text>
              </View>
              <View style={{flex:0.8,width:"78%",alignSelf:'center',backgroundColor: 'black',borderRadius: 20}}>
                <Picker
                  style={{flex:1,color:'white',marginLeft:50,width:135,alignSelf:'center',fontSize:40}}
                  selectedValue={this.state.pickerSelection}
                  onValueChange={(itemValue,itemIndex) => this.setState({pickerSelection: itemValue})}>
                  <Picker.Item label="1 month" value="1" />
                  <Picker.Item label="2 months" value="2" />
                  <Picker.Item label="3 months" value="3" />
                  <Picker.Item label="4 months" value="4" />
                  <Picker.Item label="6 months" value="6" />
                </Picker>
              </View>
            </View>
            <View style={{flex:2,justifyContent: 'center',alignItems: 'center'}}>
              { this.state.isLoading ?
                <View style={{justifyContent: 'center',alignItems: 'center'}}>
                  <ActivityIndicator />
                </View>
                :
                <TouchableOpacity style={{justifyContent: 'center',alignItems: 'center', width: windowWidth-80,height: 50,borderRadius: 20,backgroundColor: 'black'}}onPress={this.save_data}>
                  <Text style={{fontSize:22,color:'white'}}>Save</Text>
                </TouchableOpacity>
              }
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
