import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import HomeScreen from './src/home.js';
import ManagerHomeScreen from './src/manager_home.js';
import ProfileScreen from './src/profile.js';
import LoginScreen from './src/login.js';
import Login_ManagerScreen from './src/loginManager';
import ForgotPasswordScreen from './src/forgot_password.js';
import ManagerForgotPasswordScreen from './src/manager_forgotpassword.js';
import SignupScreen from './src/signup.js';
import LogoutScreen from './src/logout.js';
import StripeScreen from './src/stripe.js';
import CompletedRemindersScreen from './src/completed_reminders.js';
import ManagerCompletedRemindersScreen from './src/manager_completed_reminders.js';
import UncompletedRemindersScreen from './src/uncompleted_reminders.js';
import ManagerUncomScreen from './src/manager_uncompleted_reminders.js';
import AuthLoadingScreen from './src/auth_loading.js';
import RemindersScreen from './src/reminders.js';
import ManagerRemindersScreen from './src/manager_reminder';
import HistoryScreen from './src/history.js';
import ManagerHistoryScreen from './src/manager_history.js';
import ImageScreen from './src/post_image.js';
import MImageScreen from './src/manager_post_image.js';
import PreviewScreen from './src/preview_image.js';
import ManagerPreviewScreen from './src/manager_preview.js';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createAppContainer,createSwitchNavigator} from 'react-navigation';
import Home from './src/home'
import { createDrawerNavigator } from '@react-navigation/drawer';
import SideMenu  from './src/side_menu.js';
const Drawer = createDrawerNavigator();
const Manager = createStackNavigator();
const NonManager = createStackNavigator();


