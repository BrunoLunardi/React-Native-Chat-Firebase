import React from 'react';
import {View, Text, AsyncStorage, FlatList,TouchableOpacity} from 'react-native';
import User from '../User';
import firebase from 'firebase';
import styles from '../constants/styles';

//tela inicial apos login
//Componente de classe
export default class HomeScreen extends React.Component{

    //Titulo da tela HomeScreen
    static navigationOptions = {
        title: 'Chats'
    }

    //dados usados pelo componente
    state = {
        users: []
    }

    //método usado uma vez por componente que pode realizar alterações de estado
    componentWillMount(){
        let dbRef = firebase.database().ref('users');
        dbRef.on('child_added', (val)=>{
            let person = val.val();
            person.phone = val.key;
            this.setState((prevState)=>{
                return {
                    users: [...prevState.users, person]
                }
            })
        })
    }

    //logout
    _logOut = async () => {
        await AsyncStorage.clear();
        this.props.navigation.navigate('Auth');
    }

    renderRow = ({item}) => {
        return (
            <TouchableOpacity>
                <Text>
                    {item.name}
                </Text>
            </TouchableOpacity>
        )
    }

    //cria a tela
    //FlatList -> Lista de contatos salvo no Firebase
    render(){
        return(
            <View style={styles.container}>
                <FlatList
                    data = {this.state.users}
                    renderItem={this.renderRow}
                    keyExtractor={(item)=>item.phone}
                />
            </View>
        )
    }
}