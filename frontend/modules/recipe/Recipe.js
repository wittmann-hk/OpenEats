import React from 'react'
import request from 'superagent';

require("./css/recipe.scss");

var Ingredients = React.createClass({
  loadRecipeFromServer: function() {
    console.log(this.props.url);
    console.log(this.props.config);
    request
      .get(this.props.url)
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
    return (
      <div className="recipe-details">
        <div className="image">
          <img className="img" src={this.props.data.photo} />
        </div>
        <div className="recipe-schema" itemType="http://schema.org/Recipe">
          <h2>{this.props.data.title}</h2>
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
            <h3>Ingredients</h3>
            <Ingredients url={this.props.url}/>
          </div>
          <div className="desc">
            <h3>Instructions</h3>
            <p>{this.props.data.directions}</p>
          </div>
        </div>
        <div className="info">
          <h1>Infomation</h1>
          <p>{this.props.data.info}</p>
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
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    var url = "/api/v1/recipe/recipes/"+ this.props.params.recipe + "/?format=json";
    this.loadRecipeFromServer(url);
  },
  render: function() {
    var ing_url = "/api/v1/ingredient/ingredient/?format=json&recipe="+ this.props.params.recipe;
    return (
      <div className="container">
        <div className="row">
          <div className="col-lg-3">
            <div className="row">
              <div id="similar"></div>
            </div>
          </div>
          <div className="col-lg-9">
            <div className="row">
              <div id="recipe" className="col-lg-push-1 col-lg-10">
                <RecipeScheme data={this.state.data} url={ing_url}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});
