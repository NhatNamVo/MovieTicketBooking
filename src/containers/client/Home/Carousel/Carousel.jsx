import React, { Component } from "react";
import CarouselItem from "./CarouselItem";
import {connect} from "react-redux";
import "./Carousel.scss";
class Carousel extends Component {
  state = {
    autoPlay: true,
    windowWidth: window.innerWidth,
    containerHeight: 0,
  };
  isWindowResize = true;
  apiChangeCarousel = (event) => {
    const nextBtn = event.target.closest(".arrow-next");
    const prevBtn = event.target.closest(".arrow-prev");
    if (nextBtn) {
      this.changeCarousel("next");
    }
    if (prevBtn) {
      this.changeCarousel("prev");
    }
  };
  componentDidMount() {
    this.isWindowResize = true;
    if (this.state.autoPlay === true) {
      this.carousel = setInterval(() => {
        this.changeCarousel("next");
      }, 10000);
    }
    else{
      clearInterval(this.carousel);
    }
    this.changeWindowWidth();
    window.addEventListener("resize", this.changeWindowWidth);
  }
  changeWindowWidth = () => {
    const container = document.querySelector(".Carousel-content");
    let containerHeight = 0;
    if(!!container){
      containerHeight = container.clientHeight;
    }
    if(!!this.isWindowResize){
      this.setState({
        windowWidth: window.innerWidth,
        containerHeight: containerHeight,
      });
    }

  };
  componentWillUnmount() {
    this.isWindowResize = false;
    window.removeEventListener('resize', this.changeWindowWidth);
  }
  changeCarousel = (type) => {
    const { carousel } = this.props;
    const itemId = carousel.findIndex((item, idx) => {
      return item.status === "active";
    });
    if (type === "next") {
      carousel[itemId].status = "";
      if (itemId < carousel.length - 1) {
        carousel[itemId + 1].status = "active";
      } else {
        carousel[0].status = "active";
      }
    }
    if (type === "prev") {
      carousel[itemId].status = "";
      if (itemId > 0) {
        carousel[itemId - 1].status = "active";
      } else {
        carousel[carousel.length - 1].status = "active";
      }
    }
    this.setState({});
  };
  render() {
    const {windowWidth, containerHeight } = this.state;
    const {match, history, carousel} = this.props;
    return (
      <div className="Carousel-container">
        <div className="apiBtn arrow-prev" onClick={this.apiChangeCarousel}>
          <i className="fa fa-angle-left"></i>
        </div>
        <div className="Carousel-content">
          {carousel.map((item, idx) => {
            return (
              <CarouselItem
                key={idx}
                active={item.status}
                windowWidth={windowWidth}
                containerHeight={containerHeight}
                filmInfo={item.filmInfo}
                match = {match}
                history = {history}
              />
            );
          })}
        </div>
        <div className="apiBtn arrow-next" onClick={this.apiChangeCarousel}>
          <i className="fa fa-angle-right"></i>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state)=>({
  carousel: state.movieReducer.carousel,
});

export default connect(mapStateToProps)(Carousel);
