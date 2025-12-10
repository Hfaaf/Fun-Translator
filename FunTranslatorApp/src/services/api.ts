import axios from 'axios';
import { TranslationResponse, TranslationType } from '../types';

const BASE_URL = 'https://api.funtranslations.com/translate';

// Lista de traduções disponíveis
export const translationTypes: TranslationType[] = [
  {
    id: 'yoda',
    name: 'Yoda',
    description: 'Traduz para o estilo do Mestre Yoda de Star Wars',
    endpoint: 'yoda',
  },
  {
    id: 'pirate',
    name: 'Pirata',
    description: 'Traduz para fala de pirata',
    endpoint: 'pirate',
  },
  {
    id: 'minion',
    name: 'Minion',
    description: 'Traduz para a língua dos Minions',
    endpoint: 'minion',
  },
  {
    id: 'shakespeare',
    name: 'Shakespeare',
    description: 'Traduz para inglês shakespeariano',
    endpoint: 'shakespeare',
  },
  {
    id: 'dothraki',
    name: 'Dothraki',
    description: 'Traduz para Dothraki de Game of Thrones',
    endpoint: 'dothraki',
  },
  {
    id: 'groot',
    name: 'Groot',
    description: 'Traduz para a língua do Groot',
    endpoint: 'groot',
  },
];

export const translateText = async (
  text: string,
  translationType: string
): Promise<TranslationResponse> => {
  try {
    const response = await axios.post<TranslationResponse>(
      `${BASE_URL}/${translationType}.json`,
      `text=${encodeURIComponent(text)}`,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );
    return response.data;
  } catch (error: any) {
    if (error.response?.status === 429) {
      throw new Error('Limite de requisições atingido. Tente novamente em alguns minutos.');
    }
    throw new Error('Erro ao traduzir. Verifique sua conexão e tente novamente.');
  }
};
