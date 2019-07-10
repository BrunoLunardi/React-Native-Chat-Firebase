import React from 'react';
import {SafeAreaView, Text, View, TextInput, TouchableOpacity} from 'react-native';
import styles from '../constants/styles';
import User from '../User';
import firebase from 'firebase'

//Tela do chat
export default class ChatScreen extends React.Component{

    static navigationOptions = ({navigation}) => {
        return{
            //titulo da tela do Chat
            title: navigation.getParam('name', null)
        }
    }

    //construtor
    constructor(props){
        super(props);
        
        //pega o telefone e nome da pessoa que foi selecionada na HomeScreen
        this.state = {
            person: {
                name: props.navigation.getParam('name'),
                phone: props.navigation.getParam('phone'),
            },
            //mensagens do Chat inicia com nada escrito     
            textMessage: ''
        }
    }

    //Manipula alterações (chave -> valor)
    handlerChange = key => val => {
        this.setState({[key]:val})
    }

    //envio de mensagens
    sendMessage = async () => {
        //verifica se foi digitado alguma mensagem
        if(this.state.textMessage.length > 0){
            //coleção do firebase: messages -> telefone -> dados da pessoa
            let msgId = firebase.database().ref('messages').child(User.phone).child(this.state.person.phone).push().key;
            let updates = {};
            //configura mensagem que será enviada ao Firebase
            let message = {
                message: this.state.textMessage,
                time: firebase.database.ServerValue.TIMESTAMP,
                from: User.phone
            }

            //atualiza mensagens no firebase
            updates['messages/' + User.phone + '/' + this.state.person.phone + '/' + msgId] = message;
            updates['messages/' + this.state.person.phone + '/' + User.phone + '/' + msgId] = message;
            firebase.database().ref().update(updates);

            this.setState({textMessage: ''});
        }
    }

    //Renderiza tela do chat
    render(){
        return(
            <SafeAreaView>
                <View style={{flexDirection:'row', alignItems:'center'}}>
                    <TextInput
                        style={styles.input}
                        value={this.state.textMessage}
                        placeholder="Type message..."
                        onChangeText={this.handlerChange('textMessage')}
                    />
                    <TouchableOpacity onPress={this.sendMessage}>
                        <Text style={styles.btnText}>Send</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        )
    }
}