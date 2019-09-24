export interface Movie {
  id: number
  title: string
  image: string
  link: string
  score: string
  length: number
  userId: number
  createdAt: Date
  updatedAt: Date
}

export interface PopularMovie {
  id: number
  title: string
  image: string
  homepage: string | null
}

export interface S {
  isLoading: boolean
  movies: Array<Movie>
  errorMessage: string
  popularMovies: Array<PopularMovie>
}

export interface G {
  isLoading: boolean
  movies: Array<Movie>
  errorMessage: string
  popularMovies: Array<PopularMovie>
}

export interface RG {
  'isLoading': G['isLoading']
  'movies': G['movies']
  'errorMessage': G['errorMessage']
  'popularMovies': G['popularMovies']
}

export interface M {
  loading: void
  notLoading: void
  setMovies: { movies: Array<Movie> }
  resetMovies: void
  setError: string
  resetError: void
  setPopularMovies: { movies: Array<PopularMovie> }
}

export interface RM {
  'loading': M['loading']
  'notLoading': M['notLoading']
  'setMovies': M['setMovies']
  'resetMovies': M['resetMovies']
  'setError': M['setError']
  'resetError': M['resetError']
  'setPopularMovies': M['setPopularMovies']
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
  setPopularMovies: void
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
  'setPopularMovies': A['setPopularMovies']
}
