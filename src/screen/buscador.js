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
    
                <TouchableOpacity style={styles.touchable} onPress={()=> this.showPost()}>
                    <Text style={styles.texto}>Buscar Post</Text>
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
})

export default Buscador