import React from 'react'

import Cuisine from './Cuisine'
import ListRecipes from './../recipe/ListRecipes'

require("./css/browse.scss");

export default React.createClass({
  buildQueryString : function (query) {
      var query_string = '';
      var q;
      for (q in query)
          query_string += '&' + q + '=' + query[q];
      return query_string;
  },
  getInitialState: function() {
    return {url: ''};
  },
  componentDidMount: function() {
    if (this.props.params.cuisine) {
      this.setState({ url: '&cuisine=' + this.props.params.cuisine});
    }
    else if (this.props.location.query) {
      var query_string = this.buildQueryString(this.props.location.query);
      this.setState({ url: query_string});
    }
  },
  componentWillReceiveProps(nextProps) {
    if (this.props != nextProps) {
      if (nextProps.params.cuisine) {
        this.setState({ url: '&cuisine=' + nextProps.params.cuisine});
      }
      else if (nextProps.location.query) {
        var query_string = this.buildQueryString(nextProps.location.query);
        this.setState({ url: query_string});
      }
    }
  },
  render: function() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-2 sidebar">
            <div className="sidebar">
              <Cuisine url="/api/v1/groups/cuisine/?format=json" />
            </div>
          </div>
          <div className="col-xs-10">
            <div id="browse" className="row">
              <ListRecipes format="col-xs-12 col-sm-6 col-md-4 col-lg-3" url={this.state.url} />
            </div>
          </div>
        </div>
      </div>
    );
  }
});
