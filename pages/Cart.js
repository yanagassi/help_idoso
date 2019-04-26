import React from 'react';
import {
  Text,
  ListView,
  ScrollView,
  Alert,
  View,
  Dimensions
} from 'react-native';
import Button from '../components/Button';
import Input from '../components/Input';
import Colors from '../constants/Colors';


const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

export default class Cart extends React.Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props){
        super(props);
        this.store = this.props.screenProps.s;
        this.state = {
          nome:'',
          twitter:'',
          whats:''
        };

    }

  componentDidMount(){
    //console.log(this.store._store.pessoas)
  }

  render_pessoas(){
    return this.store._store.pessoas.map((v,f)=>{
      return(
        <View style={{borderWidth:1,borderBottomColor:'#cccccc',padding:'2%',margin:'1.5%'}}>
          <Text>Nome: {v.nome}</Text>
          <Text>WhatsApp: {v.whats}</Text>
          <Text>Twitter: {v.twitter}</Text>
        </View>
      )
    })
  }

  registro = ()=>{
    if(this.state.whats === '' && this.state.twitter === ''){
      Alert.alert('Erro', 'Preencha os campos corretamente !!!');
      return;
    }
    let pessoas = (this.store._store.pessoas==undefined)?[]:this.store._store.pessoas;
    pessoas.push(this.state)
    this.store.set('pessoas', pessoas);
   
    //console.log(this.store._store.pessoas)
    this.setState({
      nome:'',
      twitter:'',
      whats:''
    })
  }

  render(){
    return(
      <ScrollView>
        <Text style={{color:'black',fontWeight:'bold',fontSize:17, alignSelf:'center', marginTop:30, marginBottom:'10%'}}>Cadastro de Pessoas</Text>
        <View style={{width:'90%', alignSelf:'center'}}>
          <Input placeholder={"Nome"} type={"text"} loading={this.state.loading} value={this.state.nome} onChangeText={(nome)=>this.setState({nome})} />
          <Input placeholder={"WhatsApp"} type={"text"} loading={this.state.loading} value={this.state.whats} onChangeText={(whats)=>this.setState({whats})} />
          <Input placeholder={"Twitter"} type={"text"} loading={this.state.loading} value={this.state.twitter} onChangeText={(twitter)=>this.setState({twitter})} />
          <Button style={{ width:'95%', marginTop:50}} onPress={()=>{this.registro()}} loading={this.state.loading} color={Colors.buttonlogin}>
            <Text style={{color:Colors.text, fontWeight:'bold'}}>Registrar</Text>
          </Button>
          <Text style={{fontWeight:'bold',fontSize:14, marginTop:30,alignSelf:'center'}}>Lista de pessoas:</Text>
         
          { (this.store._store.pessoas==undefined)?null:this.render_pessoas()}
        
        </View>
      </ScrollView>
    )
  }
}