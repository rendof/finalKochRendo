import React,{Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Home from '../screen/home';
import Perfil from '../screen/perfil';
import Registro from '../screen/registro';
import Login from '../screen/login';
import {createDrawerNavigator} from "@react-navigation/drawer" //paso 1
const Drawer = createDrawerNavigator(); //pasoo 1.2
import {auth} from "../firebase/config" 
import {NavigationContainer} from "@react-navigation/native" //paso 1.3
import Posteo from '../screen/crearposteo';
import Buscador from '../screen/buscador';



class Navigation extends Component{ //Componente padre, perfil, login, home, registro, hijos. 

  constructor(){
    super()
    this.state={
      logueado: false,
      errores: ""
    }
  }
  componentDidMount(){ 
    auth.onAuthStateChanged((user)=> {    //cuando cambia el estado de perfil de auth, se pregunta si usuario es falso, logeado es falso, entonces te muestra las opciones de register.
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
  Login(email,pass){ //metodos que cambian la informacion cuando la clickeas
    auth.signInWithEmailAndPassword(email,pass) //m,ientras registro te crea un usuario, login los busca en la parte de auth de bd y lo logea.
        .then(()=>{return (this.setState({
            logueado: true,
        })
        )})
        .catch((error)=> this.setState({errores: error.message}))
  }
  
  Registro(email,pass){ //autentica el perfil
    auth.createUserWithEmailAndPassword(email,pass) //datos que guarda el email y  la contra, los crea. crea un perfil, se ejecuta con login.
        .then(()=> {return (this.setState({
            logueado: true,
        })
        )})
        .catch((error)=> this.setState({errores: error.message}))
  }

  Logout(){ 
    auth.signOut() //saca al perfil, dejas de estar activo
  }
        render(){

            return(
                    
                     <NavigationContainer> 
                       {/* paso 2  */}
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
      
           