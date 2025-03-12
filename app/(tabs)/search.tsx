import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { Search as SearchIcon } from 'lucide-react-native';
import { searchMovies } from '@/lib/api';
import { MovieCard } from '@/components/MovieCard';

export default function SearchScreen() {
  const [query, setQuery] = useState('');

  const { data, isLoading } = useQuery({
    queryKey: ['search', query],
    queryFn: () => searchMovies(query),
    enabled: query.length > 0,
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <SearchIcon size={20} color="#888" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search movies..."
            placeholderTextColor="#888"
            value={query}
            onChangeText={setQuery}
          />
        </View>
      </View>

      {isLoading ? (
        <ActivityIndicator color="#fff" style={styles.loader} />
      ) : (
        <FlatList
          data={data?.results || []}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          contentContainerStyle={styles.results}
          renderItem={({ item }) => (
            <View style={styles.movieCard}>
              <MovieCard movie={item} size="large" />
            </View>
          )}
          ListEmptyComponent={() => (
            <View style={styles.empty}>
              <Text style={styles.emptyText}>
                {query ? 'No results found' : 'Search for movies'}
              </Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  header: {
    paddingTop: 48,
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: '#1a1a1a',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2a2a2a',
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 48,
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
  },
  results: {
    padding: 16,
  },
  movieCard: {
    flex: 1,
    marginBottom: 24,
    alignItems: 'center',
  },
  loader: {
    marginTop: 24,
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