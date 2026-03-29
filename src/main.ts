import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';

const firebaseConfig = {
  apiKey: "AIzaSyD59nPl0NeX3lmQrDoOPiUnFXH5BSgJ53M",
  authDomain: "prensa-caixa.firebaseapp.com",
  projectId: "prensa-caixa",
  storageBucket: "prensa-caixa.firebasestorage.app",
  messagingSenderId: "928872223162",
  appId: "1:928872223162:web:3b9211be7425bbd0774d83",
  measurementId: "G-QNXV208VJH"

}

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
        provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore())
  ],
});
