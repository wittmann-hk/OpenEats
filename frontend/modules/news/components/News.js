import React from 'react'
import request from 'superagent';
import {Carousel} from 'react-bootstrap'

import ListRecipes from '../../recipe/components/ListRecipes'

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
  loadNewsFromServer: function(url) {
    request
      .get(url)
      .type('json')
      .end((err, res) => {
        if (!err && res) {
          this.setState({ data: res.body.results });
        } else {
          console.error(url, err.toString());
        }
      })
  },
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    var url = "/api/v1/news/entry/?format=json";
    this.loadNewsFromServer(url);
  },
  render: function() {
    return (
      <div>
        <CarouselItems data={this.state.data}/>
        <div className="container">
          <div className="row">
            <ListRecipes format="col-xs-12 col-sm-6 col-md-4 col-lg-3" url='&limit=4' />
          </div>
        </div>
      </div>
    );
  }
});
