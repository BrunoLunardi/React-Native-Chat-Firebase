import React from 'react';
import {
  Text,
  Alert,
  AsyncStorage,
  TouchableOpacity,
  TextInput,
  View, 
} from 'react-native';
//import AsyncStorage from '@react-native-community/async-storage';
import User from '../User';
import styles from '../constants/styles';

//construtor
export default class LoginScreen extends React.Component{

  static navigationOptions = {
    header:null
  }
  
  //mudar o tipo do teclado
  state = {
    phone: '',
    name: ''
  }

  handleChange = key => val => {
    this.setState({ [key]: val })
  }

  /*
  componentWillMount(){
    AsyncStorage.getItem('userPhone').then(val=>{
      if(val){
        this.setState({phone:val})
      }
    })

  }
*/
 
  //envia form
  submitForm = async () => {
    //valida telefone
    if(this.state.phone.length < 10){
      Alert.alert('Error', 'Wrong phone number')
    }else if(this.state.name.length < 3){
      Alert.alert('Error', 'Wrong name')
    }else{    
      try {  
        await AsyncStorage.setItem('userPhone', this.state.phone)
        User.phone = this.state.phone
        //this.props.navigation.navigate('App')
        this.props.navigation.navigate('App')
    } catch (error) {
      // Error saving data
      console.log(error);
    }
    }

    //abre alert quando clica no botão enter (TouchableOpacity)
    //alert(this.state.phone + '\n' + this.state.name)
  }

  /////Constroi a tela 
  render(){
    return(
      <View style={styles.container}>
        
        {/* Inputs views */}
        <TextInput
          placeholder="Phonenumber"
          keyboardType="number-pad"
          style={styles.input}
          value={this.state.phone}
          onChangeText={this.handleChange('phone')}
        />

        <TextInput
          placeholder="Name"
          style={styles.input}
          value={this.state.name}
          onChangeText={this.handleChange('name')}          
        />

        {/* botão entra chama função submitForm */}
        <TouchableOpacity onPress={this.submitForm}>
          <Text style={styles.btnText}>Enter</Text>
        </TouchableOpacity>

      </View>
    );
  }
}