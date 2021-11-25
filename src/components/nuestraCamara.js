import React,{Component} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import {Camera} from "expo-camera" 
import {storage} from "../firebase/config"


class nuestraCamara extends Component{
    
  constructor(props){
    super(props)
    this.state={
        permission: false,
        photo: null,
        
    }
    this.camera 
    
}


componentDidMount(){
    Camera.requestCameraPermissionsAsync()
    .then(()=>{
        this.setState({
            permission: true
        })
    })
    .catch((err)=>console.log(err))

    Camera.getAvailableCameraTypesAsync()
    .then((res)=> console.log(res))
}


takePicture(){ 
    
    this.camera.takePictureAsync()
    .then((photo)=>{
       
        this.setState({
            photo:photo.uri
        })
    })
    .catch((err)=>console.log(err))

}
 
savePhoto(){
    fetch(this.state.photo)
        .then((res)=> res.blob())
            .then((image)=>{
                const ref = storage.ref(`photos/${Date.now()}.jpg`)
                ref.put(image)
                    .then(()=>{
                        ref.getDownloadURL()
                            .then((url)=> {
                                
                                this.props.onImageUpload(url)
                                this.setState({
                                    photo:""
                                })
                            })
                    })
            })
        .catch((err)=>console.log(err))
}



render(){
    return(
        <>
        {this.state.photo ? 
        
        <>
        
            <Image 
                style={{width:"80%", flex:1,}}
                source={{uri: this.state.photo}}
            />
            <View style = {{width:"80%", display:"flex",flexDirection:'row', justifyContent:'space-around'}}>
                <TouchableOpacity style = {styles.buttonOK} onPress= {()=>this.savePhoto()}>
                    <Text style={{color:'white',fontWeight:'bold'}}>Aceptar</Text>
                    
                </TouchableOpacity>
                <TouchableOpacity style = {styles.buttonNO} onPress= {()=> this.setState({photo:null})} > 
                
                    <Text style={{color:'white',fontWeight:'bold'}}>Cancelar</Text>
                </TouchableOpacity>
            </View>
        </>: 
        
        <>
            <Camera 
                style={{flex:1,width:"80%"}}
                type= {Camera.Constants.Type.front}
                ref={(cam)=> (this.camera = cam)}
            />
            <TouchableOpacity style ={ styles.button} onPress={()=> this.takePicture()}> 
                <Text style={{color:'white',fontWeight:'bold'}} >Shoot</Text>
            </TouchableOpacity></>}
        </>
    )
}

}
    


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    height:"50%",
  },
  button: {
    paddingVertical: 5,
    width:'25%',
    backgroundColor:'rgb(58, 58, 211)',
    paddingLeft: 20,
    marginVertical:5,
    
},
buttonOK: {
    paddingVertical: 5,
    width:'40%',
    backgroundColor:'green',
    paddingLeft: 20,
    marginVertical:5,
    
},
buttonNO: {
    paddingVertical: 5,
    width:'40%',
    backgroundColor:'red',
    paddingLeft: 20,
    marginVertical:5,
    
}
});

export default nuestraCamara
