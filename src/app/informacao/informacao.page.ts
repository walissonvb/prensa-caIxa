import { Component, OnInit, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  Firestore,
  collection,
  addDoc,
  collectionData,
  updateDoc,
  deleteDoc,
  doc
} from '@angular/fire/firestore';

import { IonInput, IonThumbnail, IonLabel, IonItem, IonList, IonCardContent, IonCardSubtitle, IonCardHeader, IonCardTitle, IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonFooter, IonButton, ModalController } from '@ionic/angular/standalone';
import { AtivosPage } from '../ativos/ativos.page';

export interface Molde {
  id?: string;
  Atuador: string;
  MancalGLA: string;
  MancalGLC: string;
  MancalDBLA: string;
  MancalDBLC: string;
  MancalCLA1: string;
  MancalCLA2: string;
  MancalCLC1: string;
  MancalCLC2: string; // ✔ corrigido nome
  Estrutura: string;
  Freio: string;
  Valvulas: string;
  local: string;
  codigo: string;
  userId?: string;
}

@Component({
  selector: 'app-informacao',
  templateUrl: './informacao.page.html',
  styleUrls: ['./informacao.page.scss'],
  standalone: true,
  imports: [
    IonThumbnail,
    IonLabel,
    IonItem,
    IonList,
    IonCardContent,
    IonCardSubtitle,
    IonCardHeader,
    IonCardTitle,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonCard,
    CommonModule,
    FormsModule,
    IonFooter,
    IonButton
]
})
export class InformacaoPage implements OnInit {
  private firestore = inject(Firestore);
  moldeId!: number;
  prensa: Molde[] = [];
  prensaFiltrada: Molde[] = [];
  termoPesquisa: string = '';
  mostrarCadastro = false;
  dados: Partial<Molde> = {};

  constructor(private modalCtrl: ModalController
) {
    console.log('Firestore OK');
  }

  ngOnInit() {
    const ref = collection(this.firestore, 'prensa');

    collectionData(ref, { idField: 'id' }).subscribe((data) => {
      this.prensa = data as Molde[];
      this.prensaFiltrada = [...this.prensa];
    });
  }

  // 🔍 filtro simples
  filtrar() {
    const termo = this.termoPesquisa.toLowerCase();

    this.prensaFiltrada = this.prensa.filter(p =>
      p.codigo?.toLowerCase().includes(termo) ||
      p.local?.toLowerCase().includes(termo)
    );
  }

  // ➕ adicionar
  async adicionar() {
    const ref = collection(this.firestore, 'prensa');
    await addDoc(ref, this.dados);

    this.dados = {};
    this.mostrarCadastro = false;
  }

  // ✏️ atualizar
  async atualizar(item: Molde) {
    if (!item.id) return;

    const refDoc = doc(this.firestore, `prensa/${item.id}`);
    await updateDoc(refDoc, { ...item });
  }

  // ❌ deletar
  async deletar(id: string) {
    const refDoc = doc(this.firestore, `prensa/${id}`);
    await deleteDoc(refDoc);
  }
async backPage(){
  const model = await this.modalCtrl.create({ component: AtivosPage });
  await model.present()
}
}
