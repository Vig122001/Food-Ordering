import React, { Component } from 'react';
import '../Styles/Wallpaper.css';
import Filter from './Filter';

import MealTypeItem from './MealTypeItem';

export default class QuickSearch extends Component {
  constructor() {
    super();
    this.state = {
      mealtypes: [],
    };
  }

  componentDidMount() {
    fetch(`http://localhost:7878/zomato/mealtype`, { method: 'GET' })
      .then((response) => response.json())
      .then((data) => this.setState({ mealtypes: data.data }));
  }

  render() {
    let quickSearchList =
      this.state.mealtypes.length &&
      this.state.mealtypes.map((item) => (
        <a href="/filter" key={item.name}>
          {' '}
          <MealTypeItem item={item} key={item.name}></MealTypeItem>
        </a>
      ));
    return (
      <div>
        <div className="quicksearch">
          <p className="quicksearchHeading">Quick Searches</p>
          <p className="quicksearchSubHeading">
            Discover restaurants by type of meal
          </p>
          <div className="container-fluid">
            <div className="row">{quickSearchList}</div>
          </div>
        </div>
      </div>
    );
  }
}
