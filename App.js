import React, { useState } from 'react'
import { NavigationContainer, useNavigation } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BlurView } from "@react-native-community/blur";
import LoginV from './src/LoginV/LoginV'
import FlashScreen from './src/FlashScreen/FlashScreen'
import WelcomePageV from './src/WelcomePageV/WelcomePageV'
import HomeScreenV from './src/HomeScreenV/HomeScreenV'
import { globalstyles } from './src/globalstyles'
import { View, Image, Text, TouchableOpacity } from 'react-native';
import SubscriptionV from './src/SubscriptionV/SubscriptionV';
import NotificationV from './src/NotificationV/NotificationV';
import ProfileV from './src/ProfileV/ProfileV';
import ProfileEditV from './src/ProfileEditV/ProfileEditV';
import ListOfBookingsV from './src/ListOfBookingsV/ListOfBookingsV';
import VendorRegistration from './src/VendorRegistration/VendorRegistration';
import ServiceUploadV from './src/ServiceUploadV/ServiceUploadV';
import WelcomePage from './src/WelcomePage/WelcomePage';
import Signup from './src/Signup/Signup';
import ForgetPassword from './src/ForgetPassword/ForgetPassword';
import OTPVerification from './src/OTPVerification/OTPVerification';
import ServiceBooking from './src/ServiceBooking/ServiceBooking';
import Login from './src/Login/Login';
import HomeScreen from './src/HomeScreen/HomeScreen';
import ListofService from './src/ListofService/ListofService';
import DetailsofService from './src/DetailsofService/DetailsofService';
import Notification from './src/Notification/Notification';
import Profile from './src/Profile/Profile';
import ProfileEdit from './src/ProfileEdit/ProfileEdit';
import ChangePassword from './src/ChangePassword/ChangePassword';
import Subscription from './src/Subscription/Subscription';
import Categories from './src/Categories/Categories';
import ListOfBookings from './src/ListOfBookings/ListOfBookings';
import { FloatingAction } from "react-native-floating-action";
import ServiceManagementV from './src/ServiceManagementV/ServiceManagementV';
import Populardata from './src/Populardata/Populardata';

const stack = createStackNavigator()
const Tab = createBottomTabNavigator();

global.Type = 2;
// global.shadow = 0;   15?
global.URL = 'https://www.demo603.amrithaa.com/bookmywages/admin/public/api/'
global.IMG = 'https://www.demo603.amrithaa.com/bookmywages/admin/public/images/'

// global.IMGG = 'https://www.demo603.amrithaa.com/bookmywages/admin/public/'


function Dashboardstack() {
  return (
    <stack.Navigator initialRouteName="HomeScreen">
      <stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
      <stack.Screen name="ListofService" component={ListofService} options={{ headerShown: false }} />
      <stack.Screen name="Populardata" component={Populardata} options={{ headerShown: false }} />
      <stack.Screen name="ServiceBooking" component={ServiceBooking} options={{ headerShown: false }} />
      <stack.Screen name="DetailsofService" component={DetailsofService} options={{ headerShown: false }} />
      <stack.Screen name="Notification" component={Notification} options={{ headerShown: false }} />
      <stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
      <stack.Screen name="ProfileEdit" component={ProfileEdit} options={{ headerShown: false }} />
      <stack.Screen name="ChangePassword" component={ChangePassword} options={{ headerShown: false }} />
    </stack.Navigator>
  );
}


