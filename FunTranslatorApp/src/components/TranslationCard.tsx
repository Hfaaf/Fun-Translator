import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Text, useTheme } from 'react-native-paper';
import { TranslationType } from '../types';

interface TranslationCardProps {
  translation: TranslationType;
  onPress: () => void;
}

export const TranslationCard: React.FC<TranslationCardProps> = ({
  translation,
  onPress,
}) => {
  const theme = useTheme();

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

  return (
    <Card style={styles.card} onPress={onPress} mode="elevated">
      <Card.Content style={styles.content}>
        <View style={styles.emojiContainer}>
          <Text style={styles.emoji}>{getEmoji(translation.id)}</Text>
        </View>
        <View style={styles.textContainer}>
          <Text variant="titleMedium" style={styles.title}>
            {translation.name}
          </Text>
          <Text variant="bodySmall" style={styles.description}>
            {translation.description}
          </Text>
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 8,
    marginHorizontal: 16,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  emojiContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  emoji: {
    fontSize: 28,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontWeight: 'bold',
  },
  description: {
    color: '#666',
    marginTop: 4,
  },
});
