import { Component, APP_BOOTSTRAP_LISTENER } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { HomePage } from '../home/home';
import { AngularFireDatabase } from 'angularfire2/database';
import { GooglePlus } from '@ionic-native/google-plus';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [GooglePlus]
})
export class LoginPage {

  public email: string;
  public senha: string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public firebaseAuth: AngularFireAuth,
    public db: AngularFireDatabase,
    private googlePlus: GooglePlus
  ) {
  }

  ionViewDidLoad() {
  }

  cadastrar(){
    this.firebaseAuth.auth.createUserWithEmailAndPassword(this.email, this.senha)
    .then(usuario => {

      let usuarioCominfoAdicionais = {
        nascimento: '20/11/2019',
        endereco: 'Rua A, n° 20, Ponta Verde, Maceió, AL.'
      };

      this.db.object('usuarios/' + usuario.uid).set(usuarioCominfoAdicionais)
      .then(sucesso => {
        alert('Sucesso!');
      })
      .catch(err =>{
        alert('Falha!');
      });
      
      
      //alert('Tudo certo!');
    })
    .catch(erro => {
      alert('Erro: ' + erro);
    });
  }

  login(){
    this.firebaseAuth.auth.signInWithEmailAndPassword(this.email, this.senha)
    .then(sucesso => {
      this.navCtrl.setRoot(HomePage);
    })
    .catch(erro => {
      alert('Erro: ' + erro);
    });
  }

  loginGoogle() {
    // console.log("ta funfando")
    this.googlePlus.login({})
    .then(res => console.log(res))
    .catch(err => console.error(err));
  }

}
