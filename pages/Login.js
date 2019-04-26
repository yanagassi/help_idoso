import React from 'react';
import {
  Image,
  Platform,
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import axios from 'axios';

import Server from '../constants/Server';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import Input from '../components/Input';
import Button from '../components/Button';
import Utils from '../constants/Utils';


export default class LoginScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props){
      super(props);
      this.state = {
          email: 'admin@email.com',
          senha: '',
          loading: false,
          visible:false
      }
      this.store = this.props.screenProps.s;
  }

  login(){
    let email = this.state.email;
    let senha = this.state.senha;
    if(!this.state.visible)
      this.setState({
        visible:!this.state.visible
      })
    else
      if(email.length<=4) return;
      if(senha.length<=4) return;
      
      this.setState({loading: true});
      if(this.state.email ==  'admin@email.com' && this.state.senha == 'admin'){
        this.store.set('usuario', this.state);
        this.setState({loading: true});
      }else{
        Alert.alert('Erro', 'Email ou Senha errados... + ' + this.state.senha);
        this.setState({loading: false});
      }

      //  this.store.set('usuario', s.dados);
  }

  render() {
    return (
      <View style={styles.container}>
          <Text style={{color:'black',fontWeight:'bold',fontSize:17, alignSelf:'center', marginTop:30}}>ENTRAR</Text>
          <View style={[styles.container, styles.dri,{flexDirection: "column", marginTop:'40%'}]}>
            <Text style={{color:Colors.inputPlaceholder,fontSize:16}}>{!this.state.visible?"Digite seu endereço de e-mail.":"Digite seu endereço de e-mail e senha."}</Text>
            <Input placeholder={"E-mail"}  style={{marginTop:20}}type={"emailAddress"} loading={this.state.loading} value={this.state.email} onChangeText={(email)=>{this.setState({email:email})}} />
            {this.state.visible?
              <Input placeholder={"Senha"} type={"password"} loading={this.state.loading} value={this.state.senha} onChangeText={(senha)=>this.setState({senha:senha})} secureTextEntry={true} />:
              <View></View>
            }
            <Button onPress={()=>{this.login()}} loading={this.state.loading} color={Colors.buttonlogin}><Text style={{color:Colors.text, fontWeight:'bold'}}>{this.state.visible?"Entrar":"Continuar"}</Text></Button>
            {this.state.visible?
            <Text style={{color:Colors.buttonlogin,fontWeight:'bold',fontSize:17, marginTop:30,alignSelf:'center'}}>Esqueceu sua senha ?</Text>:
            <View></View>
            }
          </View>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    backgroundColor: Colors.primary,
    width:'95%',
    alignSelf:'center',
  },
  dri:{
    marginTop:30,
    alignItems: "center",
   // justifyContent:'center'
  }
});
