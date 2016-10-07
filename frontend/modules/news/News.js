import React from 'react'
import request from 'superagent';

require("./css/news.scss");

var CarouselButtons = React.createClass({
  render: function() {
    return (
      <div>
        <a className="left carousel-control" href="#news" role="button" data-slide="prev">
          <span className="glyphicon glyphicon-chevron-left" aria-hidden="true" />
          <span className="sr-only">Previous</span>
        </a>
        <a className="right carousel-control" href="#news" role="button" data-slide="next">
          <span className="glyphicon glyphicon-chevron-right" aria-hidden="true" />
          <span className="sr-only">Next</span>
        </a>
      </div>
    );
  }
});

var CarouselIndicators = React.createClass({
  render: function() {
    var indicatorNodes = this.props.data.map(function(entry) {
      return (
        <li className={((1===entry.id) ? 'active':'')} data-target="#news" data-slide-to={entry.id-1} key={entry.id} />
      );
    });
    return (
      <ol className="carousel-indicators">
        {indicatorNodes}
      </ol>
    );
  }
});

var CarouselItems = React.createClass({
  render: function() {
    var entryNodes = this.props.data.map(function(entry) {
      return (
        <div className={'item ' + ((1===entry.id) ? 'active':'')} key={entry.id}>
          <div className="carousel-caption">
            <h1>{entry.title}</h1>
            <p>{entry.content}</p>
          </div>
        </div>
      );
    });
    return (
      <div className="carousel-inner" role="listbox">
        {entryNodes}
      </div>
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
      <div id="news" className="carousel slide" data-ride="carousel" data-interval="false">
        <CarouselIndicators data={this.state.data} />
        <CarouselItems data={this.state.data} />
        <CarouselButtons />
      </div>
    );
  }
});
