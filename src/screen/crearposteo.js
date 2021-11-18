import React,{Component} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import {db, auth} from '../firebase/config'

class Posteo extends Component{
    constructor(props){
        super(props)
        this.state={
            title: "",
            description:"",
        
            
        }
    }

    submitPost(){
        // de.collection se fija en la base se datos y crea algo en la coleccion posts
        // agrega loq ue vos le pidas  en este caso user title y demas 
        db.collection("posts").add({
            user: auth.currentUser.email,
            createdAt: Date.now(),
            title: this.state.title ,
            description: this.state.description ,
            likes: [],
            comments: [],
        })
        .then(() => {
            this.setState({
                title:"",
                description:""
            })
        })
        .catch((err)=>console.log(err))
    }
    render(){
  return (
    <View style={styles.container}>
      <Text>PAGINA DE Posteo</Text> 
      {/* el text imput solo toma texto */}
      <TextInput 
                    keyboardType="default"
                    placeholder="Título"
                    onChangeText={text => this.setState({title:text})}
                    // on change solo temcambia el valor de los estados, no hace la magia ni sube archivo
                    value={this.state.title}
                />
                <TextInput 
                    keyboardType="default"
                    placeholder="Description"
                    onChangeText={text => this.setState({description:text})}
                    value={this.state.description}
                    multiline={true}
                />
                <TouchableOpacity   onPress={()=> this.submitPost()} >
                        <Text >Crea tu posteo</Text>
                        {/* cuando das click ejecuta el submit post */}
                        {/*  submit post es elq ue se encarga de subir todo */}
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

export default Posteo