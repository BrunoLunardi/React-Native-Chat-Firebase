import React from 'react';
import {SafeAreaView , Image, Text, FlatList,TouchableOpacity} from 'react-native';
import User from '../User';
import firebase from 'firebase';

//tela inicial apos login
//Componente de classe
export default class HomeScreen extends React.Component{

    //Titulo da tela HomeScreen
    static navigationOptions = ({navigation}) => {
        return{
            title: 'Chats',
            headerRight: (
                <TouchableOpacity onPress={()=>navigation.navigate('Profile')}>
                    <Image source={require('../images/user.png')} style={{width:32, height:32, marginRight:7}} />
                </TouchableOpacity>
            )
        }
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