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
      <Text style={{color:'black',fontWeight:'bold',marginBottom:10,fontSize:30,marginTop:15}}>Perfil</Text>
      <Text style={styles.fechas}>Email del usuario: {auth.currentUser.email}</Text>
      <Text style={{color:'black',fontWeight:'bold',}}> Fecha de Creación:</Text>
      <Text style={styles.fechas}> {auth.currentUser.metadata.creationTime}</Text>
      <Text style={{color:'black',fontWeight:'bold',}}> Ultima Conexión: </Text>
      <Text style={styles.fechas}>{auth.currentUser.metadata.lastSignInTime}</Text>
      <TouchableOpacity style = {styles.button} onPress={()=> this.props.logout()}>
                <Text>Desloguearse</Text>
            </TouchableOpacity>
            <Text style={styles.titulo} >Publicaciones</Text>
      <FlatList  
                    data={this.state.post} 
                    keyExtractor={(data)=> data.id}
                    renderItem={(item)=>( <Fotos style={styles.posteo} data={item} borrarPosteo={true}/> )}  >
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
  },
  button: {
    paddingVertical: 15,
    width:'60%',
    backgroundColor:'rgb(58, 58, 211)',
    paddingLeft: 60,

},
  fechas: {
    color:'black',
    marginBottom:10,
    fontSize:13,
    marginTop:10,
    paddingHorizontal: 15,
    alignSelf: 'center',
  },
});

export default Perfil
