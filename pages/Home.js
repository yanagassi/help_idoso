import React from 'react';
import {
  Text,
  ListView,
  StyleSheet,
  View,Alert,
} from 'react-native';

import Colors from '../constants/Colors';
import Loading from '../components/Loading';
import Button from '../components/Button';
import Server from '../constants/Server';
import axios from 'axios';


const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

export default class Home extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props){
    super(props);
    this.store = this.props.screenProps.s;

    this.state = {
      isLoading: true,
    };

  }
  
  sender(){
    let pessoas = this.store._store.pessoas;
    this.setState({loading:true})
    
    if(pessoas !== undefined){
      pessoas.forEach(element => {
        
        if(element.whats !== undefined){
          axios.post(Server.api_whatsapp,{
            phone: '55' + element.whats,  
            body: '[BOT]: Olá '+ element.nome+ ' estou prescisando de ajuda, por favor entre em contato !!!',  
          })
          .then(res=>{
            console.log(JSON.stringify(res))
          })
          .catch(e=>{
            this.setState({loading:false})
          })
          
          //SMS
          // axios.get(Server.api_sms,{
          //   destiny: '55' + element.whats,  
          //   texto: '[BOT]: Olá '+ element.nome+ ' estou prescisando de ajuda, por favor entre em contato !!!',  
          // })
          // .then(res=>{
          //   console.log(JSON.stringify(res))
          // })
          // .catch(e=>{
          //   this.setState({loading:false})
          // })
          
          //Twiiter
          let twiiter_txt = '[BOT]: Olá '+ element.nome+ ' estou prescisando de ajuda, por favor entre em contato !!!';
          axios.get(Server.api_twitter+`?destiny=${element.twitter.replace('@','')}&texto=${twiiter_txt}`,{
          })
          .then(res=>{
            
          })
          .catch(e=>{
            this.setState({loading:false})
          })
        }
      })
  
  
      setTimeout(() => {
        Alert.alert('Sucesso', 'Pedido de ajuda enviado com exito !!!');
        this.setState({loading:false})
      }, 3000);
    }
  }
  componentDidMount(){
  
  }

  render() {
    if(this.state.isLoading)
      return (
        <View style={styles.container}>
        <Text style={{color:'black',fontWeight:'bold',fontSize:17, alignSelf:'center', marginTop:30}}>Pedido de Ajuda</Text>
          <Text style={{alignSelf:'center', textAlign:'center',fontSize:20, marginBottom:25, fontWeight:'500', marginTop:'40%'}}>Pressione o botão se está com uma emergencia.</Text>
          <Button style={{height:70, width:'90%'}} onPress={()=>{this.sender()}} loading={this.state.loading} color={Colors.buttonlogin}>
            <Text style={{color:Colors.text, fontWeight:'bold'}}>Enviar Sinal</Text>
          </Button>
        </View>
      );

    else
      return(<Loading/>)
  }

}

const styles = StyleSheet.create({
  container:{
    marginLeft:'2.5%',
    width:'100%',
    height:'100%',
  }, 
});
