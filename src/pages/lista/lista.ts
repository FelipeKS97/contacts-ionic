import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';


/**
 * Generated class for the ListaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lista',
  templateUrl: 'lista.html',
})
export class ListaPage {

  public contactName = '';
  public contactTel = '' ;
  public isEdit = false;

  public PATH = 'contacts/';
  contactList: Observable<any[]>

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public db: AngularFireDatabase
  ) {
    this.contactList = db.list(this.PATH)
      .snapshotChanges()
      .map(changes => {
        let contactsChange = changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
        return contactsChange 
      })
  }

  ionViewDidLoad() { 
  }

  removeContact(item: any) {
    return this.db.list(this.PATH).remove(item.key);
  }

  updateContact(item: any){
    this.db.list(this.PATH)
      .update(item.key, { name: this.contactName, tel: this.contactTel })
    this.handleEdit()
  }

  handleEdit() {
    this.isEdit = !this.isEdit
  }

  itemSelected(item: string) {
    alert(`Contato Selecionado: ${item}`);
  }

}
