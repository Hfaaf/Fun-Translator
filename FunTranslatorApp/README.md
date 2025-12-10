# 🌐 Fun Translator App

## Desafio Individual II - API React Native + Paper + Navegação

Aplicativo React Native desenvolvido com Expo que consome a **Fun Translations API** para traduzir textos em diferentes estilos divertidos.

---

## 📋 Descrição

Este projeto foi desenvolvido como parte do **Desafio Individual II**, com o objetivo de criar um aplicativo React Native que:

- ✅ Consuma dados de uma API pública
- ✅ Utilize React Native Paper para componentes de UI
- ✅ Implemente navegação entre componentes

---

## 🚀 Funcionalidades

- **6 tipos de tradução disponíveis:**
  - 🧙‍♂️ **Yoda** - Estilo do Mestre Yoda de Star Wars
  - 🏴‍☠️ **Pirata** - Fala de pirata
  - 🍌 **Minion** - Língua dos Minions
  - 🎭 **Shakespeare** - Inglês shakespeariano
  - 🐎 **Dothraki** - Língua de Game of Thrones
  - 🌳 **Groot** - Língua do Groot

- **Histórico de traduções** salvo localmente
- **Interface Material Design** com React Native Paper
- **Navegação fluida** entre telas

---

## 🛠️ Tecnologias Utilizadas

| Tecnologia | Descrição |
|------------|-----------|
| **React Native** | Framework para desenvolvimento mobile |
| **Expo** | Plataforma para apps React Native |
| **TypeScript** | Superset tipado do JavaScript |
| **React Native Paper** | Biblioteca de componentes Material Design |
| **React Navigation** | Navegação entre telas |
| **Axios** | Cliente HTTP para consumo da API |
| **AsyncStorage** | Armazenamento local de dados |

---

## 📁 Estrutura do Projeto

```
FunTranslatorApp/
├── App.tsx                       # Componente principal
├── src/
│   ├── components/
│   │   ├── TranslationCard.tsx   # Card de tipo de tradução
│   │   ├── HistoryItem.tsx       # Item do histórico
│   │   └── index.ts
│   ├── navigation/
│   │   ├── AppNavigator.tsx      # Configuração de navegação
│   │   └── index.ts
│   ├── screens/
│   │   ├── HomeScreen.tsx        # Tela inicial
│   │   ├── TranslationScreen.tsx # Tela de tradução
│   │   ├── HistoryScreen.tsx     # Histórico de traduções
│   │   └── index.ts
│   ├── services/
│   │   └── api.ts                # Serviço da API
│   └── types/
│       └── index.ts              # Tipos TypeScript
└── package.json
```

---

## 🔧 Como Executar

### Pré-requisitos

- Node.js instalado
- npm ou yarn
- Expo Go no celular (para teste mobile)

### Instalação

```bash
# Clone ou acesse a pasta do projeto
cd FunTranslatorApp

# Instale as dependências
npm install

# Inicie o servidor Expo
npx expo start
```

### Executando

- **Android/iOS**: Escaneie o QR code com o app Expo Go

---

## 🌐 API Utilizada

**Fun Translations API** - https://funtranslations.com/api/

A API gratuita possui limite de **5 requisições por hora**.

---

## 📱 Screenshots

| Tela Inicial | Tradução | Histórico |
|--------------|----------|-----------|
| Lista de traduções disponíveis | Input e resultado da tradução | Traduções salvas |

---

## 👨‍💻 Autor

Desenvolvido para o **Desafio Individual II**

---

## 📄 Licença

Este projeto foi desenvolvido para fins educacionais.
