import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {
  Text,
  Appbar,
  TextInput,
  Button,
  Card,
  useTheme,
  Snackbar,
  ActivityIndicator,
} from 'react-native-paper';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { translateText } from '../services/api';
import { RootStackParamList, TranslationHistory } from '../types';

type TranslationScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Translation'
>;

type TranslationScreenRouteProp = RouteProp<RootStackParamList, 'Translation'>;

interface TranslationScreenProps {
  navigation: TranslationScreenNavigationProp;
  route: TranslationScreenRouteProp;
}

export const TranslationScreen: React.FC<TranslationScreenProps> = ({
  navigation,
  route,
}) => {
  const { translationType } = route.params;
  const theme = useTheme();

  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showSnackbar, setShowSnackbar] = useState(false);

  const getEmoji = (id: string): string => {
    const emojis: Record<string, string> = {
      yoda: '🧙‍♂️',
      pirate: '🏴‍☠️',
      minion: '🍌',
      shakespeare: '🎭',
      dothraki: '🐎',
      groot: '🌳',
    };
    return emojis[id] || '🔤';
  };

  const saveToHistory = async (original: string, translated: string) => {
    try {
      const historyJson = await AsyncStorage.getItem('translationHistory');
      const history: TranslationHistory[] = historyJson
        ? JSON.parse(historyJson)
        : [];

      const newEntry: TranslationHistory = {
        id: Date.now().toString(),
        original,
        translated,
        type: translationType.name,
        timestamp: new Date(),
      };

      history.unshift(newEntry);
      
      // Manter apenas as últimas 50 traduções
      const limitedHistory = history.slice(0, 50);
      
      await AsyncStorage.setItem(
        'translationHistory',
        JSON.stringify(limitedHistory)
      );
    } catch (err) {
      console.error('Erro ao salvar histórico:', err);
    }
  };

  const handleTranslate = async () => {
    if (!inputText.trim()) {
      setError('Digite um texto para traduzir');
      setShowSnackbar(true);
      return;
    }

    setLoading(true);
    setTranslatedText('');
    setError('');

    try {
      const response = await translateText(inputText, translationType.endpoint);
      setTranslatedText(response.contents.translated);
      await saveToHistory(inputText, response.contents.translated);
    } catch (err: any) {
      setError(err.message);
      setShowSnackbar(true);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setInputText('');
    setTranslatedText('');
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content
          title={`${getEmoji(translationType.id)} ${translationType.name}`}
        />
      </Appbar.Header>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <Card style={styles.card}>
            <Card.Content>
              <Text variant="titleMedium" style={styles.label}>
                Texto Original (Inglês)
              </Text>
              <TextInput
                mode="outlined"
                placeholder="Digite seu texto aqui..."
                value={inputText}
                onChangeText={setInputText}
                multiline
                numberOfLines={4}
                style={styles.input}
              />
            </Card.Content>
          </Card>

          <View style={styles.buttonContainer}>
            <Button
              mode="contained"
              onPress={handleTranslate}
              loading={loading}
              disabled={loading}
              icon="translate"
              style={styles.translateButton}
            >
              Traduzir
            </Button>
            <Button
              mode="outlined"
              onPress={handleClear}
              disabled={loading}
              icon="eraser"
              style={styles.clearButton}
            >
              Limpar
            </Button>
          </View>

          {loading && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={theme.colors.primary} />
              <Text style={styles.loadingText}>Traduzindo...</Text>
            </View>
          )}

          {translatedText !== '' && (
            <Card style={styles.resultCard} mode="elevated">
              <Card.Content>
                <Text variant="titleMedium" style={styles.label}>
                  Tradução {translationType.name}
                </Text>
                <Text
                  variant="bodyLarge"
                  style={styles.translatedText}
                  selectable
                >
                  {translatedText}
                </Text>
              </Card.Content>
            </Card>
          )}

          <Card style={styles.infoCard} mode="outlined">
            <Card.Content>
              <Text variant="bodySmall" style={styles.infoText}>
                ℹ️ {translationType.description}
              </Text>
              <Text variant="bodySmall" style={styles.infoText}>
                ⚠️ A API gratuita tem limite de 5 requisições por hora.
              </Text>
            </Card.Content>
          </Card>
        </ScrollView>
      </KeyboardAvoidingView>

      <Snackbar
        visible={showSnackbar}
        onDismiss={() => setShowSnackbar(false)}
        duration={3000}
        action={{
          label: 'OK',
          onPress: () => setShowSnackbar(false),
        }}
      >
        {error}
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  card: {
    marginBottom: 16,
  },
  label: {
    marginBottom: 8,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: 'white',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  translateButton: {
    flex: 1,
    marginRight: 8,
  },
  clearButton: {
    flex: 0.5,
  },
  loadingContainer: {
    alignItems: 'center',
    marginVertical: 24,
  },
  loadingText: {
    marginTop: 8,
    color: '#666',
  },
  resultCard: {
    marginBottom: 16,
    backgroundColor: '#e8f5e9',
  },
  translatedText: {
    fontSize: 18,
    lineHeight: 28,
    color: '#2e7d32',
  },
  infoCard: {
    marginTop: 8,
  },
  infoText: {
    color: '#666',
    marginBottom: 4,
  },
});
