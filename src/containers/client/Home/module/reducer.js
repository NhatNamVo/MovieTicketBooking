import {
  FETCH_ALL_MOVIE_FAIL,
  FETCH_ALL_MOVIE_REQUEST,
  FETCH_ALL_MOVIE_SUCCESS,
  FETCH_MOVIE_ALL_BANNER_FAIL,
  FETCH_MOVIE_ALL_BANNER_SUCCESS,
  CHANGE_CURRENT_MOVIE_NEW,
  GET_TRAILER_MOVIE,
} from "./types";

const initialState = {
  listMovie: [],
  defaultCarousel: {
    status: "",
    filmInfo: {},
  },
  carousel: [
    {
      status: "active",
      filmInfo: {},
    },
  ],
  showingMovie: [],
  hotMovie: [],
  newMovie: [],
  loading: false,
  currentMovienew: [],
  currentMovieIdx: 0,
  currentTrailerMovie: null,
  error: "",
};

const movieReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_ALL_MOVIE_REQUEST:
      return { ...state, loading: true };
    case FETCH_MOVIE_ALL_BANNER_SUCCESS:
      const { carousel, defaultCarousel } = state;
      for (let i = 0; i < payload.length; i++) {
        if (i === 0) {
          carousel[0].filmInfo = payload[0];
        } else {
          defaultCarousel.filmInfo = payload[i];
          const carouselItem = { ...defaultCarousel };
          carousel.push(carouselItem);
        }
      }
      return { ...state, carousel: carousel };
    case FETCH_MOVIE_ALL_BANNER_FAIL:
      return { ...state, error: payload };
    case FETCH_ALL_MOVIE_SUCCESS:
      const showingMovie = payload.filter((movie) => {
        return movie.dangChieu === true;
      });
      const hotMovie = payload.filter((movie) => {
        return movie.hot === true;
      });
      const newMovie = payload.filter((movie) => {
        return movie.sapChieu === true;
      });
      const currentMovienew = payload[state.currentMovieIdx];
      return {
        ...state,
        listMovie: payload,
        loading: false,
        newMovie: payload,
        hotMovie: payload,
        showingMovie: payload,
        currentMovienew: currentMovienew,
      };
    case FETCH_ALL_MOVIE_FAIL:
      return { ...state, error: payload, loading: false };
    case CHANGE_CURRENT_MOVIE_NEW:
      const Idx = payload;
      const currentMovie = state.newMovie[Idx];
      return {
        ...state,
        currentMovieIdx: Idx,
        currentMovienew: currentMovie,
      };
    case GET_TRAILER_MOVIE:
      const currentTrailerMovie = state.listMovie.find((movie,idx)=>{
        return movie.maPhim == payload;
      }).trailer;
      return {...state,currentTrailerMovie:currentTrailerMovie};
    default:
      return { ...state };
  }
};

export default movieReducer;
