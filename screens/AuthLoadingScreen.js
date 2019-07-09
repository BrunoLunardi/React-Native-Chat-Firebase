import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  View,
} from 'react-native';
//import para usar Firebase (depois de instalar ele no projeto, via npm)
import firebase from 'firebase';
///import para User criado na pasta raiz
import User from '../User';

export default class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  //método usado uma vez por componente que pode realizar alterações de estado
  componentWillMount(){
    //Var gerado pelo firebase
    var firebaseConfig = {
      apiKey: "AIzaSyBWuWRqgO4KZMtIFoGHbcgPpyaRwdSSeIM",
      authDomain: "fir-chat-5922c.firebaseapp.com",
      databaseURL: "https://fir-chat-5922c.firebaseio.com",
      projectId: "fir-chat-5922c",
      storageBucket: "",
      messagingSenderId: "73741703937",
      appId: "1:73741703937:web:c71a4c17a09c7f83"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    User.phone = await AsyncStorage.getItem('userPhone');
    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.props.navigation.navigate(User.phone ? 'App' : 'Auth');
  };

  // Render any loading content that you like here
  render() {
    return (
      <View>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}
