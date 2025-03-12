import axios from 'axios';
import Constants from 'expo-constants';
import type { Movie, MovieDetails, SearchResponse, ErrorResponse } from '@/types/omdb';

const api = axios.create({
  baseURL: Constants.expoConfig?.extra?.EXPO_PUBLIC_OMDB_API_URL,
  params: {
    apikey: Constants.expoConfig?.extra?.EXPO_PUBLIC_OMDB_API_KEY,
  },
});

export const searchMovies = async (query: string, page = 1): Promise<SearchResponse> => {
  const { data } = await api.get('', { 
    params: { 
      s: query,
      page,
      type: 'movie'
    } 
  });
  
  if (data.Response === 'False') {
    throw new Error(data.Error);
  }
  
  return data;
};

export const getMovieDetails = async (id: string): Promise<MovieDetails> => {
  const { data } = await api.get('', { 
    params: { 
      i: id,
      plot: 'full'
    } 
  });

  if (data.Response === 'False') {
    throw new Error(data.Error);
  }

  return data;
};

export const getPopularMovies = async (): Promise<SearchResponse> => {
  // OMDB doesn't have a direct popular movies endpoint, so we'll search for common terms
  const popularQueries = ['star', 'love', 'hero', 'world'];
  const randomQuery = popularQueries[Math.floor(Math.random() * popularQueries.length)];
  return searchMovies(randomQuery);
};

export const getImageUrl = (url: string | null): string => {
  if (!url || url === 'N/A') {
    return 'https://images.unsplash.com/photo-1542204165-65bf26472b9b?w=500&auto=format&fit=crop&q=60';
  }
  return url;
};