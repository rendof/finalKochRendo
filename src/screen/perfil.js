import React,{Component} from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';


class Perfil extends Component{
    constructor(props){
      super()
      this.state={

      }
    }
    render(){
  return (
    <View style={styles.container}>
      <Text>Pagina del Perfil!!</Text>
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
