import React,{Component} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';



class Registro extends Component{

  constructor(props){
    super(props)
    this.state={
        email: "",
        pasword: ""
    }
  }
  
    render(){
  return (
        <View style = {styles.container}>

            <TextInput style = {styles.input}
                keyboardType="email-address"
                placeholder="Email"
                onChangeText={text => this.setState({email:text})}
            />

            <TextInput style = {styles.input}
                keyboardType="default"
                placeholder="Contraseña"
                onChangeText={text => this.setState({pasword:text})}
                secureTextEntry={true}
            />
            <TouchableOpacity style = {styles.button} onPress={()=> this.props.registrarse(this.state.email, this.state.pasword)}>
                <Text style={{color:'white',fontWeight:'bold'}}> Registrarse </Text>
            </TouchableOpacity>



        </View>
    
     
      
    
  );
    }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
      width:'80%',
      paddingVertical: 10,
      border:'solid 1px black',
      paddingLeft: 10,
      marginVertical:10,

  },
  button: {
      paddingVertical: 15,
      width:'60%',
      backgroundColor:'rgb(58, 58, 211)',
      paddingLeft: 50,
  }
});

export default Registro
