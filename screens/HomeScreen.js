import React from 'react';
import {View, Text, AsyncStorage, TouchableOpacity} from 'react-native';
import User from '../User';

//tela inicial apos login
export default class HomeScreen extends React.Component{

    //Titulo da tela HomeScreen
    static navigationOptions = {
        title: 'Chats'
    }

    //logout
    _logOut = async () => {
        await AsyncStorage.clear();
        this.props.navigation.navigate('Auth');
    }


    //cria a tela
    render(){
        return(
            <View>
                <Text>
                    {User.phone}
                </Text>
                <TouchableOpacity onPress={this._logOut}>
                    <Text>Logout</Text>
                </TouchableOpacity>
            </View>
        )
    }
}