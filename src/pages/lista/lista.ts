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
  
  items = [
    'Pokémon Yellow',
    'Super Metroid',
    'Mega Man X',
    'The Legend of Zelda',
    'Pac-Man',
    'Super Mario World',
    'Street Fighter II',
    'Half Life',
    'Final Fantasy VII',
    'Star Fox',
    'Tetris',
    'Donkey Kong III',
    'GoldenEye 007',
    'Doom',
    'Fallout',
    'GTA',
    'Halo'
  ];

  public PATH = 'contacts/';
  contactList: Observable<any[]>

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public db: AngularFireDatabase
  ) {
    this.contactList = db.list(this.PATH, ref => ref.orderByChild('name')).valueChanges();
  }

  ionViewDidLoad() { 
  }

  itemSelected(item: string) {
    alert(`Contato Selecionado: ${item}`);
  }

}
