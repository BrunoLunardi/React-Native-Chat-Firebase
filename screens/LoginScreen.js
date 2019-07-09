import React from 'react';
import {
  StyleSheet,
  Text,
  Alert,
  AsyncStorage,
  TouchableOpacity,
  TextInput,
  View, 
} from 'react-native';

import User from '../User';
/*
import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { catchClause } from '@babel/types';
*/
//construtor
export default class LoginScreen extends React.Component{

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
      //await AsyncStorage.setItem('userPhone', this.phone)
      User.phone = this.state.phone
      //this.props.navigation.navigate('App')
      console.log(this.props.navigation.navigate('App'))
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

//css da tela inicial
const styles = StyleSheet.create({

  //css da view
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },

  //css dos inputs
  input: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    width: '90%',
    marginBottom: 10,
    borderRadius: 5
  },

  //css do botão
  btnText: {
    color: 'darkblue',
    fontSize: 20
  }

});


