import React from 'react'
import request from 'superagent';
import {Carousel} from 'react-bootstrap'

require("./css/news.scss");

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
          this.setState({ data: res.body });
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
      <CarouselItems data={this.state.data}/>
    );
  }
});
