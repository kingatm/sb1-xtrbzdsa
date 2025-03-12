import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { MovieCard } from './MovieCard';
import type { Movie } from '@/types/tmdb';

interface MovieListProps {
  title: string;
  movies: Movie[];
  size?: 'small' | 'large';
}

export function MovieList({ title, movies, size = 'small' }: MovieListProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.list}>
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} size={size} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontFamily: 'Inter_700Bold',
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  list: {
    paddingHorizontal: 16,
  },
});