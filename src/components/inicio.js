import React,{Component} from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

class Inicio extends Component{
    render(){
  return (
    <View style={styles.container}>
      <Text>Este es el inicio de la app</Text>
      <TouchableOpacity style={styles.touchabel} onPress={}> 


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
  touchabel: {
    textAlign:"center",
    padding: 5,
    backgroundColor: "#28a745",
    marginBottom: 10,
    borderRadius:4,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderStyle:"solid",
    borderWidth:1,
    borderColor:"#28a745"
  }
});

export default Inicio