function TabNavigator() {
  const navigation = useNavigation();
  const [fabPressed, setFabPressed] = useState(null);

  const GoUser = async (vall) => {
    // console.log('----->>', vall)
    global.Type = vall;
    // global.shadow = 0;
    setFabPressed(null);
    navigation.navigate('FlashScreen')
  };
  const ToProfile = async () => {
    setFabPressed(null);
    // global.shadow = 0
    navigation.navigate('Profile');
  }
  const GoVendor = async (vall) => {
    // console.log('----->>', vall)
    global.Type = vall;
    // global.shadow = 0;
    setFabPressed(null);
    navigation.navigate('WelcomePageV')
  };
  const ToProfileV = async () => {
    setFabPressed(null);
    // global.shadow = 0;
    navigation.navigate('ProfileV');
  }

  const renderFabButton = (type, actions) => (
    // console.log('type', type),
    // global.shadow = 1,
    <View style={{ bottom: 0, left: '2%', right: 0, borderColor: 'red', justifyContent: 'center', alignItems: 'center', zIndex: 999, }} >
      <FloatingAction
        buttonSize={48}
        floatingIcon={<Image resizeMode="contain" source={require('./images/plusicon2.png')} style={globalstyles.plusicon2} />}
        color="#FFFFFF"
        position="center"
        // actions={actions}
        // onPressMain={() => setFabPressed(type)}
        onPressMain={() => setFabPressed(fabPressed === type ? null : type)}
      />
    </View>
  );
  return (
    <>
      <Tab.Navigator
        // initialRouteName={global.Type == 2 ? 'HomeScreenU' : 'HomeScreenV'}
        screenOptions={{
          headerShown: false, // tabBarInactiveBackgroundColor: 'red', // tabBarActiveBackgroundColor: 'red',  alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: 'red',
          tabBarShowLabel: false, tabBarStyle: { height: 44, },
        }}
      >
        {global.Type == 1 &&
          <>
            <Tab.Screen name="HomeScreenV" component={HomeScreenV}
              options={{
                tabBarIcon: ({ focused }) => (
                  <View style={globalstyles.tabview}>
                    {focused && <Text style={globalstyles.activetabline}></Text>}
                    {focused ?
                      <Image resizeMode='contain' source={require('./images/home.png')} style={globalstyles.homeimg} />
                      :
                      <Image resizeMode='contain' source={require('./images/home2.png')} style={globalstyles.homeimg} />
                    }
                  </View>
                ),
              }}
            />
            <Tab.Screen name="SubscriptionV" component={SubscriptionV}
              options={{
                tabBarIcon: ({ focused }) => (
                  <View style={globalstyles.tabview}>
                    {focused && <Text style={globalstyles.activetabline}></Text>}
                    {focused ?
                      <Image resizeMode='contain' source={require('./images/subicon.png')} style={globalstyles.subimg} />
                      :
                      <Image resizeMode='contain' source={require('./images/subicon2.png')} style={globalstyles.subimg} />
                    }
                  </View>
                ),
              }}
            />

            <Tab.Screen name="ServiceUploadV" component={ServiceUploadV}
              options={{
                tabBarIcon: ({ focused }) => (
                  <View style={globalstyles.tabview}>
                    {focused && <Text style={globalstyles.activetabline}></Text>}
                    {focused ?
                      <Image resizeMode='contain' source={require('./images/caticon.png')} style={globalstyles.homeimg} />
                      :
                      <Image resizeMode='contain' source={require('./images/bookserviceicon2.png')} style={globalstyles.homeimg} />
                    }
                  </View>
                ),
              }}
            />
            <Tab.Screen name="ListOfBookingsV" component={ListOfBookingsV}
              options={{
                tabBarIcon: ({ focused }) => (
                  <View style={globalstyles.tabview}>
                    {focused && <Text style={globalstyles.activetabline}></Text>}
                    {focused ?
                      <Image resizeMode='contain' source={require('./images/listicon.png')} style={globalstyles.historyimg} />
                      :
                      <Image resizeMode='contain' source={require('./images/listicon2.png')} style={globalstyles.historyimg} />
                    }
                  </View>
                ),
              }}
            />
          </>
        }
        {global.Type == 2 &&
          <>

            <Tab.Screen name="HomeScreen" component={Dashboardstack}
              options={{
                tabBarIcon: ({ focused }) => (
                  <View style={globalstyles.tabview}>
                    {focused && <Text style={globalstyles.activetabline}></Text>}
                    {focused ?
                      <Image resizeMode='contain' source={require('./images/home.png')} style={globalstyles.homeimg} />
                      :
                      <Image resizeMode='contain' source={require('./images/home2.png')} style={globalstyles.homeimg} />
                    }
                  </View>
                ),
              }}
            />
            <Tab.Screen name="Subscription" component={Subscription}
              options={{
                tabBarIcon: ({ focused }) => (
                  <View style={globalstyles.tabview}>
                    {focused && <Text style={globalstyles.activetabline}></Text>}
                    {focused ?
                      <Image resizeMode='contain' source={require('./images/subicon.png')} style={globalstyles.subimg} />
                      :
                      <Image resizeMode='contain' source={require('./images/subicon2.png')} style={globalstyles.subimg} />
                    }
                  </View>
                ),
              }}
            />

            <Tab.Screen name="Categories" component={Categories}
              options={{
                tabBarIcon: ({ focused }) => (
                  <View style={globalstyles.tabview}>
                    {focused && <Text style={globalstyles.activetabline}></Text>}
                    {focused ?
                      <Image resizeMode='contain' source={require('./images/caticon.png')} style={globalstyles.homeimg} />
                      :
                      <Image resizeMode='contain' source={require('./images/bookserviceicon2.png')} style={globalstyles.homeimg} />
                    }
                  </View>
                ),
              }}
            />
            <Tab.Screen name="ListOfBookings" component={ListOfBookings}
              options={{
                tabBarIcon: ({ focused }) => (
                  <View style={globalstyles.tabview}>
                    {focused && <Text style={globalstyles.activetabline}></Text>}
                    {focused ?
                      <Image resizeMode='contain' source={require('./images/listicon.png')} style={globalstyles.historyimg} />
                      :
                      <Image resizeMode='contain' source={require('./images/listicon2.png')} style={globalstyles.historyimg} />
                    }
                  </View>
                ),
              }}
            />
          </>
        }
      </Tab.Navigator>

      {global.Type == 1 && renderFabButton('vendor')}
      {global.Type == 2 && renderFabButton('user')}

      {fabPressed && (
        <>
          {fabPressed === 'user' ? (
            // <>
            <View style={globalstyles.catbtnview}>
              {/* <BlurView blurType="light" blurAmount={1} style={globalstyles.blurcat}> */}
              <TouchableOpacity onPress={() => GoVendor(1)}>
                <View style={globalstyles.catbuttons} >
                  <Image resizeMode="contain" source={require('./images/vendoricon.png')} style={globalstyles.cateditimg} />
                </View>
                <Text style={globalstyles.catedittxt}>Vendor</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => ToProfile()}>
                <View style={globalstyles.catbuttons} >
                  <Image resizeMode="contain" source={require('./images/usericon2.png')} style={globalstyles.cateditimg} />
                </View>
                <Text style={globalstyles.catedittxt}>Profile</Text>
              </TouchableOpacity>
              {/* </BlurView> */}
            </View>
            // </>
          ) : (
            // <>
            <View style={globalstyles.catbtnview}>
              {/* <BlurView style={{ flex: 1 }} blurType="light" blurAmount={1}> */}
              <TouchableOpacity onPress={() => GoUser(2)}>
                <View style={globalstyles.catbuttons}>
                  <Image resizeMode="contain" source={require('./images/userhome.png')} style={globalstyles.cateditimg} />
                </View>
                <Text style={globalstyles.catedittxt}>User</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => ToProfileV()}>
                <View style={globalstyles.catbuttons}>
                  <Image resizeMode="contain" source={require('./images/usericon2.png')} style={globalstyles.cateditimg} />
                </View>
                <Text style={globalstyles.catedittxt}>Profile</Text>
              </TouchableOpacity>
              {/* </BlurView> */}
            </View>
            // {/* </> */}
          )}
        </>
      )}

    </>
  )
}


