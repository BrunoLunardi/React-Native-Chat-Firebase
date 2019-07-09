import React from 'react';
import {StyleSheet} from 'react-native';

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

  export default styles;