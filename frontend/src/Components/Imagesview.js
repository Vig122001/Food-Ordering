import React, { Component } from 'react';
import { Carousel } from 'react-bootstrap';

export default class Imagesview extends Component {
  constructor() {
    super();
    this.state = {
      images: [],
    };
  }
  componentDidMount() {
    fetch(`http://localhost:7878/zomato/restaurants`, { method: 'GET' })
      .then((response) => response.json())
      .then((data) => this.setState({ images: data.data }));
  }
  render() {
    let allimages =
      this.state.images.length &&
      this.state.images.map((item) => (
        <img
          value={item.name}
          className="d-block w-100"
          src={item.thumb}
          alt="First slide"
        />
      ));

    return (
      <div style={{ display: 'block', width: 700, padding: 30 }}>
        <Carousel>
          <Carousel.Item>{allimages}</Carousel.Item>
          <a class="left carousel-control" href="#myCarousel" data-slide="prev">
            <span class="glyphicon glyphicon-chevron-left"></span>
            <span class="sr-only">Previous</span>
          </a>
          <a
            class="right carousel-control"
            href="#myCarousel"
            data-slide="next"
          >
            <span class="glyphicon glyphicon-chevron-right"></span>
            <span class="sr-only">Next</span>
          </a>
        </Carousel>
      </div>
    );
  }
}
