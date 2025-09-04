import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface RedditPost {
  title: string;
  link: string;
  author: string;
  score: number;
  comments: number;
  timestamp: string;
  thumbnail?: string;
  body?: string;
}

interface PostsState {
  posts: RedditPost[];
  loading: boolean;
  error: string | null;
  loadingMore: boolean;
  expandedPosts: Set<number>;
  currentCommunity: string | null;
  currentSort: string | null;
  lastFetchTime: number | null;

  // Actions
  setPosts: (posts: RedditPost[]) => void;
  addPosts: (posts: RedditPost[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setLoadingMore: (loadingMore: boolean) => void;
  togglePostExpansion: (index: number) => void;
  setCurrentParams: (community: string | null, sort: string | null) => void;
  clearPosts: () => void;
  shouldRefetch: (community: string | null, sort: string | null) => boolean;
  resetStore: () => void;
}

export const usePostsStore = create<PostsState>()(
  persist(
    (set, get) => ({
      posts: [],
      loading: false,
      error: null,
      loadingMore: false,
      expandedPosts: new Set(),
      currentCommunity: null,
      currentSort: null,
      lastFetchTime: null,

      setPosts: (posts) =>
        set({
          posts,
          error: null,
          lastFetchTime: Date.now(),
        }),

      addPosts: (newPosts) =>
        set((state) => ({
          posts: [...state.posts, ...newPosts],
          error: null,
          lastFetchTime: Date.now(),
        })),

      setLoading: (loading) => set({ loading }),

      setError: (error) => set({ error }),

      setLoadingMore: (loadingMore) => set({ loadingMore }),

      togglePostExpansion: (index) =>
        set((state) => {
          const newExpanded = new Set(state.expandedPosts);
          if (newExpanded.has(index)) {
            newExpanded.delete(index);
          } else {
            newExpanded.add(index);
          }
          return { expandedPosts: newExpanded };
        }),

      setCurrentParams: (community, sort) =>
        set({
          currentCommunity: community,
          currentSort: sort,
        }),

      clearPosts: () =>
        set({
          posts: [],
          expandedPosts: new Set(),
          error: null,
          lastFetchTime: null,
        }),

      shouldRefetch: (community, sort) => {
        const state = get();
        const isSameParams =
          state.currentCommunity === community && state.currentSort === sort;
        const hasNoPosts = state.posts.length === 0;
        const isStale =
          state.lastFetchTime &&
          Date.now() - state.lastFetchTime > 5 * 60 * 1000; // 5 minutes

        return !isSameParams || hasNoPosts || isStale;
      },

      resetStore: () =>
        set({
          posts: [],
          loading: false,
          error: null,
          loadingMore: false,
          expandedPosts: new Set(),
          currentCommunity: null,
          currentSort: null,
          lastFetchTime: null,
        }),
    }),
    {
      name: "reddit-posts-storage",
      partialize: (state) => ({
        posts: state.posts,
        currentCommunity: state.currentCommunity,
        currentSort: state.currentSort,
        lastFetchTime: state.lastFetchTime,
        expandedPosts: Array.from(state.expandedPosts), // Convert Set to Array for serialization
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          // Convert expandedPosts array back to Set after rehydration
          state.expandedPosts = new Set(
            state.expandedPosts as unknown as number[]
          );
        }
      },
    }
  )
);
