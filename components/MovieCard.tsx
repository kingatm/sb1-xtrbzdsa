import React from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { Link } from 'expo-router';
import { Star } from 'lucide-react-native';
import { getImageUrl } from '@/lib/api';
import type { Movie } from '@/types/omdb';

interface MovieCardProps {
  movie: Movie;
  size?: 'small' | 'large';
}

export function MovieCard({ movie, size = 'small' }: MovieCardProps) {
  const styles = createStyles(size);

  return (
    <Link href={`/movie/${movie.imdbID}`} asChild>
      <Pressable style={styles.container}>
        <Image
          source={{ uri: getImageUrl(movie.Poster) }}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.info}>
          <Text style={styles.title} numberOfLines={1}>
            {movie.Title}
          </Text>
          <View style={styles.metadata}>
            <Text style={styles.year}>{movie.Year}</Text>
          </View>
        </View>
      </Pressable>
    </Link>
  );
}

const createStyles = (size: 'small' | 'large') =>
  StyleSheet.create({
    container: {
      width: size === 'small' ? 140 : 170,
      marginRight: 12,
    },
    image: {
      width: '100%',
      height: size === 'small' ? 210 : 255,
      borderRadius: 8,
      backgroundColor: '#2a2a2a',
    },
    info: {
      marginTop: 8,
    },
    title: {
      color: '#fff',
      fontSize: size === 'small' ? 14 : 16,
      fontFamily: 'Inter_600SemiBold',
    },
    metadata: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 4,
    },
    year: {
      color: '#888',
      fontSize: 12,
      fontFamily: 'Inter_400Regular',
    },
  });