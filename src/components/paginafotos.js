import React,{Component} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Modal, FlatList, Image} from 'react-native';
import { db, auth } from '../firebase/config';
import firebase from 'firebase';
import "firebase/firestore"


class Fotos extends Component{
    constructor(props){
      super(props)
      this.state={
      likeado: false,
      comentario: "",
      modal: false,
      textomodal: "Ver comentarios",
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

comentario(){
    let comentario= {texto: this.state.comentario,
                            usuario: auth.currentUser.email,
                            fechaDeCreacion: Date.now()}
    let agregarComentario = db.collection("posts").doc(`${this.props.data.item.id}`);

    return agregarComentario.update({
        comments : firebase.firestore.FieldValue.arrayUnion(comentario)
    })
    .then(() => {
        console.log("comentario exitoso");
    })
    .catch((error) => {
        console.error("Error updating document: ", error);
    }); 
    
}

modal(){
    if (this.state.modal) {
        this.setState({
            modal: false,
            textomodal: "Ver Comentarios"
        })   
    }
    else{
        this.setState({
            modal: true,
            textomodal: "Ocultar Comentarios"
        })  
    }
}




    render(){
        console.log(this.props.data.item.data)
        let {data} = this.props.data.item
  return (
    <View style={styles.contenedor}>
      
      <Text>usuario: {data.user}</Text>
      <Image source={{uri:data.image}} style={{height:200, width:200}}/>
      <Text>titulo: {data.title}</Text>
      <Text>contenido: {data.description}</Text>
      <Text>likes:{data.likes.length}</Text>
      <TouchableOpacity style = {styles.likeador} onPress={()=>this.like(this.props.data.item.id)}>
          
          {this.state.likeado?<Text style={{color:'white',fontWeight:'bold',textAlign:'center'}}>Dislike</Text>:<Text style={{color:'white',fontWeight:'bold',textAlign:'center'}}>Like</Text>}
                    
                </TouchableOpacity>

                

                
            <TouchableOpacity style={styles.touchable} onPress={()=> this.modal()}> 
                <Text style={styles.texto}>{this.state.textomodal}</Text>
            </TouchableOpacity>

            { this.state.modal?
                <Modal visible={this.state.modal}
                animationType="fade"
                transparent={false}>
                    {data.comments.length== 0? <Text>"no existen comentarios, empeza a escribirlos"</Text>:
                        <FlatList  data={data.comments}
                        keyExtractor= {(data)=> data.fechaDeCreacion.toString()}
                        renderItem={({item})=> <Text> {item.usuario} escribio: {item.texto} </Text>}  /> 
                        
                    }
                    <TextInput style={styles.ingresoTexto}
                    keyboardType="default"
                    placeholder="Escriba un comentario"
                    onChangeText={text => this.setState({comentario:text})}
                    value={this.state.comentario}


                />
                <TouchableOpacity style={styles.touchable} onPress={()=> this.comentario()}> 
                <Text style={styles.texto}>Comentar</Text>
             </TouchableOpacity>
                </Modal>:
                <Text></Text>
            }

                {/* cuando le das al boton like ejecurtas la funcion "this.like" */}


      

      
    </View>
  );
    }
}

const styles = StyleSheet.create({
  contenedor: {
    display:'flex',
    alignItems:'center',
    borderColor: 'black',
    borderWidth: 8,
    margin: 10,
    padding: 8,
    backgroundColor: 'lightgrey',
    
  },

  likeador: {
    
        paddingVertical: 5,
        width:'25%',
        backgroundColor:'rgb(58, 58, 211)',
        
    
 
  }
});

export default Fotos
