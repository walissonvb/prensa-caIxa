import { Component, OnInit, inject, DestroyRef, EnvironmentInjector, runInInjectionContext } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IaService } from '../ia';
import {
  Firestore,
  collection,
  collectionData
} from '@angular/fire/firestore';
import {
  LoadingController,
  AlertController,
  ModalController,
  IonLabel, IonItem,
  IonCardContent, IonCardSubtitle, IonCardHeader,
  IonCardTitle, IonContent, IonHeader, IonTitle,
  IonToolbar, IonCard, IonButton,
  IonIcon, IonButtons
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { sparkles, construct, arrowBack, informationCircle } from 'ionicons/icons';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

export interface Molde {
  id?: string;
  Atuador: string;
  MancalGLA: string;
  Valvulas: string;
  local: string;
  codigo: string;
}

@Component({
  selector: 'app-informacao',
  templateUrl: './informacao.page.html',
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    IonLabel, IonItem,
    IonCardContent, IonCardSubtitle, IonCardHeader,
    IonCardTitle, IonContent, IonHeader, IonTitle,
    IonToolbar, IonCard, IonButton,
    IonIcon, IonButtons
  ]
})
export class InformacaoPage implements OnInit {

  private firestore = inject(Firestore);
  private aiService = inject(IaService);
  private loadingCtrl = inject(LoadingController);
  private alertCtrl = inject(AlertController);
  private modalCtrl = inject(ModalController);
  private destroyRef = inject(DestroyRef);
  private environmentInjector = inject(EnvironmentInjector);

  prensaFiltrada: Molde[] = [];
  perguntaLivre: string = ''; // propriedade adicionada

  constructor() {
    addIcons({ sparkles, construct, arrowBack, informationCircle });
  }

  ngOnInit() {

 this.aiService.perguntar('Teste rápido da IA')
    .then(res => {
      console.log('Resposta teste:', res);
      this.exibirResposta('Teste IA', res);
    })
    .catch(err => console.error('Erro teste:', err));


    runInInjectionContext(this.environmentInjector, () => {
      const ref = collection(this.firestore, 'prensa');

      collectionData(ref, { idField: 'id' })
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: (data) => {
            this.prensaFiltrada = data as Molde[];
          },
          error: (err) => {
            console.error('Erro ao carregar prensas do Firebase:', err);
          }
        });
    });
  }

  trackById(index: number, item: Molde): string {
    return item.id || item.codigo;
  }

  async consultarIA(item: Molde, componente: string, valor: string) {
    const loading = await this.loadingCtrl.create({
      message: `IA Analisando ${componente}...`,
      spinner: 'dots'
    });
    await loading.present();

    const contexto = {
      nome: `Molde ${item.codigo}`,
      especificacoes: `Componente: ${componente}. Status Atual: ${valor}. Local: ${item.local}`,
      ultimo_reparo: "Verificar log do sistema"
    };

    const promptUser = `Como realizar a manutenção ou diagnóstico do ${componente} que apresenta o estado: ${valor}?`;

    try {
      const resposta = await this.aiService.perguntarManutencao(contexto, promptUser);
      await loading.dismiss();
      this.exibirResposta(componente, resposta);
    } catch (e: any) {
      await loading.dismiss();
      console.error('Erro na IA:', e);

      const errorAlert = await this.alertCtrl.create({
        header: 'Erro na IA',
        message: e.message || 'Não foi possível consultar a inteligência artificial. Verifique sua chave da API.',
        buttons: ['OK']
      });
      await errorAlert.present();
    }
  }

  async perguntarLivre(item: Molde) {
    if (!this.perguntaLivre.trim()) return;

    const loading = await this.loadingCtrl.create({
      message: 'IA analisando pergunta livre...',
      spinner: 'dots'
    });
    await loading.present();

    try {
      const resposta = await this.aiService.perguntarManutencao(
        { nome: `Molde ${item.codigo}`, especificacoes: `Local: ${item.local}` },
        this.perguntaLivre
      );
      await loading.dismiss();
      this.exibirResposta('Pergunta Livre', resposta);
      this.perguntaLivre = ''; // limpa o campo após enviar
    } catch (e: any) {
      await loading.dismiss();
      console.error('Erro na IA:', e);
      const errorAlert = await this.alertCtrl.create({
        header: 'Erro na IA',
        message: e.message || 'Não foi possível consultar a IA.',
        buttons: ['OK']
      });
      await errorAlert.present();
    }
  }

  async exibirResposta(titulo: string, texto: string) {
    const alert = await this.alertCtrl.create({
      header: `Diagnóstico IA: ${titulo}`,
      message: texto,
      cssClass: 'ai-alert',
      buttons: ['Entendido']
    });
    await alert.present();
  }

  async backPage() {
    await this.modalCtrl.dismiss();
  }

}
