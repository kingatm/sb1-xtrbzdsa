import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet, Pressable } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { Heart, Bookmark, ChevronLeft, Star } from 'lucide-react-native';
import { getMovieDetails, getImageUrl } from '@/lib/api';
import { useMovieStore } from '@/stores/movieStore';
import { LinearGradient } from 'expo-linear-gradient';

export default function MovieScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const movieId = parseInt(id);

  const { data: movie } = useQuery({
    queryKey: ['movie', movieId],
    queryFn: () => getMovieDetails(movieId),
  });

  const {
    addToFavorites,
    removeFromFavorites,
    addToWatchlist,
    removeFromWatchlist,
    isFavorite,
    isInWatchlist,
  } = useMovieStore();

  if (!movie) return null;

  const toggleFavorite = () => {
    if (isFavorite(movie.id)) {
      removeFromFavorites(movie.id);
    } else {
      addToFavorites(movie);
    }
  };

  const toggleWatchlist = () => {
    if (isInWatchlist(movie.id)) {
      removeFromWatchlist(movie.id);
    } else {
      addToWatchlist(movie);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Image
            source={{ uri: getImageUrl(movie.backdrop_path, 'original') }}
            style={styles.backdrop}
          />
          <LinearGradient
            colors={['transparent', '#121212']}
            style={styles.gradient}
          />
          <Pressable style={styles.backButton} onPress={() => router.back()}>
            <ChevronLeft color="#fff" size={24} />
          </Pressable>
        </View>

        <View style={styles.content}>
          <View style={styles.posterContainer}>
            <Image
              source={{ uri: getImageUrl(movie.poster_path) }}
              style={styles.poster}
            />
          </View>

          <View style={styles.info}>
            <Text style={styles.title}>{movie.title}</Text>
            <Text style={styles.tagline}>{movie.tagline}</Text>

            <View style={styles.metadata}>
              <View style={styles.rating}>
                <Star size={16} color="#FFD700" fill="#FFD700" />
                <Text style={styles.ratingText}>
                  {movie.vote_average.toFixed(1)}
                </Text>
              </View>
              <Text style={styles.dot}>•</Text>
              <Text style={styles.year}>
                {format(new Date(movie.release_date), 'yyyy')}
              </Text>
              <Text style={styles.dot}>•</Text>
              <Text style={styles.runtime}>{movie.runtime}min</Text>
            </View>

            <View style={styles.genres}>
              {movie.genres.map((genre) => (
                <View key={genre.id} style={styles.genre}>
                  <Text style={styles.genreText}>{genre.name}</Text>
                </View>
              ))}
            </View>

            <View style={styles.actions}>
              <Pressable
                style={styles.actionButton}
                onPress={toggleFavorite}>
                <Heart
                  size={24}
                  color="#fff"
                  fill={isFavorite(movie.id) ? '#ff4081' : 'none'}
                />
              </Pressable>
              <Pressable
                style={styles.actionButton}
                onPress={toggleWatchlist}>
                <Bookmark
                  size={24}
                  color="#fff"
                  fill={isInWatchlist(movie.id) ? '#fff' : 'none'}
                />
              </Pressable>
            </View>

            <Text style={styles.sectionTitle}>Overview</Text>
            <Text style={styles.overview}>{movie.overview}</Text>

            <Text style={styles.sectionTitle}>Cast</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.castList}>
              {movie.credits.cast.slice(0, 10).map((actor) => (
                <View key={actor.id} style={styles.castItem}>
                  <Image
                    source={{ uri: getImageUrl(actor.profile_path) }}
                    style={styles.castImage}
                  />
                  <Text style={styles.castName}>{actor.name}</Text>
                  <Text style={styles.character}>{actor.character}</Text>
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  header: {
    height: 250,
    position: 'relative',
  },
  backdrop: {
    width: '100%',
    height: '100%',
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 100,
  },
  backButton: {
    position: 'absolute',
    top: 48,
    left: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    marginTop: -50,
    paddingHorizontal: 16,
  },
  posterContainer: {
    alignItems: 'center',
  },
  poster: {
    width: 150,
    height: 225,
    borderRadius: 8,
  },
  info: {
    marginTop: 16,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontFamily: 'Inter_700Bold',
    textAlign: 'center',
  },
  tagline: {
    color: '#888',
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    textAlign: 'center',
    marginTop: 4,
  },
  metadata: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    color: '#FFD700',
    marginLeft: 4,
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
  },
  dot: {
    color: '#888',
    marginHorizontal: 8,
  },
  year: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
  },
  runtime: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
  },
  genres: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 12,
  },
  genre: {
    backgroundColor: '#2a2a2a',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  genreText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
  actionButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#2a2a2a',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 8,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 20,
    fontFamily: 'Inter_700Bold',
    marginTop: 24,
    marginBottom: 12,
  },
  overview: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    lineHeight: 24,
  },
  castList: {
    marginTop: 12,
  },
  castItem: {
    width: 100,
    marginRight: 16,
  },
  castImage: {
    width: 100,
    height: 150,
    borderRadius: 8,
    backgroundColor: '#2a2a2a',
  },
  castName: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    marginTop: 8,
  },
  character: {
    color: '#888',
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    marginTop: 4,
  },
});