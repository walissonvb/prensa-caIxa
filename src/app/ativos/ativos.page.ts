import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { InformacaoPage } from '../informacao/informacao.page';
import { ModalController } from '@ionic/angular/standalone';
@Component({
  selector: 'app-ativos',
  templateUrl: './ativos.page.html',
  styleUrls: ['./ativos.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class AtivosPage implements OnInit {
modulos = [ 0, 1, 2, 3, 4, 5, 6, 7, 8];
baseX = 250;
espaco = 90;

  constructor(
    private modalCtrl : ModalController,
  ) { }

  ngOnInit() {
  }
async clicouMolde(index: number) {
  console.log('Molde clicado:', index + 1);
const modal = await this.modalCtrl.create({ component: InformacaoPage,
    componentProps: {
      moldeId: index + 1}});
await modal.present();
  // Exemplo:
  // abrir detalhes
  // navegar
  // buscar no firebase
}

}
