import React,{Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';


class Perfil extends Component{
    render(){
  return (
    <View style={styles.container}>
      <Text>Pagina del Perfil!!</Text>
   
      
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
