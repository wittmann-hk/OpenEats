import React from 'react'
import request from 'superagent';

import Cuisine from './Cuisine'
import ListRecipes from './ListRecipes'
import Pagination from './Pagination'
import {serverURLs} from '../../common/config'

require("./../css/browse.scss");

export default React.createClass({
  getInitialState: function() {
    return {
      data: [],
      count: '',
      next: '',
      previous: ''
    };
  },
  loadRecipesFromServer: function (url) {
    request
      .get(url)
      .type('json')
      .end((err, res) => {
        if (!err && res) {
          console.log(res.body.count, res.body.next, res.body.previous);
          this.setState({
              data: res.body.results,
              count: res.body.count,
              next: res.body.next,
              previous: res.body.previous
          });
        } else {
          console.error(url, err.toString());
        }
      })
  },
  updateURL: function(location, params) {
    var base_url = serverURLs.browse;
    console.log(location);
    if (location.query.offset) {
      base_url += "&offset=" + location.query.offset;
    }
    if (location.query.limit) {
      base_url += "&limit=" + location.query.limit;
    }
    if (params.cuisine) {
      base_url += "&cuisine=" + params.cuisine;
    }
    if (location.query.search) {
      base_url += "&search=" + location.query.search;
    }
    console.log(base_url);
    this.loadRecipesFromServer(base_url);
  },
  componentDidMount: function() {
    console.log(this.props.location.query);
    console.log(this.props.params);
    this.updateURL(this.props.location, this.props.params);
  },
  componentWillReceiveProps(nextProps) {
    console.log(nextProps.location.query);
    console.log(nextProps.params);
    this.updateURL(nextProps.location, nextProps.params);
  },
  render: function() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-2 sidebar">
            <div className="sidebar">
              <Cuisine/>
            </div>
          </div>
          <div className="col-xs-10">
            <div id="browse" className="row">
              <ListRecipes format="col-xs-12 col-sm-6 col-md-4 col-lg-3" data={this.state.data} />
            </div>
            <div className="row">
              <div className="col-xs-12">
                <Pagination previous={this.state.previous} next={this.state.next} path={this.props.location.pathname}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});
