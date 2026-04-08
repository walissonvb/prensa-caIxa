export interface Environment {
  production: boolean;
  geminiApiKey: string;
  firebaseConfig: {
    apiKey: string;
    authDomain: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
    appId: string;
    measurementId?: string;
  };
}

export const environment: Environment = {
  production: false,
  geminiApiKey: "AIzaSyCCM2tgO0Yup6ZVXJTkkUjQqfON-BgXC0M",
  firebaseConfig: {
    apiKey: "AIzaSyD59nPl0NeX3lmQrDoOPiUnFXH5BSgJ53M",
    authDomain: "prensa-caixa.firebaseapp.com",
    projectId: "prensa-caixa",
    storageBucket: "prensa-caixa.firebasestorage.app",
    messagingSenderId: "928872223162",
    appId: "1:928872223162:web:3b9211be7425bbd0774d83",
    measurementId: "G-QNXV208VJH"
  }
};
