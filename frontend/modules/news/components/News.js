import React from 'react'
import request from 'superagent';
import {Carousel} from 'react-bootstrap'

import ListRecipes from '../../browse/components/ListRecipes'

require("./../css/news.scss");

var CarouselItems = React.createClass({
  render: function() {
    var entryNodes = this.props.data.map(function(entry) {
      return (
        <Carousel.Item key={entry.id}>
          <img src={entry.image}/>
          <Carousel.Caption>
            <h3>{entry.title}</h3>
            <p>{entry.content}</p>
          </Carousel.Caption>
        </Carousel.Item>
      );
    });
    return (
      <Carousel>
        {entryNodes}
      </Carousel>
    );
  }
});

export default React.createClass({
  loadNewsFromServer: function() {
    var url = "/api/v1/news/entry/?format=json";
    request
      .get(url)
      .type('json')
      .end((err, res) => {
        if (!err && res) {
          this.setState({ news: res.body.results });
        } else {
          console.error(url, err.toString());
        }
      })
  },
  loadRecipesFromServer: function () {
    var base_url = "/api/v1/recipe/recipes/?format=json&fields=id,title,pub_date,rating,photo_thumbnail&limit=4";
    request
      .get(base_url)
      .type('json')
      .end((err, res) => {
        if (!err && res) {
          this.setState({recipes: res.body.results});
        } else {
          console.error(base_url, err.toString());
        }
      })
  },
  getInitialState: function() {
    return {
      news: [],
      recipes: []
    };
  },
  componentDidMount: function() {
    this.loadNewsFromServer();
    this.loadRecipesFromServer();
  },
  render: function() {
    return (
      <div>
        <CarouselItems data={this.state.news}/>
        <div className="container">
          <div className="row">
            <ListRecipes format="col-xs-12 col-sm-6 col-md-3" data={this.state.recipes} />
          </div>
        </div>
      </div>
    );
  }
});
