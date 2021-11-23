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
      //component didmount se ejecuta cuando corre el codigo
      //cuando se actualiza el render el component didmount se vuelce a ejecutar
      //se ejecuta siempre que se ejecute el render y ekjecuta todo lo que hay dentro suyo
      //sirve para por ej un fech que no tiene un boton 
      // en este caso lo usamos para traer los posteos
      // para ver los posteos usamos el metodo onSnapchot
      db.collection("posts").onSnapshot((docs)=>{
        //onsnapshot es la encargada de traer loque hay dentro de posteos y le pone de nombre docs
        let posts = []
        docs.forEach((doc)=>{
          //recorren todo docs y llaman a cada documento que les trae doc
            posts.push({
                id: doc.id,
                data: doc.data()
            })
            //le pushean a post el/los id y la data del posteo que trajeron 
        })
        this.setState({
          // es una funcioon asincronica 
          //si ahces un set estate no ejecutes un codigo abajo sin un callback! por que puede no traerte informacion
            post: posts
        })
    })
    }
    render(){
  return (
    <View style={styles.container}>
      <Text style={styles.titulo} >Pagina de Home!</Text>
      <FlatList  
                    data={this.state.post} // tiene que tener la info que le vamso a dar que le mandamos de mas arriba los posteos
                    keyExtractor={(data)=> data.id}
                    renderItem={(item)=>( <Fotos style={styles.posteo} data={item}/> )}  >
                </FlatList>
                {/* no existe un map, flatlist es lo mismo aprox */}
      
      
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
