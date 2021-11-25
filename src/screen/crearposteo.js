import React,{Component} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import {db, auth} from '../firebase/config'
import NuestraCamara from '../components/nuestraCamara' 

class Posteo extends Component{
    constructor(props){
        super(props)
        this.state={
            title: "",
            description:"",
            url: ""
        
            
        }
    }

    onImageUpload(url){
      this.setState({
         
          url: url
          
      })
  }

    submitPost(){
       
        db.collection("posts").add({
            user: auth.currentUser.email,
            createdAt: Date.now(),
            title: this.state.title ,
            description: this.state.description ,
            likes: [],
            comments: [],
            image: this.state.url
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
      <Text>Comparti tu foto con la comunidad!</Text> 


    <NuestraCamara onImageUpload={(url) => this.onImageUpload(url)}/>   
  


      <TextInput style = {styles.input}
                    keyboardType="default"
                    placeholder="Título"
                    onChangeText={text => this.setState({title:text})}
                    
                    value={this.state.title}
                />
                <TextInput style = {styles.input}
                    keyboardType="default"
                    placeholder="Description"
                    onChangeText={text => this.setState({description:text})}
                    value={this.state.description}
                    multiline={true}
                />
                <TouchableOpacity  style = {styles.button} onPress={()=> this.submitPost()} >
                        <Text style={{color:'white',fontWeight:'bold'}} >Crea tu posteo</Text>
                       
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
    marginBottom:15,
}
});

export default Posteo