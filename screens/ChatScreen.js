import React from 'react';
import {SafeAreaView, Text, View, Dimensions, TextInput, TouchableOpacity} from 'react-native';
import styles from '../constants/styles';
import User from '../User';
import firebase from 'firebase'
import { FlatList } from 'react-native-gesture-handler';

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
            textMessage: '',
            messageList: []
        }
    }

    //método usado uma vez por componente que pode realizar alterações de estado
    componentWillMount(){
        firebase.database().ref('messages').child(User.phone).child(this.state.person.phone)
            .on('child_added', (value)=>{
                this.setState((prevState)=>{
                    return {
                        messageList: [...prevState.messageList, value.val()]
                    }
                })
            })
    }

    //Manipula alterações (chave -> valor)
    handlerChange = key => val => {
        this.setState({[key]:val})
    }

    //converte o horário de envio e recebimento de mensagens
    convertTime = (time) => {
        let d = new Date(time);
        let c = new Date();
        //colocar 0 se for menor que 10 a hora
        let result = (d.getHours() < 10 ? '0' : '') + d.getHours() + ':';
        result += (d.getMinutes() < 10 ? '0' : '') + d.getMinutes();

        if(c.getDay() !== d.getDay()){
            result = d.getDay() + ' ' + d.getMonth() + ' ' + result;
        }

        return result;
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

    renderRow = ({item}) => {
        return(
            <View style={{
                flexDirection:'row',
                width:'60%',
                alignSelf: item.from===User.phone ? 'flex-end' : 'flex-start',
                backgroundColor: item.from===User.phone ? '#00897b' : '#7cb342',
                borderRadius: 5,
                marginBottom: 10
            }}>
                <Text style={{color:'#fff', padding:7, fontSize:16}}>
                    {item.message}
                </Text>
                <Text style={{color:'#eee', padding: 3, fontSize:12}}>
                    {this.converTime(item.time)}
                </Text>
            </View>
        )
    }

    //Renderiza tela do chat
    render(){
        let {height, width} = Dimensions.get('window');
        return(
            <SafeAreaView>
                {/* Lista das mensagens do chat */}
                <FlatList
                    style={{padding:10, height: height * 0.8}}
                    data={this.state.messageList}
                    renderItem={this.renderRow}
                    keyExtractor={(item,index)=>index.toString()}
                />
                <View style={{flexDirection:'row', alignItems:'center', marginHorizontal:5}}>
                    <TextInput
                        style={styles.input}
                        value={this.state.textMessage}
                        placeholder="Type message..."
                        onChangeText={this.handlerChange('textMessage')}
                    />
                    <TouchableOpacity onPress={this.sendMessage} style={{paddingBottom:10, marginLeft:5}} > 
                        <Text style={styles.btnText}>Send</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        )
    }
}