const MainNavigation = () => {
  return (

    <NavigationContainer>
      <stack.Navigator initialRouteName='FlashScreen'>
        {/* Vendor */}
        <stack.Screen name="NotificationV" component={NotificationV} options={{ headerShown: false }} />
        <stack.Screen name="ProfileV" component={ProfileV} options={{ headerShown: false }} />
        <stack.Screen name="ProfileEditV" component={ProfileEditV} options={{ headerShown: false }} />
        {/* SubscriptionV */}
        <stack.Screen name="FlashScreen" component={FlashScreen} options={{ headerShown: false }} />
        <stack.Screen name="WelcomePageV" component={WelcomePageV} options={{ headerShown: false }} />
        <stack.Screen name="VendorRegistration" component={VendorRegistration} options={{ headerShown: false }} />
        <stack.Screen name="LoginV" component={LoginV} options={{ headerShown: false }} />
        <stack.Screen name="HomeScreenV" component={TabNavigator} options={{ headerShown: false }} />

        {/* user */}
        <stack.Screen name="WelcomePage" component={WelcomePage} options={{ headerShown: false }} />
        <stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />
        <stack.Screen name="ForgetPassword" component={ForgetPassword} options={{ headerShown: false }} />
        <stack.Screen name="OTPVerification" component={OTPVerification} options={{ headerShown: false }} />
        <stack.Screen name="HomeScreen" component={TabNavigator} options={{ headerShown: false }} />
        {/* <stack.Screen name="DetailsofService" component={DetailsofService} options={{ headerShown: false }} />  */}
        <stack.Screen name="ServiceBooking" component={ServiceBooking} options={{ headerShown: false }} />
        <stack.Screen name="ServiceManagementV" component={ServiceManagementV} options={{ headerShown: false }} />

      </stack.Navigator>

    </NavigationContainer>

  )
}

export default MainNavigation