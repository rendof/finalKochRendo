import React, {Component} from 'react';
import { StyleSheet,Text, View, TouchableOpacity, Image, FlatList, ActivityIndicator, TextInput } from 'react-native';
import Fotos from '../components/paginafotos';
import {db} from "../firebase/config"
class Buscador extends Component{

    constructor(){
        super()
        this.state={
            perfil:"",
            post: [],
            
        }
    }

    showPost(){
        
            (db.collection("posts").where("user", "==", this.state.perfil).onSnapshot((docs)=>{
                let posts = []
                docs.forEach((doc)=>{
                    posts.push({
                        id: doc.id,
                        data: doc.data()
                    })
                })
                this.setState({
                    post: posts
                })
            }))  
        
    }

    
    

    render(){
        return(
             <View style={styles.buscador}> 


            <TextInput style={styles.input}
                keyboardType="email-address"
                placeholder="Email"
                onChangeText={text => this.setState({perfil:text})}
            />
    
                <TouchableOpacity style={styles.button} onPress={()=> this.showPost()}>
                    <Text style={{color:'white',fontWeight:'bold'}}>Buscar Post</Text>
                </TouchableOpacity>
           
            <FlatList  
                    data={this.state.post}
                    keyExtractor={(data)=> data.id}
                    renderItem={(item)=>( <Fotos data={item}/> )}  >
            </FlatList>
            
            </View>

            
        )
    }
   
}
const styles = StyleSheet.create({
    input: {
        width:'80%',
        paddingVertical: 10,
        border:'solid 1px black',
        paddingLeft: 10,
        marginVertical:10,
        marginLeft:20,
    },
    button: {
        paddingVertical: 15,
        width:'60%',
        backgroundColor:'rgb(58, 58, 211)',
        paddingLeft: 50,
        marginLeft: 50,
    }
})

export default Buscador