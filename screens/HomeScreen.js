import React from 'react';
import {SafeAreaView ,View, Text, AsyncStorage, FlatList,TouchableOpacity} from 'react-native';
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

            if(person.phone===User.phone){//abre if
                User.name = person.name
            }else{//abre else
                this.setState((prevState)=>{
                    return {
                        users: [...prevState.users, person]
                    }
                })

            }//fecha else
        })
    }

    //logout
    _logOut = async () => {
        await AsyncStorage.clear();
        this.props.navigation.navigate('Auth');
    }

    renderRow = ({item}) => {
        return (
            //this.props.navigation.navigate('Chat', item) -> chama a rota Chat que está em App.js, 
            //que redireciona para ChatScreen
            <TouchableOpacity 
            onPress={() => this.props.navigation.navigate('Chat', item)}
            style={{padding:10,borderBottomColor:'#ccc', borderBottomWidth:1}}>
                <Text style={{fontSize:20}}>
                    {item.name}
                </Text>
            </TouchableOpacity>
        )
    }

    //cria a tela
    //FlatList -> Lista de contatos salvo no Firebase
    //SafeAreaView -> garante a renderização respeitando os limites da tela, no iOS 11 ou mais
    render(){
        return(
            <SafeAreaView>
                <FlatList
                    data = {this.state.users}
                    renderItem={this.renderRow}
                    keyExtractor={(item)=>item.phone}
                />
            </SafeAreaView>
        )
    }
}