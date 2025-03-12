import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useMovieStore } from '@/stores/movieStore';
import { MovieCard } from '@/components/MovieCard';

export default function WatchlistScreen() {
  const { watchlist } = useMovieStore();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Watchlist</Text>
      <FlatList
        data={watchlist}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.grid}
        renderItem={({ item }) => (
          <View style={styles.movieCard}>
            <MovieCard movie={item} size="large" />
          </View>
        )}
        ListEmptyComponent={() => (
          <View style={styles.empty}>
            <Text style={styles.emptyText}>
              Your watchlist is empty
            </Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    paddingTop: 48,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontFamily: 'Inter_700Bold',
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  grid: {
    padding: 16,
  },
  movieCard: {
    flex: 1,
    marginBottom: 24,
    alignItems: 'center',
  },
  empty: {
    alignItems: 'center',
    marginTop: 24,
  },
  emptyText: {
    color: '#888',
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
  },
});