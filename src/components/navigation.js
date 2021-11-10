import React,{Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Home from '../screen/home';
import Perfil from '../screen/perfil';
import Registro from '../screen/registro';
import Login from '../screen/login';
import {createDrawerNavigator} from "@react-navigation/drawer"
const Drawer = createDrawerNavigator();
import {NavigationContainer} from "@react-navigation/native"


class   Navigation extends Component{

        render(){

            return(
                    
                     <NavigationContainer> 
                     
                         <Drawer.Navigator>
                                <Drawer.Screen name="Login" component={()=> <Login/>}/>
                                <Drawer.Screen name="Registro" component={()=> <Registro/>}/>
                                <Drawer.Screen name="Home" component={()=> <Home/>} />
                                <Drawer.Screen name="Perfil" component={()=> <Perfil/>} />
                            </Drawer.Navigator>   
                     </NavigationContainer>                                                                                            
                    
            )}
        
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Navigation
      
           