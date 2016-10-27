import React from 'react'
import request from 'superagent';

import ListRecipes from '../../browse/components/ListRecipes'

require("./../css/recipe.scss");

var Ingredients = React.createClass({
  loadRecipeFromServer: function() {
    console.log(this.props.url);
    console.log(this.props.config);
    request
      .get(this.props.url)
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
    this.loadRecipeFromServer();
  },
  render: function() {
    var ingredients = this.state.data.map(function(ingredient) {
      return (
        <li className="ingredient" key={ingredient.id}>
          {ingredient.quantity} -
          {ingredient.measurement} -
          {ingredient.title}
        </li>
      );
    });
    return (
      <ul className="ingredients" >
        {ingredients}
      </ul>
    );
  }
});

var RecipeScheme = React.createClass({
  render: function() {
    console.log(this.props.data);
    return (
      <div className="thumbnail">
        <img className="img-responsive" src={this.props.data.photo}/>
        <div className="caption-full">
          <h4 className="pull-right">$24.99</h4>
          <h4>{this.props.data.title}</h4>
          <div className="recipe-details">
            <div className="recipe-schema" itemType="http://schema.org/Recipe">
              <div className="misc">
                <div className="item">
                  <p className="header">Cooking Time</p>
                  <p className="body">{this.props.data.cook_time}</p>
                </div>
                <div className="item">
                  <p className="header">Servings</p>
                  <p className="body">{this.props.data.servings}</p>
                </div>
                <div className="item">
                  <p className="header">Rating</p>
                  <p className="body">{this.props.data.rating}</p>
                </div>
              </div>
              <div className="clear">&nbsp;</div>
              <div className="desc">
                <h4>Ingredients</h4>
                <Ingredients url={this.props.url}/>
              </div>
              <div className="desc">
                <h4>Instructions</h4>
                <p>{this.props.data.directions}</p>
              </div>
            </div>
          </div>
          <div>{this.props.data.info}</div>
        </div>
        <div className="ratings">
          <p className="pull-right">{this.props.data.pub_date}</p>
          <p>
            <span className="glyphicon glyphicon-star"/>
            <span className="glyphicon glyphicon-star"/>
            <span className="glyphicon glyphicon-star"/>
            <span className="glyphicon glyphicon-star"/>
            <span className="glyphicon glyphicon-star-empty"/>
          </p>
        </div>
    </div>
    );
  }
});

export default React.createClass({
  loadRecipeFromServer: function(url) {
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
  loadRecipesFromServer: function () {
    var base_url = "/api/v1/recipe/recipes/?format=json&fields=id,title,pub_date,rating,photo_thumbnail&limit=3";
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
      data: [],
      recipes: []
    };
  },
  componentDidMount: function() {
    var url = "/api/v1/recipe/recipes/"+ this.props.params.recipe + "/?format=json";
    console.log(url);
    console.log(url);
    this.loadRecipeFromServer(url);
    this.loadRecipesFromServer();
  },
  render: function() {
    var ing_url = "/api/v1/ingredient/ingredient/?format=json&recipe="+ this.props.params.recipe;
    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-9">
            <RecipeScheme data={this.state.data} url={ing_url}/>
          </div>
          <div className="col-xs-3">
            <ListRecipes format="col-xs-12" data={this.state.recipes} />
          </div>
        </div>
      </div>
    );
  }
});
