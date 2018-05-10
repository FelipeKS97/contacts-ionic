import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ListaPage } from '../lista/lista';
import { AngularFireAuth } from 'angularfire2/auth';
import { LoginPage } from '../login/login';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public nome = 'Felipe';
  public nascimento = '';
  private PATH = 'contacts/';

  constructor(
    public navCtrl: NavController,
    public firebaseAuth: AngularFireAuth,
    public db: AngularFireDatabase
  ) {

  }

  // Primeira função a ser executada ao abrir uma tela.
  ionViewDidEnter(){
    let uid = this.firebaseAuth.auth.currentUser.uid;
    
    /*this.db.object('usuarios/' + uid)
    .snapshotChanges()
    .subscribe(usuarioComInfoAdicionais => {
      this.nascimento = usuarioComInfoAdicionais.payload.child('nascimento').val();
    });*/

    this.db.object('usuarios/' + uid + '/nascimento')
    .snapshotChanges()
    .subscribe(nascimento => {
      this.nascimento = nascimento.payload.val();
    });

    

  }

  atualizarNascimento(){
    let uid = this.firebaseAuth.auth.currentUser.uid;
    this.db.object('usuarios/' + uid).update({nascimento : '02/12/1985'});
    
  }

  updateContact(contact: any){
    
    this.db.object(this.PATH + contact.key)
      .update({ name: contact.name, tel: contact.tel })
    
  }
  save(contact: any) {
    return new Promise((resolve, reject) => {
      if (contact.key) {
        this.db.list(this.PATH)
          .update(contact.key, { name: contact.name, tel: contact.tel })
          .then(() => resolve())
          .catch((e) => reject(e));
      } else {
        this.db.list(this.PATH)
          .push({ name: contact.name, tel: contact.tel })
          .then(() => resolve());
      }
    })
  }
  getAll() {
    return this.db.list(this.PATH, ref => ref.orderByChild('name'))
      .snapshotChanges()
      .map(changes => {
        return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
      })
  }

  get(key: string) {
    return this.db.object(this.PATH + key).snapshotChanges()
      .map(c => {
        return { key: c.key, ...c.payload.val() };
      });
  }

  remove(key: string) {
    return this.db.list(this.PATH).remove(key);
  }

  logoutApagarUsuario(){
    let uid = this.firebaseAuth.auth.currentUser.uid;
    this.firebaseAuth.auth.signOut();
    this.db.object('usuarios/' + uid).remove();
    this.navCtrl.setRoot(LoginPage);
  }

  abrirLista(){
    this.navCtrl.push(ListaPage);
  }

  logout(){
    this.firebaseAuth.auth.signOut();
    this.navCtrl.setRoot(LoginPage);
  }

}
