import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Text, IconButton } from 'react-native-paper';
import { TranslationHistory } from '../types';

interface HistoryItemProps {
  item: TranslationHistory;
  onDelete: (id: string) => void;
}

export const HistoryItem: React.FC<HistoryItemProps> = ({ item, onDelete }) => {
  const formatDate = (date: Date): string => {
    return new Date(date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <Card style={styles.card} mode="outlined">
      <Card.Content>
        <View style={styles.header}>
          <Text variant="labelMedium" style={styles.type}>
            {item.type.toUpperCase()}
          </Text>
          <IconButton
            icon="delete"
            size={20}
            onPress={() => onDelete(item.id)}
          />
        </View>
        <Text variant="bodyMedium" style={styles.original}>
          "{item.original}"
        </Text>
        <Text variant="bodyLarge" style={styles.translated}>
          "{item.translated}"
        </Text>
        <Text variant="labelSmall" style={styles.date}>
          {formatDate(item.timestamp)}
        </Text>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 6,
    marginHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  type: {
    color: '#6200ee',
    fontWeight: 'bold',
  },
  original: {
    color: '#666',
    fontStyle: 'italic',
    marginBottom: 8,
  },
  translated: {
    color: '#333',
    fontWeight: '500',
    marginBottom: 8,
  },
  date: {
    color: '#999',
  },
});
