import React from 'react';
import { StyleSheet, View, FlatList, StatusBar } from 'react-native';
import { Text, Appbar, useTheme, Divider } from 'react-native-paper';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { TranslationCard } from '../components';
import { translationTypes } from '../services/api';
import { RootStackParamList, TranslationType } from '../types';

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>;

interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const theme = useTheme();

  const handleTranslationPress = (translationType: TranslationType) => {
    navigation.navigate('Translation', { translationType });
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <Text variant="headlineSmall" style={styles.subtitle}>
        Escolha um estilo de tradução divertido!
      </Text>
      <Divider style={styles.divider} />
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <StatusBar barStyle="light-content" />
      <Appbar.Header>
        <Appbar.Content title="🌐 Fun Translator" />
        <Appbar.Action
          icon="history"
          onPress={() => navigation.navigate('History')}
        />
      </Appbar.Header>

      <FlatList
        data={translationTypes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TranslationCard
            translation={item}
            onPress={() => handleTranslationPress(item)}
          />
        )}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 16,
  },
  subtitle: {
    textAlign: 'center',
    color: '#666',
    marginBottom: 8,
  },
  divider: {
    marginTop: 8,
  },
  list: {
    paddingBottom: 16,
  },
});
