import React, { Component } from "react";
import MovieItem from "../../../shared/MovieItem/MovieItem";
import renderMovie from '../../../shared/MovieItem/RenderMovieList';
import {connect} from 'react-redux';
class Movieshow extends Component {
  render() {
    const showingMovie = this.props.showingMovie.slice(0,4);
    return (
      <div className="container">
        <h3>Phim đang chiếu</h3>
        <div className="row">
          {renderMovie(MovieItem, showingMovie)}
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  showingMovie: state.movieReducer.showingMovie,
})
export default connect(mapStateToProps)(Movieshow);
