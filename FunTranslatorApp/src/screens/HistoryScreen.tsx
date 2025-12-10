import React, { useState, useCallback } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { Text, Appbar, useTheme, Button, Dialog, Portal } from 'react-native-paper';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { HistoryItem } from '../components';
import { RootStackParamList, TranslationHistory } from '../types';

type HistoryScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'History'
>;

interface HistoryScreenProps {
  navigation: HistoryScreenNavigationProp;
}

export const HistoryScreen: React.FC<HistoryScreenProps> = ({ navigation }) => {
  const theme = useTheme();
  const [history, setHistory] = useState<TranslationHistory[]>([]);
  const [showDialog, setShowDialog] = useState(false);

  const loadHistory = async () => {
    try {
      const historyJson = await AsyncStorage.getItem('translationHistory');
      if (historyJson) {
        setHistory(JSON.parse(historyJson));
      }
    } catch (err) {
      console.error('Erro ao carregar histórico:', err);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadHistory();
    }, [])
  );

  const handleDelete = async (id: string) => {
    try {
      const newHistory = history.filter((item) => item.id !== id);
      setHistory(newHistory);
      await AsyncStorage.setItem('translationHistory', JSON.stringify(newHistory));
    } catch (err) {
      console.error('Erro ao deletar item:', err);
    }
  };

  const handleClearAll = async () => {
    try {
      await AsyncStorage.removeItem('translationHistory');
      setHistory([]);
      setShowDialog(false);
    } catch (err) {
      console.error('Erro ao limpar histórico:', err);
    }
  };

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyEmoji}>📝</Text>
      <Text variant="titleMedium" style={styles.emptyTitle}>
        Nenhuma tradução ainda
      </Text>
      <Text variant="bodyMedium" style={styles.emptyText}>
        Suas traduções aparecerão aqui
      </Text>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('Home')}
        style={styles.emptyButton}
      >
        Fazer primeira tradução
      </Button>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="📜 Histórico" />
        {history.length > 0 && (
          <Appbar.Action icon="delete-sweep" onPress={() => setShowDialog(true)} />
        )}
      </Appbar.Header>

      {history.length === 0 ? (
        renderEmptyState()
      ) : (
        <FlatList
          data={history}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <HistoryItem item={item} onDelete={handleDelete} />
          )}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      )}

      <Portal>
        <Dialog visible={showDialog} onDismiss={() => setShowDialog(false)}>
          <Dialog.Title>Limpar histórico</Dialog.Title>
          <Dialog.Content>
            <Text>Tem certeza que deseja apagar todo o histórico?</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setShowDialog(false)}>Cancelar</Button>
            <Button onPress={handleClearAll} textColor="red">
              Limpar
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    paddingVertical: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  emptyEmoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyTitle: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  emptyText: {
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
  },
  emptyButton: {
    marginTop: 8,
  },
});
