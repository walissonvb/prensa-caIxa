import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

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

  constructor() { }

  ngOnInit() {
  }

}
