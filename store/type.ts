export interface Movie {
  id: number
  title: string
  image: string
  link: string
  score: string
  length: number
  user_id: number
  created_at: Date
  updated_at: Date
}

export interface S {
  isLoading: boolean
  movies: Array<Movie>
  errorMessage: string
}

export interface G {
  isLoading: boolean
  movies: Array<Movie>
  errorMessage: string
}

export interface RG {
  'isLoading': G['isLoading']
  'movies': G['movies']
  'errorMessage': G['errorMessage']
}

export interface M {
  loading: void
  notLoading: void
  setMovies: { movies: Array<Movie> }
  resetMovies: void
  setError: string
  resetError: void
}

export interface RM {
  'loading': M['loading']
  'notLoading': M['notLoading']
  'setMovies': M['setMovies']
  'resetMovies': M['resetMovies']
  'setError': M['setError']
  'resetError': M['resetError']
}

export interface A {
  loading: void
  notLoading: void
  setError: string
  resetError: void
  fetchUserMovies: void
  fetchClipMovies: { userId: string, page: number }
  resetClipMovies: void
  setClipMovies: { movies: Array<Movie> }
  updateClipMoviesDB: { movies: Array<Movie> }
}

export interface RA {
  'loading': A['loading']
  'notLoading': A['notLoading']
  'setError': A['setError']
  'resetError': A['resetError']
  'fetchUserMovies': A['fetchUserMovies']
  'fetchClipMovies': A['fetchClipMovies']
  'resetClipMovies': A['resetClipMovies']
  'setClipMovies': A['setClipMovies']
  'updateClipMoviesDB': A['updateClipMoviesDB']
}