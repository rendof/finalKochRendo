import React,{Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Inicio from '../components/inicio';

class Home extends Component{
    render(){
  return (
    <View style={styles.container}>
      <Text>Pagina de Home!</Text>
      <Inicio/>
      
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

export default Home
