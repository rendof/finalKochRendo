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
    
     <View style={styles.container}>
        
            

        <View>

            <TextInput
                keyboardType="email-address"
                placeholder="Email"
                onChangeText={text => this.setState({email:text})}
            />

            <TextInput 
                keyboardType="default"
                placeholder="Contraseña"
                onChangeText={text => this.setState({pasword:text})}
                secureTextEntry={true}
            />
            <TouchableOpacity  onPress={()=> this.props.registrarse(this.state.email, this.state.pasword)}>
                <Text>Loguearse</Text>
            </TouchableOpacity>



        </View>
    
     
      
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
