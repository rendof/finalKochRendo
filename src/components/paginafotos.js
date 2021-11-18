import React,{Component} from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { db, auth } from '../firebase/config';
import firebase from 'firebase';
import "firebase/firestore"


class Fotos extends Component{
    constructor(props){
      super(props)
      this.state={
      likeado: false
      }
    }
    componentDidMount(){
        if (this.props.data.item.data.likes.includes(`${auth.currentUser.email}`)) {
            this.setState({
                likeado:true
            })
            
        } 
        else{
         this.setState({
             likeado:false
         })
        } 
         
     }

like(id){ //el id llega de abajo, del "boton"
    if (this.state.likeado == false) {
        var agregarLike = db.collection("posts").doc(`${id}`);
        // si likeado = false osea no esta likeado loq ue hace es agregar un like
        

        return agregarLike.update({
            likes : firebase.firestore.FieldValue.arrayUnion(`${auth.currentUser.email}`)
         // estamos haciendo referencia al posteo y actualizandolo, 
         //le actualizamos el array likes que estaba vasio 
         // SI O SI hayq ue poner todo ese codigo firebase.fire......
         //filedvalue= hace referencia a los likes
         // arrayunion= hace referencia a agregar cosas
        })
        .then(() => {
            this.setState({
            
                likeado: true
            })
        })
        .catch((error) => {
            console.error("Error updating document: ", error);
        }); 
                  
    }
    else{
        var quitarLike = db.collection("posts").doc(`${id}`);

        return quitarLike.update({
            likes : firebase.firestore.FieldValue.arrayRemove(`${auth.currentUser.email}`)
        })
        // el arrayRemove va a buscar el mail del usuario y le va a sacar el like 
        .then(() => {
            this.setState({

                likeado: false
            })
        })
        .catch((error) =>{
            console.error("Error updating document: ", error);
        }); 

    }
}
    render(){
        console.log(this.props.data.item.data)
        let {data} = this.props.data.item
  return (
    <View style={styles.container}>
      
      <Text>usuario: {data.user}</Text>
      <Text>titulo: {data.title}</Text>
      <Text>contenido: {data.description}</Text>
      <Text>likes:{data.likes.length}</Text>
      <TouchableOpacity onPress={()=>this.like(this.props.data.item.id)}>
          
          {this.state.likeado?<Text>deslikear</Text>:<Text>Likear</Text>}
                    
                </TouchableOpacity>

                {/* cuando le das al boton like ejecurtas la funcion "this.like" */}


      

      
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

export default Fotos
