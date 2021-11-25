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
        if (this.props.data.item.data.likes.includes(auth.currentUser.email)) {
            this.setState({
                likeado:true
            })
            
        } 
         
     }

like(id){ 
    if (this.state.likeado == false) {
        var agregarLike = db.collection("posts").doc(id);
        
        

        return agregarLike.update({
            likes : firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
         
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
        var quitarLike = db.collection("posts").doc(id);

        return quitarLike.update({
            likes : firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
        })
        
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

borrarPosteo(){

    db.collection('posts').doc(this.props.data.item.id).delete()
    .then(()=>{
      console.log(this.props.data.item.id)
    })
  }


    render(){
        console.log(this.props.data.item.data)
        let {data} = this.props.data.item
  return (
    <View style={styles.contenedor}>
      
      <Text style = {{paddingBottom:10,fontSize:20,fontWeight:'bold'}}>{data.user}</Text>
      <Image source={{uri:data.image}} style={{height:200, width:200}}/>
      <Text style = {styles.dataposteo}>Titulo: {data.title}</Text>
      <Text>Contenido: {data.description}</Text>
      <Text>likes:{data.likes.length}</Text>
      <Text>Comentarios:{data.comments.length}</Text>

      <TouchableOpacity style = {styles.likeador} onPress={()=>this.like(this.props.data.item.id)}>
          
          {this.state.likeado?<Text style={{color:'white',fontWeight:'bold',textAlign:'center'}}>Dislike</Text>
          :
          <Text style={{color:'white',fontWeight:'bold',textAlign:'center'}}>Like</Text>}
                    
                </TouchableOpacity>

                

                
            <TouchableOpacity style={styles.touchable} onPress={()=> this.modal()}> 
                <Text style={styles.texto}>{this.state.textomodal}</Text>
            </TouchableOpacity>

            {this.props.borrarPosteo?

            <TouchableOpacity style={styles.likeador} onPress={()=> this.borrarPosteo()}> 
            <Text style={{color:'white',fontWeight:'bold',textAlign:'center'}}> Delete Post</Text>
             </TouchableOpacity>

             : null
            
           }
            

            { this.state.modal?
                <Modal style = {styles.modalgede}visible={this.state.modal}
                animationType="fade"
                transparent={false}>
                    {data.comments.length== 0? <Text style = {styles.dataposteo}>"no hay comentarios, haz uno!"</Text>:
                        <FlatList  data={data.comments}
                        keyExtractor= {(data)=> data.fechaDeCreacion.toString()}
                        renderItem={({item})=> <Text style = {styles.dataposteo}> {item.usuario} escribio: {item.texto} </Text>}  /> 
                        
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

            


      

      
    </View>
  );
    }
}

const styles = StyleSheet.create({
  contenedor: {
    display:'flex',
    alignItems:'center',
    borderColor: '#d8d8d8',
    borderRadius: 5,
    borderWidth: 2,
    margin: 10,
    padding: 15,
    shadowRadius: 10,
  },

  dataposteo: {
    padding: 3,
    fontSize: 13,
  },


  likeador: {
        paddingVertical: 5,
        width:'25%',
        backgroundColor:'rgb(58, 58, 211)',
        borderRadius:15,
        margin:10,
  },
  modalgede: {
    borderColor:'rgb(58, 58, 211)',
    alignSelf: 'center',
    alignItems: 'center',
    padding:10,
  },

  ingresoTexto: {
      color:'lightGray',
      borderRadius:15,

  }
});

export default Fotos
