import React from 'react'

import request from 'superagent';
import { serverURLs } from '../../common/config'
import { browserHistory } from 'react-router'

import Filter from './Filter'
import ListRecipes from './ListRecipes'
import Pagination from './Pagination'

require("./../css/browse.scss");


//TODO:
/*
* There may still be some issues with pagtion not working right (was using limit=1)
* I may want to modify the callback for the child compents to take an array (so pagination can play nicer)
* */



// Array of default values that should be used when filtering
const DEFAULTS = {
  'limit': 2
};

const REST_FILTERS = [
  'offset'
];

const FILTER_MAP = {
  // frontend filter  :  backend filters
  'offset' : 'offset',
  'limit'  : 'limit',
  'cuisine': 'cuisine__title',
  'course' : 'course__title',
  'search' : 'search'
};

export default React.createClass({

  init: function() {
    var course = [];
    var cuisine = [];
    request.get(serverURLs.course).type('json')
      .end((err, res) => {
        if (!err && res) {
          course = res.body.results;
          request.get(serverURLs.cuisine).type('json')
            .end((err, res) => {
              if (!err && res) {
                cuisine = res.body.results;
                this.setState({
                  course: course,
                  cuisine: cuisine,
                });
              } else {
                console.error(serverURLs.cuisine, err.toString());
              }
            });
        } else {
          console.error(serverURLs.course, err.toString());
        }
      });
  },

  getRecipes: function(url) {
    url = serverURLs.browse + url;
    request
      .get(url)
      .type('json')
      .end((err, res) => {
        if (!err && res) {
          this.setState({
            total_recipes: res.body.count,
            recipes: res.body.results
          });
        } else {
          console.error(url, err.toString());
        }
      });
  },

  getInitialState: function() {
    return {
      recipes: [],
      total_recipes: 0,
      course: [],
      cuisine: [],
      filters: this.props.location.query || {},
    };
  },

  componentDidMount: function() {
    this.init();
    this.buildBackendURL();
  },

  filter: function(name, value) {
    var new_filters = this.state.filters;

    if (value == '' || value == 0) {
      delete new_filters[name];
    } else {
      new_filters[name] = value;
    }

    if (REST_FILTERS.indexOf(name) < 0) {
      for (let filter in REST_FILTERS) {
        delete new_filters[REST_FILTERS[filter]];
      }
    }

    this.setState({ filters: new_filters }, this.buildBackendURL());
    this.buildFrontendURL();
  },

  buildFrontendURL: function () {
    var query_map = this.state.filters;
    let encode_data = [];
    for (let d in query_map)
      encode_data.push(encodeURIComponent(d) + '=' + encodeURIComponent(query_map[d]));

    var path = '/browse/';
    if (encode_data.length > 0) {
       path += '?' + encode_data.join('&');
    }
    browserHistory.push(path);
  },

  buildBackendURL: function () {
    var base_url = '';
    var state = this.state.filters;
    for (let filter in FILTER_MAP) {
      if (state[filter]) {
        base_url += "&" + FILTER_MAP[filter] + "=" + state[filter];
      }
      else if (DEFAULTS[filter]) {
        base_url += "&" + FILTER_MAP[filter] + "=" + DEFAULTS[filter];
      }
    }
    this.getRecipes(base_url);
  },

  render: function() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-2 sidebar">
            <div className="sidebar">
              <Filter title="course"
                      data={ this.state.course }
                      active={ this.state.filters['course'] }
                      filter={ this.filter }
              />
              <Filter title="cuisine"
                      data={ this.state.cuisine }
                      active={ this.state.filters['cuisine'] }
                      filter={ this.filter }
              />
            </div>
          </div>
          <div className="col-xs-10">
            <div id="browse" className="row">
              <ListRecipes format="col-xs-12 col-sm-6 col-md-4 col-lg-3"
                           data={this.state.recipes}
              />
            </div>
            <div className="row">
              <div className="col-xs-12">
                <Pagination limit={ this.state.filters['limit'] ? this.state.filters['limit'] : DEFAULTS.limit}
                            count={ this.state.total_recipes }
                            offset={ this.state.filters['offset'] }
                            filter={ this.filter }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});
