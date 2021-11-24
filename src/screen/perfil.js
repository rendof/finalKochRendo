import React,{Component} from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { auth, db } from '../firebase/config';


class Perfil extends Component{
    constructor(props){
      super(props)
      this.state={
        posts:[],
        deletePost: ''
      }
    }

    render(){
  return (
    <View style={styles.container}>
      <Text>Pagina del Perfil!!</Text>
      <Text>Email del usuario: {auth.currentUser.email}</Text>
      <Text>Fecha de Cracion: {}</Text>
      <Text>Ultima Conexion: {}</Text>
      <TouchableOpacity  onPress={()=> this.props.logout()}>
                <Text>Desloguearse</Text>
            </TouchableOpacity>

      
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
});

export default Perfil
