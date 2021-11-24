import React,{Component} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
import { auth, db } from '../firebase/config';
import Fotos from '../components/paginafotos';


class Perfil extends Component{
    constructor(props){
      super(props)
      this.state={
        post:[],
        deletePost: ''
      }
    }
    componentDidMount(){
      
      db.collection("posts").where("user", "==", auth.currentUser.email).onSnapshot((docs)=>{
        
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
    })
    }
      
    render(){
  return (
    <View style={styles.container}>
      <Text>Pagina del Perfil!!</Text>
      <Text>Email del usuario: {auth.currentUser.email}</Text>
      <Text>Fecha de Creacion: {auth.currentUser.metadata.creationTime}</Text>
      <Text>Ultima Conexion: {auth.currentUser.metadata.lastSignInTime}</Text>
      <TouchableOpacity  onPress={()=> this.props.logout()}>
                <Text>Desloguearse</Text>
            </TouchableOpacity>
            <Text style={styles.titulo} >Publicaciones</Text>
      <FlatList  
                    data={this.state.post} // tiene que tener la info que le vamso a dar que le mandamos de mas arriba los posteos
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
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titulo: {
    fontFamily: 'arial',
    fontSize: 30,
  }
});

export default Perfil
