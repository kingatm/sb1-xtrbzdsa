import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import * as SecureStore from 'expo-secure-store';
import type { Movie } from '@/types/omdb';

interface MovieStore {
  favorites: Movie[];
  watchlist: Movie[];
  addToFavorites: (movie: Movie) => void;
  removeFromFavorites: (movieId: string) => void;
  addToWatchlist: (movie: Movie) => void;
  removeFromWatchlist: (movieId: string) => void;
  isFavorite: (movieId: string) => boolean;
  isInWatchlist: (movieId: string) => boolean;
}

const storage = {
  getItem: async (name: string): Promise<string | null> => {
    return await SecureStore.getItemAsync(name);
  },
  setItem: async (name: string, value: string): Promise<void> => {
    await SecureStore.setItemAsync(name, value);
  },
  removeItem: async (name: string): Promise<void> => {
    await SecureStore.deleteItemAsync(name);
  },
};

export const useMovieStore = create<MovieStore>()(
  persist(
    (set, get) => ({
      favorites: [],
      watchlist: [],
      addToFavorites: (movie) =>
        set((state) => ({
          favorites: [...state.favorites, movie],
        })),
      removeFromFavorites: (movieId) =>
        set((state) => ({
          favorites: state.favorites.filter((m) => m.imdbID !== movieId),
        })),
      addToWatchlist: (movie) =>
        set((state) => ({
          watchlist: [...state.watchlist, movie],
        })),
      removeFromWatchlist: (movieId) =>
        set((state) => ({
          watchlist: state.watchlist.filter((m) => m.imdbID !== movieId),
        })),
      isFavorite: (movieId) =>
        get().favorites.some((movie) => movie.imdbID === movieId),
      isInWatchlist: (movieId) =>
        get().watchlist.some((movie) => movie.imdbID === movieId),
    }),
    {
      name: 'movie-store',
      storage: createJSONStorage(() => storage),
    }
  )
);