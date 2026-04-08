import { Injectable } from '@angular/core';
import { GoogleGenerativeAI, GenerativeModel } from '@google/generative-ai';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IaService {

  private genAI: GoogleGenerativeAI;
  private model: GenerativeModel;

  constructor() {
    // Inicializa o Google Gemini
    this.genAI = new GoogleGenerativeAI(environment.geminiApiKey);

    // Configuração do modelo (pode mudar para gemini-2.5-pro se precisar de mais qualidade)
    this.model = this.genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 1200,
        topP: 0.95,
        topK: 40,
      },
      systemInstruction: `Você é um especialista em manutenção industrial de prensas e moldes.
      Responda sempre em português brasileiro, de forma clara, prática e profissional.
      Use linguagem técnica quando necessário, mas explique os termos para técnicos de manutenção.
      Inclua passos numerados para procedimentos e sempre mencione precauções de segurança importantes.`
    });
  }

  /**
   * Consulta a IA para manutenção ou diagnóstico de componentes
   * @param contexto - Informações da máquina e componente
   * @param promptUser - Pergunta específica do usuário
   * @returns Resposta da IA em string
   */
  async perguntarManutencao(contexto: any, promptUser: string): Promise<string> {
    const fullPrompt = `
Contexto da Máquina:
- Nome: ${contexto.nome || 'Molde sem código'}
- Especificações: ${contexto.especificacoes || 'Não informado'}
- Local: ${contexto.local || 'Não informado'}
- Último reparo: ${contexto.ultimo_reparo || 'Não registrado'}

Pergunta do Técnico:
${promptUser}

Forneça um diagnóstico ou procedimento de manutenção adequado.
`;

    try {
const result = await this.model.generateContent(fullPrompt);
const texto = result.response.text(); // direto
      if (!texto || texto.trim() === '') {
        throw new Error('A IA retornou uma resposta vazia.');
      }

      return texto;
    } catch (error: any) {
      console.error('Erro ao consultar Gemini API:', error);

      // Tratamento de erros mais amigável
      if (error.message?.includes('API key')) {
        throw new Error('Chave da API do Gemini inválida ou não configurada.');
      }
      if (error.message?.includes('quota')) {
        throw new Error('Limite de uso da API atingido. Tente novamente mais tarde.');
      }

      throw new Error('Não foi possível obter resposta da IA. Verifique sua conexão.');
    }
  }

  /**
   * Método extra: Pergunta simples (caso queira usar em outros lugares)
   */
async perguntar(pergunta: string): Promise<string> {
  try {
    const result = await this.model.generateContent(pergunta);
    const texto = result.response.text(); // direto, sem await
    return texto || 'Sem resposta da IA.';
  } catch (error) {
    console.error(error);
    throw new Error('Erro ao consultar a IA.');
  }
}}
