import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { getTrending, getPopular, getUpcoming } from '@/lib/api';
import { MovieList } from '@/components/MovieList';

export default function HomeScreen() {
  const { data: trendingData } = useQuery({
    queryKey: ['trending'],
    queryFn: () => getTrending(),
  });

  const { data: popularData } = useQuery({
    queryKey: ['popular'],
    queryFn: () => getPopular(),
  });

  const { data: upcomingData } = useQuery({
    queryKey: ['upcoming'],
    queryFn: () => getUpcoming(),
  });

  return (
    <View style={styles.container}>
      <ScrollView>
        {trendingData?.results && (
          <MovieList
            title="Trending Now"
            movies={trendingData.results}
            size="large"
          />
        )}
        {popularData?.results && (
          <MovieList title="Popular" movies={popularData.results} />
        )}
        {upcomingData?.results && (
          <MovieList title="Upcoming" movies={upcomingData.results} />
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
});
