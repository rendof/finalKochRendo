import React,{Component} from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import {db} from "../firebase/config"
import Fotos from '../components/paginafotos';


class Home extends Component{
  constructor(){
    super()
    this.state={
        post : []
        
    }}
    componentDidMount(){
      
      db.collection("posts").orderBy("createdAt", "desc").onSnapshot((documentos)=>{
       
        let posts = []
        documentos.forEach((doc)=>{
          
            posts.push({
                id: doc.id,
                data: doc.data()
            })
            
        })
        this.setState({ 
            post: posts
        })
    })
    }
    render(){
  return (
    <View style={styles.container}>
      <Text style={styles.titulo} >Home</Text>
      <FlatList  
                    data={this.state.post} 
                    keyExtractor={(data)=> data.id}
                    renderItem={(item)=>( <Fotos style={styles.posteo} data={item}/> )}  >
                </FlatList>
                
      
      
    </View>
  );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titulo: {
    fontFamily: 'arial',
    fontSize: 30,
  }


  
});

export default Home
