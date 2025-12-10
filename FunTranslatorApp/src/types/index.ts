// Tipos para a Fun Translations API
export interface TranslationResponse {
  success: {
    total: number;
  };
  contents: {
    translated: string;
    text: string;
    translation: string;
  };
}

export interface TranslationType {
  id: string;
  name: string;
  description: string;
  endpoint: string;
}

// Tipos para navegação
export type RootStackParamList = {
  Home: undefined;
  Translation: { translationType: TranslationType };
  History: undefined;
};

// Tipo para histórico de traduções
export interface TranslationHistory {
  id: string;
  original: string;
  translated: string;
  type: string;
  timestamp: Date;
}
