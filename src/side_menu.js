
import React,{useEffect} from 'react';
import { StyleSheet,Image, View,Text } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';

import { createDrawerNavigator, DrawerContentScrollView,DrawerItem } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
// import {
//     useTheme,
//     Avatar,
//     Title,
//     Caption,
//     Paragraph,
//     Drawer,
//     Text,
//     TouchableRipple,
//     Switch
// } from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';


export default  function  DrawerContent({props,navigation}) {
    // async  function LoginScreen(){
    //     navigation.replace('Login')
    //    await AsyncStorage.setItem('userLogedin','false')
    //    await AsyncStorage.setItem('DELIVERY_BOY_USER_DATA','')
       
    // }
  
  
  return (
   <View style={{flex:1}}>
        <DrawerContentScrollView showsVerticalScrollIndicator={false} {...props}>
            <View style={styles.ImageContainer}>
                {/* <Image style={{width:100,height:100,top:50,borderRadius:100}} source={{ uri:'http://www.g7technologies.com/widi/public/user_profile_pic/'+img}}/> */}
                <Text style={styles.textcolor}>asdas</Text>
                <Text style={{   color:'#fff', marginLeft:20,marginTop:5,marginBottom:3,fontSize:11}}>asdasdas</Text>

            </View>
            <TouchableOpacity onPress={()=>navigation.navigate('Home')} style={styles.ButtonConatiner}>
                {/* <Image style={styles.Icon_image_style} source={require('../assets/home.png')}/> */}
                
                <View style={styles.buttonSubContainer}>
                    <Text style={styles.buton_text_color}>Home</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigation.navigate('Reminder')} style={styles.ButtonConatiner}>
                {/* <Image style={styles.Icon_image_style} source={require('../assets/user.png')}/> */}
                
                <View style={styles.buttonSubContainer}>
                    <Text style={styles.buton_text_color}>Profile</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity  onPress={()=>{navigation.closeDrawer(),navigation.navigate('History')}} style={styles.ButtonConatiner}>
                {/* <Image style={styles.Icon_image_style} source={require('../assets/motorbiking.png')}/> */}
                
                <View style={styles.buttonSubContainer}>
                    <Text style={styles.buton_text_color}>My Orders</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity  onPress={()=>{navigation.closeDrawer(),navigation.navigate('HelpCenter')}} style={styles.ButtonConatiner}>
                {/* <Image style={styles.Icon_image_style} source={require('../assets/information.png')}/> */}
                
                <View style={styles.buttonSubContainer}>
                    <Text style={styles.buton_text_color}>Help Center</Text>
                </View>
            </TouchableOpacity>
           
            <TouchableOpacity  onPress={()=>{navigation.closeDrawer(),navigation.navigate('Settings')}} style={styles.ButtonConatiner}>
                {/* <Image style={styles.Icon_image_style} source={require('../assets/settings.png')}/> */}
                
                <View style={styles.buttonSubContainer}>
                    <Text style={styles.buton_text_color}>Settings</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity  onPress={()=>{navigation.closeDrawer(),navigation.navigate('TermsandCondotion')}} style={styles.ButtonConatiner}>
                {/* <Image style={styles.Icon_image_style} source={require('../assets/accept.png')}/> */}
                
                <View style={styles.buttonSubContainer}>
                    <Text style={styles.buton_text_color}>Terms and Conditions </Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={async()=>
            {
                // navigation.replace('Dashboard')
                
                navigation.replace('Login')
            }
                } style={styles.ButtonConatiner}>
                {/* <Image style={styles.Icon_image_style} source={require('../assets/logout.png')}/> */}
                
                <View style={styles.buttonSubContainer}>
                    <Text style={styles.buton_text_color}>Sign out</Text>
                </View>
            </TouchableOpacity>

           
            
        </DrawerContentScrollView>
        
   </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',    
    },
    ImageContainer:{
        backgroundColor:'#0f76de',
        height:180,
        paddingHorizontal:10,
        justifyContent:'flex-end',
        bottom:30
    },
    textcolor:{
        color:'#fff',
        fontWeight:'bold',
        marginTop:50,
        marginLeft:20
    },
    ButtonConatiner:{
        flexDirection:'row',
        padding:10,
    },
    Icon_image_style:{
        width:15,
        height:15,
        resizeMode:'contain',
        top:10
    },
    buttonSubContainer:{
        marginLeft:10,
        borderBottomWidth:0.4,
        width:'100%',
        borderColor:'#dddddd',
        padding:10
    },
    buton_text_color:{
        color:'#676767',
        fontWeight:'500'
    }
});
