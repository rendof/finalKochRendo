import React,{Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Home from '../screen/home';
import Perfil from '../screen/perfil';
import Registro from '../screen/registro';
import Login from '../screen/login';
import {createDrawerNavigator} from "@react-navigation/drawer" 
const Drawer = createDrawerNavigator(); 
import {auth} from "../firebase/config" 
import {NavigationContainer} from "@react-navigation/native" 
import Posteo from '../screen/crearposteo';
import Buscador from '../screen/buscador';



class Navigation extends Component{ 

  constructor(){
    super()
    this.state={
      logueado: false,
      errores: ""
    }
  }
  componentDidMount(){ 
    auth.onAuthStateChanged((user)=> {   
        if (user) {
            this.setState({
                logueado: true,
            })
        }
        else{
            this.setState({
                logueado: false,
            })
        }

    })
}
  Login(email,pass){ 
    auth.signInWithEmailAndPassword(email,pass) 
        .then(()=>{return (this.setState({
            logueado: true,
        })
        )})
        .catch((error)=> this.setState({errores: error.message}))
  }
  
  Registro(email,pass){ 
    auth.createUserWithEmailAndPassword(email,pass) 
        .then(()=> {return (this.setState({
            logueado: true,
        })
        )})
        .catch((error)=> this.setState({errores: error.message}))
  }

  Logout(){ 
    auth.signOut() 
  }
        render(){

            return(
                    
                     <NavigationContainer> 
                       
                     { this.state.logueado==false? 
                     

                     
                         <Drawer.Navigator>
                                <Drawer.Screen name="Login" component={()=> <Login loguearse={(email,pass)=>this.Login(email,pass)}/>}/>
                                <Drawer.Screen name="Registro" component={()=> <Registro registrarse={(email,pass)=>this.Registro(email,pass)}/>}/>
                              </Drawer.Navigator>:
                              <Drawer.Navigator>
                                <Drawer.Screen name="Home" component={()=> <Home/>} />
                                <Drawer.Screen name="Perfil" component={()=> <Perfil logout={()=>this.Logout()}/>}/>
                                <Drawer.Screen name="Nuevo Posteo" component={()=> <Posteo/>} />
                                <Drawer.Screen name="Buscador" component={()=> <Buscador/>} /> 
                            </Drawer.Navigator>   
                   }  </NavigationContainer>                                                                                            
                    
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
      
           