export  function HomeScreensNonManager() {
  return (
   
      <NonManager.Navigator drawerContent={props=><SideMenu {...props}/>} initialRouteName="Home">
        <NonManager.Screen name="Home" component={Home} options={{headerShown:false}}/>
      <NonManager.Screen name="Preview" component={PreviewScreen} options={{headerShown:false}}/>
      <NonManager.Screen name="Upload" component={ImageScreen} options={{headerShown:false}} />
      <NonManager.Screen name="Signup" component={SignupScreen} options={{headerShown:false}}/>
      <NonManager.Screen name="UnCompleted" component={UncompletedRemindersScreen} options={{headerShown:false}}/>
      <NonManager.Screen name="Completed" component={CompletedRemindersScreen} options={{headerShown:false}}/>
      <NonManager.Screen name="Logout" component={LogoutScreen} options={{headerShown:false}}/>
      <NonManager.Screen name="Stripe" component={StripeScreen} options={{headerShown:false}}/>
      
      <NonManager.Screen name="ForgotPassword" component={ForgotPasswordScreen} options={{headerShown:false}}/>
      <NonManager.Screen name="MForgotPassword" component={ManagerForgotPasswordScreen} options={{headerShown:false}}/>
      <NonManager.Screen name="Profile" component={ProfileScreen} options={{headerShown:false}}/>
      <NonManager.Screen name="History" component={HistoryScreen} options={{headerShown:false}}/>
      <NonManager.Screen name="Reminder" component={RemindersScreen} options={{headerShown:false}}/>
      
       {/* /Screen  manager */}
      
      <NonManager.Screen name="ManagerHomeScreen" component={ManagerHomeScreen} options={{headerShown:false}}/>
      <NonManager.Screen name="ManagerReminder" component={ManagerRemindersScreen} options={{headerShown:false}}/>
      <NonManager.Screen name="ManagerPreview" component={ManagerPreviewScreen} options={{headerShown:false}}/>
      <NonManager.Screen name="ManagerUpload" component={MImageScreen} options={{headerShown:false}}/>
      <NonManager.Screen name="ManagerCompleted" component={ManagerCompletedRemindersScreen} options={{headerShown:false}}/>
      <NonManager.Screen name="MUnCompleted" component={ManagerUncomScreen} options={{headerShown:false}}/>
      <NonManager.Screen name="ManagerHistory" component={ManagerHistoryScreen} options={{headerShown:false}}/>
      <NonManager.Screen name="Login" component={LoginScreen} options={{headerShown:false}}/>
      <NonManager.Screen name="Login_Manager" component={Login_ManagerScreen} options={{headerShown:false}}/>


      
      </NonManager.Navigator>
  
  );
}
export  function HomeScreensManager() {
  return (
   
      <Manager.Navigator drawerContent={props=><SideMenu {...props}/>} initialRouteName="Home">
      <Manager.Screen name="ManagerHomeScreen" component={ManagerHomeScreen} options={{headerShown:false}}/>
     
      <Manager.Screen name="ManagerReminder" component={ManagerRemindersScreen} options={{headerShown:false}}/>
      
      
      <Manager.Screen name="ManagerPreview" component={ManagerPreviewScreen} options={{headerShown:false}}/>
      <Manager.Screen name="ManagerUpload" component={MImageScreen} options={{headerShown:false}}/>
      <Manager.Screen name="ManagerCompleted" component={ManagerCompletedRemindersScreen} options={{headerShown:false}}/>
      <Manager.Screen name="MUnCompleted" component={ManagerUncomScreen} options={{headerShown:false}}/>
      <Manager.Screen name="ManagerHistory" component={ManagerHistoryScreen} options={{headerShown:false}}/>
      <Manager.Screen name="Login" component={LoginScreen} options={{headerShown:false}}/>
      <Manager.Screen name="Login_Manager" component={Login_ManagerScreen} options={{headerShown:false}}/>

{/*Non Manager */}

      <Manager.Screen name="Home" component={Home} options={{headerShown:false}}/>
      <Manager.Screen name="Preview" component={PreviewScreen} options={{headerShown:false}}/>
      <Manager.Screen name="Upload" component={ImageScreen} options={{headerShown:false}} />
      <Manager.Screen name="Signup" component={SignupScreen} options={{headerShown:false}}/>
      <Manager.Screen name="UnCompleted" component={UncompletedRemindersScreen} options={{headerShown:false}}/>
      <Manager.Screen name="Completed" component={CompletedRemindersScreen} options={{headerShown:false}}/>
      <Manager.Screen name="Logout" component={LogoutScreen} options={{headerShown:false}}/>
      <Manager.Screen name="Stripe" component={StripeScreen} options={{headerShown:false}}/>
      
      <Manager.Screen name="ForgotPassword" component={ForgotPasswordScreen} options={{headerShown:false}}/>
      <Manager.Screen name="MForgotPassword" component={ManagerForgotPasswordScreen} options={{headerShown:false}}/>
      <Manager.Screen name="Profile" component={ProfileScreen} options={{headerShown:false}}/>
      <Manager.Screen name="History" component={HistoryScreen} options={{headerShown:false}}/>
      <Manager.Screen name="Reminder" component={RemindersScreen} options={{headerShown:false}}/>
      
      </Manager.Navigator>
  
  );
}




const AuthStack = createStackNavigator();
const AuthStackScreen = () => (
  <AuthStack.Navigator>
      <AuthStack.Screen name="Login" component={LoginScreen} options={{headerShown:false}}/>
      <AuthStack.Screen name="HomeScreen" component={HomeScreensNonManager} options={{headerShown:false}}/>
      <AuthStack.Screen name="ForgotPassword" component={ForgotPasswordScreen} options={{headerShown:false}}/>

      <AuthStack.Screen name="Login_Manager" component={Login_ManagerScreen} options={{headerShown:false}} />
      <AuthStack.Screen name="MForgotPassword" component={ManagerForgotPasswordScreen} options={{headerShown:false}}/>
      <AuthStack.Screen name="ManagerHomeScreen" component={HomeScreensManager} options={{headerShown:false}}/>
 
  </AuthStack.Navigator>
);



const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer  >
      <HomeScreensManager/>
    </NavigationContainer>
  );
}







