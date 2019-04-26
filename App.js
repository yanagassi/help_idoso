import React from 'react';
import { Platform, StatusBar, StyleSheet, Alert,View, SafeAreaView, KeyboardAvoidingView } from 'react-native';
import { AppLoading, Asset, Font, Icon } from 'expo';
import AppNavigator from './navigation/AppNavigator';
import Colors from './constants/Colors';
import Storage from './classes/Storage';
import FileCache from './classes/FileCache';
import LoginScreen from './pages/Login';



export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
    isLoggedIn: true 
  };

  store = null;
  filecache = null;

  render() {

    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadi2ngError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <View style={styles.container}>
          <SafeAreaView style={{flex:1}}>
            <KeyboardAvoidingView style={{flex:1}} behavior={Platform.select({ios: "padding", android: "padding"})} >
              {Platform.OS === 'ios' && <StatusBar  backgroundColor="blue" barStyle="light" />}
              {this.state.isLoggedIn==true?
              <AppNavigator screenProps={{s: this.store, fc: this.filecache, pocurso: this.playerOpenCurso.bind(this) , search: this.search.bind(this),checkuoutopen: this.checkoutOpen.bind(this), modalAlternado: this.initModal.bind(this)}} />
              :<LoginScreen screenProps= {{s: this.store, fc: this.filecache, }} />}
             </KeyboardAvoidingView> 
          </SafeAreaView>
        </View>
      );
    }
  }

  //this.props.screenProps.pocurso(id)


  search(dado){
    this.refs.search.init(dado)
  }
  initModal(dado, categoria){
    this.refs.modalAlternado.init(dado,categoria)
  }
  getPlayer(){
    if(this.player!==undefined)
      return this.player;
    return {};
  }

  dowloadLicao(licao = {}, CURSO_ID = null){
    this.refs.dw.downloadLicao(licao, CURSO_ID)
  }

  openCentral(a =false){
    if(typeof a == undefined) return;
    this.refs.dw.openCentral(a);
  }

  playerOpenCurso(id){
    this.refs.carrinho.init(id);
  }

  clean_carrinho(){
    this.refs.carrinho.clean_carrinho();
  }

  checkoutOpen(id){
    this.refs.checkouts.init(id);
  }



  playerOpenCast(castObject){
    this.refs.player.loadCast(castObject);
  }

  componentDidMount(){
    this.store.watch('usuario', (data)=>{
      if(data !== null && data !== undefined){
        this.setState({isLoggedIn: true});
      } else {
        this.setState({isLoggedIn: false});
      }
    });
  }

  _loadResourcesAsync = async () => {
    this.store = new Storage;
    this.filecache = new FileCache;
    return Promise.all([
      Asset.loadAsync([
        require('./assets/images/no-image.jpg'),
        require('./assets/images/motoboy.gif')
      ]), 
    ]);
  };

  _handleLoadingError = error => {
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
});
