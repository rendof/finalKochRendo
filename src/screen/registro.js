import React,{Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';


class Registro extends Component{
    render(){
  return (
    <View style={styles.container}>
      <Text>Pagina de Registro!</Text>
     
      
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

export default Registro
