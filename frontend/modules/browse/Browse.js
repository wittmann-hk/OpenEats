import React from 'react'
import request from 'superagent';

import Cuisine from './Cuisine'

require("./css/browse.scss");

var Recipes = React.createClass({
  render: function() {
    var recipes = this.props.data.map(function(recipe) {
      var link = '/recipe/' + recipe.id;
      return (
        <div className="col-lg-3 col-md-4 col-sm-6 col-xs-12 recipe" key={recipe.id}>
          <a className="image" href={link}>
            <img className="img-circle" src={recipe.photo} alt="Recipe Image"/>
          </a>
          <a className="title" href={link}>{recipe.title}</a>
          <p className="date">Posted {recipe.pub_date}</p>
        </div>
      );
    });
    return (
      <div className="recipes">
        {recipes}
      </div>
    );
  }
});

export default React.createClass({
  loadNewsFromServer: function(url) {
    var base_url = "/api/v1/recipe/recipes/?format=json&fields=id,title,pub_date,photo";
    request
      .get(base_url + url)
      .type('json')
      .end((err, res) => {
        if (!err && res) {
          this.setState({ data: res.body });
        } else {
          console.error(url, err.toString());
        }
      })
  },
  buildQueryString : function (query) {
      var query_string = '';
      var q;
      for (q in query)
          query_string += '&' + q + '=' + query[q];
      console.log(query_string);
      return query_string;
  },
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    if (this.props.params.cuisine) {
      this.loadNewsFromServer('&cuisine=' + this.props.params.cuisine);
    }
    else if (this.props.location.query) {
      var query_string = this.buildQueryString(this.props.location.query);
      this.loadNewsFromServer(query_string);
    }
    else {
      this.loadNewsFromServer('');
    }
  },
  componentWillReceiveProps(nextProps) {
    if (this.props != nextProps) {
      if (nextProps.params.cuisine) {
        this.loadNewsFromServer('&cuisine=' + nextProps.params.cuisine);
      }
      else if (nextProps.location.query) {
        var query_string = this.buildQueryString(nextProps.location.query);
        this.loadNewsFromServer(query_string);
      }
      else {
        this.loadNewsFromServer('');
      }
    }
  },
  render: function() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-2 sidebar">
            <div className="row">
              <h3 className="cuisine">By Cuisine</h3>
              <Cuisine url="/api/v1/groups/cuisine/?format=json" />
            </div>
          </div>
          <div className="col-xs-10">
            <div id="browse" className="row">
              <Recipes data={this.state.data} />
            </div>
          </div>
        </div>
      </div>
    );
  }
});
